module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
    'node': true
  },
  'plugins': [
    'import'
  ],
  'extends': [
    'eslint:recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'rules': {
    'array-bracket-newline': [
      'error', 'consistent'
    ],
    'arrow-parens': [
      'error', 'always'
    ],
    'arrow-spacing': 'error',
    'brace-style': [
      'error',
      '1tbs', {
        'allowSingleLine': true
      }
    ],
    'camelcase': [
      'error', {
        'ignoreDestructuring': true
      }
    ],
    'comma-dangle': [
      'error', 'never'
    ],
    'comma-spacing': [
      'error', {
        'after': true,
        'before': false
      }
    ],
    'complexity': [
      'error', 20
    ],
    'computed-property-spacing': [
      'error', 'never'
    ],
    'dot-location': [
      'error', 'property'
    ],
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'eol-last': [
      'error', 'always'
    ],
    'func-call-spacing': [
      'error', 'never'
    ],
    'func-style': [
      'error', 'expression'
    ],
    'id-length': [
      'error', {
        'exceptions': [
          'x',
          'y',
          'z',
          'j',
          'k',
          'l',
          'm',
          'n',
          'a',
          'b',
          'c',
          '_'
        ],
        'min': 3
      }
    ],
    'implicit-arrow-linebreak': [
      'error', 'beside'
    ],
    'indent': [
      'error',
      2, {
        'ignoredNodes': [
          'JSXAttribute', 'JSXSpreadAttribute'
        ],
        'SwitchCase': 1,
        'MemberExpression': 'off',
        'ignoredNodes': ['ConditionalExpression']
      }
    ],
    'jsx-quotes': [
      'error', 'prefer-double'
    ],
    'key-spacing': [
      'error', {
        'mode': 'strict'
      }
    ],
    'keyword-spacing': 'error',
    'linebreak-style': [
      'error', 'unix'
    ],
    'lines-around-comment': [
      'error', {
        'beforeBlockComment': true,
        'beforeLineComment': true
      }
    ],
    'lines-between-class-members': [
      'error', 'always'
    ],
    'max-classes-per-file': [
      'error', 1
    ],
    'max-len': [
      'error', {
        'code': 80,
        'ignoreTemplateLiterals': true,
        'ignoreTemplateLiterals': true,
        'ignoreUrls': true
      }
    ],
    'max-lines': [
      'error', {
        'max': 400,
        'skipBlankLines': true,
        'skipComments': true
      }
    ],
    'max-lines-per-function': [
      'error', {
        'max': 120,
        'skipBlankLines': true,
        'skipComments': true
      }
    ],
    'max-nested-callbacks': [
      'error', 3
    ],
    'max-params': [
      'error', 10
    ],
    'multiline-ternary': [
      'error', 'always-multiline'
    ],
    'no-alert': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': [
      'error', {
        'ObjectExpression': {
          'consistent': true
        },
        'ObjectPattern': {
          'consistent': true
        },
        'ImportDeclaration': {
          'consistent': true
        },
        'ExportDeclaration': {
          'consistent': true
        }
      }
    ],
    'object-curly-spacing': [
      'error', 'always'
    ],
    'object-property-newline': [
      'error', {
        'allowAllPropertiesOnSameLine': true
      }
    ],
    'padding-line-between-statements': [
      'error', {
        'blankLine': 'always',
        'next': '*',
        'prev': ['const', 'let', 'var']
      }, {
        'blankLine': 'always',
        'next': 'function',
        'prev': '*'
      }, {
        'blankLine': 'any',
        'next': [
          'const', 'let', 'var'
        ],
        'prev': ['const', 'let', 'var']
      }, {
        'blankLine': 'always',
        'next': 'export',
        'prev': '*'
      }, {
        'blankLine': 'always',
        'next': '*',
        'prev': 'directive'
      }, {
        'blankLine': 'any',
        'next': 'directive',
        'prev': 'directive'
      }, {
        'blankLine': 'always',
        'next': '*',
        'prev': 'import'
      }, {
        'blankLine': 'any',
        'next': 'import',
        'prev': 'import'
      }, {
        'blankLine': 'always',
        'next': 'case',
        'prev': '*'
      }
    ],
    'prefer-arrow-callback': 'error',
    'prefer-destructuring': [
      'error', {
        'VariableDeclarator': {
          'array': false,
          'object': true
        },
        'AssignmentExpression': {
          'array': true,
          'object': true
        }
      }, {
        'enforceForRenamedProperties': false
      }
    ],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'quotes': [
      'error', 'single'
    ],
    'semi': [
      'error',
      'never', {
        'beforeStatementContinuationChars': 'always'
      }
    ],
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'space-in-parens': [
      'error', 'never'
    ],
    'strict': [
      'error', 'global'
    ],
    'switch-colon-spacing': 'error',
    'template-curly-spacing': [
      'error', 'never'
    ],
    'yoda': 'error',

    // IMPORT PLUGIN RULES

    'import/extensions': [
      'error',
      'always', {
        'ignorePackages': true
      }
    ],
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/named': 'error',
    'import/no-useless-path-segments': ['error'],
    'import/order': [
      'error', {
        'newlines-between': 'always',
        'groups': [
          'external',
          'builtin',
          'internal',
          ['sibling', 'parent', 'index']
        ]
      }
    ]
  }
}