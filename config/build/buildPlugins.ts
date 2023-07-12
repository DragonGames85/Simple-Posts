import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    // вроде как порядок плагинов не важен

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }), // используем index.html как шаблон, иначе у него будет пропадать <div id = root>
        new webpack.ProgressPlugin(), // следит за прогрессом сборки
        new MiniCssExtractPlugin({
            // как webpack будет собирать файлы css
            filename: 'css/[name].[contenthash:8].css',
            // чанки для асинхронного разбития файлов
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            // с помощью него можно прокидывать переменные через всё приложение
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
    ];

    // если у нас дев сборка мы добавляем в сборку эти плагины
    if (isDev) {
        // hot module (ниже) работающий лучше с React-компонентами
        plugins.push(new ReactRefreshWebpackPlugin());
        // плагин, который позволяет при изменений не перезагружать страницу
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // плагин который вместе со сборкой запускает доп localhost 127.0.0.1:8888
        // где можно смотреть сколько весит bundle
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false, // false - выключить отчёт, true - включить
            }),
        );
    }

    return plugins;
}
