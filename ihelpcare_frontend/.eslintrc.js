module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@next/next/recommended', 'prettier', 'airbnb'],
  overrides: [],
  plugins: ['react'],
  parserOptions: { ecmaVersion: 'latest' },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@images', './public/images'],
          ['@components', './src/components'],
          ['@redux', './src/redux'],
          ['@hooks', './src/hooks'],
          ['@utils', './src/utils'],
          ['@data', './src/data'],
          ['@api', './src/app/api'],
          ['@app', './src/app'],
          ['@root', './'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unstable-nested-components': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unsafe-optional-chaining': 'off',
    'react/require-default-props': 'off',
    'max-len': ['error', { code: 400 }],
    'jsx-quotes': [1, 'prefer-single'],
    '@next/next/no-img-element': 'off',
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'import/order': 'off',
  },
};
