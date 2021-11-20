module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
