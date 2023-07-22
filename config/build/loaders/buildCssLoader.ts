import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
            // Creates `style` nodes from JS strings
            // "style-loader", ----> MiniCssExtractPlugin.loader, по документации mini-css-ex-pl
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            // разворачиваем как объект и указываем loader'ы и настройки
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        // для модулей
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')), // не применять модули на обычные css файлы
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
}
