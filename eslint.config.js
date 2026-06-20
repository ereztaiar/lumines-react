import js from '@eslint/js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

const browserGlobals = {
    window: 'readonly',
    document: 'readonly',
    console: 'readonly',
    process: 'readonly',
    global: 'readonly',
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly',
    requestAnimationFrame: 'readonly',
    cancelAnimationFrame: 'readonly',
    Image: 'readonly',
    URL: 'readonly',
    localStorage: 'readonly',
    navigator: 'readonly',
    KeyboardEvent: 'readonly',
};

const jestGlobals = {
    describe: 'readonly',
    it: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
    jest: 'readonly',
};

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['**/*.test.{js,jsx}', '**/*.stories.{js,jsx}'],
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...browserGlobals,
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
            },
        },
        rules: {
            // Core hooks rules — the main reason this linter exists.
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            // Custom render() in Grid/Dispenser writes innerHTML; not a setState call.
            'react-hooks/set-state-in-effect': 'off',
            // Many files still carry `import React` from the React 16 era (React 17
            // JSX transform doesn't require it). Warn rather than error to avoid noise.
            'no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^React$', args: 'none', ignoreRestSiblings: true },
            ],
            // Components use ({ }) intentionally as an empty-props pattern.
            'no-empty-pattern': 'off',
        },
    },
    {
        files: ['**/*.test.{js,jsx}', '**/*.stories.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...jestGlobals,
                ...browserGlobals,
                module: 'readonly',
                require: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
        },
    },
    prettierConfig,
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
    },
];
