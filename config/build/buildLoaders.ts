import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    // https://www.npmjs.com/package/%40svgr/webpack для svg файлов
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // babel loader
    const babelLoader = buildBabelLoader(options);

    const cssLoader = buildCssLoader(isDev);

    // Если не используем typescript - нужен babel
    // babel - спец транспилятор, который перегоняет новый js в старый
    // чтобы все браузеры поддерживали
    // typescript уже умеет обрабатывать jsx
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/, // исключая node modules
    };

    // https://v4.webpack.js.org/loaders/file-loader для png, jpeg, jpg файлов
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // порядок loader's имеет значение!!!
    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
