import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';
// сложная конфигурация см. 25 видео 7 минута либо гуглить
// но в основном простая сборка схожая webpack
// важно понимать что это конфигурация для storybook
// и в ней нет никаких зависимостей от проекта
// поэтому в ней нет никаких путей к проекту

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    config!.resolve!.modules!.push(paths.src); // добавляем путь к модулям
    config!.resolve!.extensions!.push('.ts', '.tsx'); // добавляем расширения
    config!.resolve!.alias = {
        ...config!.resolve!.alias,
        '@': paths.src,
    }; // добавляем алиасы

    // eslint-disable-next-line no-param-reassign
    // @ts-ignore
    config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => { // переопределяем правила
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({ // добавляем правило для svg
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config!.module!.rules.push(buildCssLoader(true)); // добавляем правило для css

    config!.plugins!.push(new DefinePlugin({ // добавляем плагин для глобальных переменных
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
