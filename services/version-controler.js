import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import chalk from 'chalk';

const rootDir = resolve();
const manifestPath = resolve(rootDir, 'src/static/manifest.json');

async function updateVersion() {
    try {
        const data = await readFile(manifestPath, 'utf-8');

        let manifestData = JSON.parse(data);

        // Split the version into major, minor, patch
        let [major, minor, patch] = manifestData.widget.version.split('.').map(Number);

        // Increment the patch version
        patch++;

        // If patch version is 10, increment minor version and reset patch to 0
        if (patch === 10) {
            minor++;
            patch = 0;

            // If minor version is 10, increment major version and reset minor to 0
            if (minor === 10) {
                major++;
                minor = 0;
            }
        }

        // Update the version in the data
        manifestData.widget.version = `${major}.${minor}.${patch}`;

        // Write the updated version back to the file
        await writeFile(manifestPath, JSON.stringify(manifestData, null, 2));

        console.log(chalk.blue('Version updated to: ' + manifestData.widget.version));

    } catch (err) {
        throw err;
    }
}

updateVersion();
