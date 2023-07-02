// это скрипт для генерации json-отчета для loki https://github.com/reg-viz/reg-cli
// скрипт взял с https://github.com/oblador/loki/issues/76#issuecomment-595777550

const { promisify } = require('util');
const { readdir, writeFile } = require('fs');
const { join: joinPath, relative } = require('path');

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const lokiDir = joinPath(__dirname, '..', '.loki');
const actualDir = joinPath(lokiDir, 'current');
const expectedDir = joinPath(lokiDir, 'reference');
const diffDir = joinPath(lokiDir, 'difference');

(async function main() {
    const diffs = await asyncReaddir(diffDir);

    await writeFileAsync(joinPath(lokiDir, 'report.json'), JSON.stringify({
        newItems: [],
        deletedItems: [],
        passedItems: [],
        failedItems: diffs,
        expectedItems: diffs,
        actualItems: diffs,
        diffItems: diffs,
        actualDir: relative(lokiDir, actualDir),
        expectedDir: relative(lokiDir, expectedDir),
        diffDir: relative(lokiDir, diffDir),
    }));
}());
