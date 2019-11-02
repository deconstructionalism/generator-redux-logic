const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('projectName', {
      desc: 'name of project to scaffold',
      required: false,
      type: String
    })
  }

  async prompting () {
    if (this.options.projectName) { return }
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name'
      }
    ])

    this.options.projectName = answers.projectName
  }

  checkName () {
    const { projectName } = this.options

    if (projectName.length === 0) {
      throw new Error(
        'You must provide a name for your project!'
      )
    }
  }

  writing () {
    const now = new Date()
    const { projectName } = this.options

    this.fs.copyTpl(
      this.templatePath('LICENSE.ejs'),
      this.destinationPath('LICENSE'),
      { year: now.getFullYear() }
    )

    this.fs.copyTpl(
      this.templatePath('.eslintrc.ejs'),
      this.destinationPath('.eslintrc.js')
    )

    this.fs.copyTpl(
      this.templatePath('.gitignore.ejs'),
      this.destinationPath('.gitignore')
    )

    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath('package.json'),
      { projectName }
    )

    this.fs.copy(
      this.templatePath('./src/App.ejs'),
      this.destinationPath('./src/App.js')
    )

    this.fs.copy(
      this.templatePath('./src/index.ejs'),
      this.destinationPath('./src/index.js')
    )

    this.fs.copyTpl(
      this.templatePath('./public/index.html.ejs'),
      this.destinationPath('./public/index.html'),
      { projectName }
    )

    this.fs.copy(
      this.templatePath('./src/redux/actions/feedbackActions.ejs'),
      this.destinationPath('./src/redux/actions/feedbackActions.js')
    )

    this.fs.copy(
      this.templatePath('./src/redux/logics/index.ejs'),
      this.destinationPath('./src/redux/logics/index.js')
    )

    this.fs.copy(
      this.templatePath('./src/redux/reducers/index.ejs'),
      this.destinationPath('./src/redux/reducers/index.js')
    )
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('npm', ['install'])
  }
}
