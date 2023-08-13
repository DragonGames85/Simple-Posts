import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
    // 1 Path to your story files
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    // 2 Path to your component files
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials', // аддон добавляющий много других аддонов
            options: {
                backgrounds: false, // выключаем у него background, чтобы
            }, // другой аддон (storybook-addon-themes) смог работать
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock', // аддон для мока запросов
        'storybook-addon-themes', // аддон для добавления тем
    ],
    // 3 Path to your webpack configuration
    framework: '@storybook/react',
    // 4 Path to your webpack configuration
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config: Configuration) => {
        const paths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            locales: '',
            buildLocales: '',
        };
        config!.resolve!.modules!.push(paths.src);
        config!.resolve!.extensions!.push('.ts', '.tsx');
        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            '@': paths.src,
        };

        config!.module!.rules = config!.module!.rules!.map(
            // @ts-ignore
            (rule: RuleSetRule) => {
                if (/svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            },
        );

        config!.module!.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config!.module!.rules.push(buildCssLoader(true));

        config!.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );
        // Return the altered config
        return config;
    },
};
