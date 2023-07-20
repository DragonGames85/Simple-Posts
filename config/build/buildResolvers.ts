import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'], // import Component from './component' ->  указываем в скобках путь без расширения
        preferAbsolute: true, // абсолютные пути в приоритете
        modules: [options.paths.src, 'node_modules'], // абсолютные пути для библиотек
        mainFiles: ['index'], // главный файл - index
        alias: {
            '@': options.paths.src,
        }, // без собаки
        // для собаки alias: {"@" : options.paths.src}
    };
}
