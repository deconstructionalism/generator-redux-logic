const Generator = require('yeoman-generator')
const eslint = require('gulp-eslint')
const jscs = require('jscodeshift')

const {
  capitalize,
  isAlphaOnlyCamelCase,
  camelCaseConversions: {
    toSlugCase,
    toSnakeCase,
    toLowerSpaceCase
  },
  interpolateTestInFileName
} = require('../../lib/textTools.js')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('reducerName', {
      desc: 'singular name of reducer to scaffold',
      required: false,
      type: String
    })

    this.option('isAsynchronous', {
      alias: 'a',
      default: false,
      desc: 'scaffold an asynchronous reducer',
      type: Boolean
    })

    this.registerTransformStream([
      eslint({
        fix: true,
        quiet: true,
        cwd: this.templatePath('../../app/templates')
      })
    ])
  }

  async prompting () {
    if (this.options.reducerName) { return }
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'reducerName',
        message: 'Your reducer name'
      }
    ])

    this.options.reducerName = answers.reducerName
  }

  checkName () {
    const { reducerName } = this.options

    if (!isAlphaOnlyCamelCase(reducerName)) {
      throw new Error(
        `reducerName "${reducerName}" is not camelCase with only letters`
      )
    }

    if (reducerName.length < 3) {
      throw new Error(
        `reducerName "${reducerName}" is less than 3 characters long`
      )
    }
  }

  _writeFileFromTemplate (
    templatePath,
    destinationPath,
    context,
    testFile=false) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      context
    )
    testFile && (
      this.fs.copyTpl(
        this.templatePath(interpolateTestInFileName(templatePath)),
        this.destinationPath(interpolateTestInFileName(destinationPath)),
        context
      )
    )
  }

  _astAddImport (tree, identifier) {
    let existingImport = false
    let hasAnyImports = false

    tree.find('ImportDeclaration')
        .forEach((path) => {
          hasAnyImports = true
          const importPath = path.get('source', 'value').value

          if (importPath === `./${identifier}.js`) { existingImport = true }
        })

    if (existingImport) { throw new Error('import already exists') }

    const codeToAdd = `import ${identifier} from './${identifier}.js'`

    if (hasAnyImports) {
      tree.find('ImportDeclaration')
          .get()
          .insertBefore(codeToAdd)
    } else {
      tree.get('program', 'body').unshift(codeToAdd)
    }
  }

  _addReducerToStore () {
    const { reducerName } = this.options

    const rootReducerProgram = this.fs.read(
      this.destinationPath('src/redux/reducers/index.js')
    )

    const tree = jscs(rootReducerProgram)
    const identifier = `${reducerName}Reducer`

    try { this._astAddImport(tree, identifier) } catch (_) { return  }

    const codeToAdd = `${reducerName}: ${identifier}`
    const updatedTree =  tree.findVariableDeclarators('rootReducer')
                             .find('ObjectExpression')
                             .forEach((path) => path.get('properties')
                                                    .unshift(codeToAdd))

    this.fs.write('src/redux/reducers/index.js', updatedTree.toSource())
  }

  _addLogicToRootLogic () {
    const { reducerName } = this.options

    const rootLogicProgram = this.fs.read(
      this.destinationPath('src/redux/logics/index.js')
    )

    const tree = jscs(rootLogicProgram)
    const identifier = `${reducerName}Logics`

    try { this._astAddImport(tree, identifier) } catch (_) { return  }

    const codeToAdd = `...${identifier}`
    const updatedTree = tree.findVariableDeclarators('rootLogics')
                            .find('ArrayExpression')
                            .forEach((path) => path.get('elements')
                                                   .unshift(codeToAdd))

    this.fs.write('src/redux/logics/index.js', updatedTree.toSource())
  }

  writing () {
    const { reducerName, isAsynchronous } = this.options

    const context = {
      upperSnakeCased: toSnakeCase(reducerName).toUpperCase(),
      capitalized: capitalize(reducerName),
      lowerSpaceCase: toLowerSpaceCase(reducerName),
      name: reducerName,
      slugCased: toSlugCase(reducerName)
    }

    const hasRootReducer = this.fs.exists(
      this.destinationPath('src/redux/reducers/index.js')
    )

    !hasRootReducer && this._writeFileFromTemplate(
      'rootReducer.ejs',
      'src/redux/reducers/index.js',
      context
    )

    this._addReducerToStore()

    this._writeFileFromTemplate(
      'actions.ejs',
      `src/redux/actions/${reducerName}Actions.js`,
      context,
      true
    )

    this._writeFileFromTemplate(
        isAsynchronous ? 'reducerAsync.ejs' : 'reducer.ejs',
        `src/redux/reducers/${reducerName}Reducer.js`,
        context,
        true
    )

    if (isAsynchronous) {

      this._writeFileFromTemplate(
        'logics.ejs',
        `src/redux/logics/${reducerName}Logics.js`,
        context
      )

      this._writeFileFromTemplate(
        'logics.test.ejs',
        `src/redux/logics/${reducerName}Logics.test.js`,
        context
      )

      this._writeFileFromTemplate(
        'axiosMock.ejs',
        `src/redux/logics/__mocks__/axios.js`
      )

      const hasRootLogic = this.fs.exists(
        this.destinationPath('src/redux/logics/index.js')
      )

      !hasRootLogic && this._writeFileFromTemplate(
        'rootLogic.ejs',
        'src/redux/logics/index.js',
        context
      )

      this._addLogicToRootLogic()
    }
  }
}
