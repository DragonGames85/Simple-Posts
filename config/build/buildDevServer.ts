import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // автоматический открывает браузер с приложением
        historyApiFallback: true, // чтобы при перезагрузке другой странички не было ошибки, например /about
        hot: true, // при изменений не перезагружать страницу
    };
}
