module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['@react-native-community', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'no-empty': 'off',
        'no-bitwise': 'off',
        'jest/no-disabled-tests': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
    },
};
