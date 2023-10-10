import installer from '@amopro/widget-installer';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import chalk from 'chalk';


const rootDir = path.resolve();
dotenv.config();

const { WidgetInstaller } = installer;

const widgetPath = path.resolve(rootDir, './widget.zip');



fs.access(widgetPath).then(() => {
    const installerParams = {
        subDomain: process.env.AMO_SUBDOMAIN,
        login: process.env.AMO_LOGIN,
        password: process.env.AMO_PASSWORD,
        widgetZipPath: widgetPath,
        redirectUri: process.env.AMO_REDIRECT_URI,
        amoMarket: process.env.AMO_MARKET_ACCESS
    };
    const wi = new WidgetInstaller(installerParams);
    console.log(chalk.blue('starting upload...'));
    wi.upload().then(() => {
        console.log(chalk.green('Widget uploaded!'));
    }).catch(e => {
        console.log(chalk.red(e.toString()))
    });
}).catch((error) => {
    console.log(chalk.red(error))
});
