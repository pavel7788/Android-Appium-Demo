import mocha from 'eslint-plugin-mocha'
import tsParser from '@typescript-eslint/parser'

export default [
    {
        files: ['tests/**/*.ts', 'pages/**/*.ts', 'helpers/**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
        },
        plugins: { mocha },
        rules: {
            'mocha/no-exclusive-tests': 'error',
        },
    },
]
