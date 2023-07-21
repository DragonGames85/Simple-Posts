module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true, // указываем что есть jest
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react', // плагин для реакта
        '@typescript-eslint', // плагин для ts
        'i18next', // плагин для переводов
        'react-hooks', // плагин для хуков
        'simple-posts-plugin', // собственный плагин
        'unused-imports', // неиспользуемые импорты
    ],
    rules: {
        'react/jsx-indent': [2, 4], // отступы 4 пробела [2 означает что правило работает]
        'react/jsx-indent-props': [2, 4], // отступы для props
        'unused-imports/no-unused-imports': 'error',
        indent: [2, 4], // пробелы для обычного кода
        'react/jsx-filename-extension': [ // разрешаем расширения файлов
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off', // разрешаем абсолютные пути
        'import/prefer-default-export': 'off', // разрешаем именованные экспорты
        'react/require-default-props': 'off', // разрешаем переменные с "?" и без default значения (напр. classNames?)
        'react/react-in-jsx-scope': 'off', // для jsx файлов не нужен import React, так как он не нужен с React 17
        'react/jsx-props-no-spreading': 'warn', // spread операторы в jsx
        'react/function-component-definition': 'off', // предпочитаем стрелочные компоненты
        'no-shadow': 'off', // хз
        'import/extensions': 'off', // при импорте не нужно указывать расширение
        'import/no-extraneous-dependencies': 'off', // разрешить импорт внешних модулей, которые не объявлены в зависимостях package.json, devDependencies, optionDependencies, peerDependencies или bundledDependencies.
        'no-underscore-dangle': 'off', // разрешить нижние подчеркивания __is_dev__
        // правило для того чтобы указать что нет переводов
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true, // только ругаться в файлах jsx
                ignoreAttribute: [ // игнорировать переводы в атрибутах 'data-testid', 'to'
                    'as',
                    'role',
                    'data-testid',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'border',
                    'direction',
                    'gap',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 120 }], // максимальная длина строки
        'jsx-a11y/no-static-element-interactions': 'off', // разрешаем onClick на статичные элементы (div)
        'jsx-a11y/click-events-have-key-events': 'off', // разрешаем onClick без onKeyDown
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks, в функциональных компонентах нужно использовать хуки
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies, в useEffect нужно указывать зависимости
        'no-param-reassign': 'off', // разрешаем изменять параметры функции
        'no-undef': 'off', // разрешаем использовать необъявленные переменные
        'react/no-array-index-key': 'off', // разрешаем использовать индексы массивов в качестве ключей
        'linebreak-style': 'off', // Expected line-breaks to be 'LF' but found 'CRLF'
        // если люди работают с разных ОС (ubuntu и прч.) то у них другой символ пробела, а именно CLRF
        'no-unused-vars': 'off', // даем warning по неиспользуемым переменным
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'arrow-body-style': 'off',
        'simple-posts-plugin/path-checker': ['error', { alias: '@' }],
        'simple-posts-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'simple-posts-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
            },
        ],
    },
    globals: { // объявляем глобальные переменные
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    // overrides для того чтобы в определенных файлах переопределять правила
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
