import { createWriteStream } from 'fs';
import { resolve } from 'path';
import archiver from 'archiver';
import chalk from 'chalk';

const rootDir = resolve();
const widget = resolve(rootDir, 'dist');


const output = createWriteStream(resolve(rootDir, 'widget.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function () {
    console.log(chalk.blueBright("Zip archive has been finalized."));
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.log(chalk.yellow('Stat warnings were logged.'));
    } else {
        throw err;
    }
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

archive.directory(widget, false);

archive.finalize();
