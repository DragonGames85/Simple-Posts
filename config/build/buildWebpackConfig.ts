import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true, // очистка файлов от предыдущей сборки
            publicPath: '/', // https://webpack.js.org/guides/public-path/, решает проблему с id. Например articles/1 в url
        },
        plugins: buildPlugins(options),
        module: {
        // одно из важных полей в webpack, тут мы конфигурируем loader'ы
        // (они предназначены для тех файлов которые выходят за рамки java-script,
        // такие как svg, css, ts, png, gif и т.д.)
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        // вне режима разработки нам они не нужны (inline-source-map добавляет лишние коментарии при прод сборке)
        devtool: isDev ? 'inline-source-map' : undefined, // чтобы знать в каком файле произошла ошибка (полный путь)
        devServer: isDev ? buildDevServer(options) : undefined, // для автоматического изменения (не нужно каждый раз пересобирать проект)
    };
}
