#!/usr/bin/env node

"use strict";

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Run Command */
function runCommand(command) {
    try {
        // execSync(`${command}`, { stdio: 'inherit' });
        execSync(`${command}`, { stdio: "ignore" });
        // const child = spawn(command, args, { stdio: 'inherit'})
    } catch (e) {
        console.error(`Failed to execute ${command}`, e.message);
        return false;
    }
    return true;
}

/* Check Valid Name Project */
function validChar(s) {
    /* Check Uppercase letters */
    if (/[A-Z]/g.test(s)) {
        return false;
    }
    return true;
}

function init() {
    // console.log("Installation process..")
    // const runInstallPackage = `npm install`;
    // if (!runCommand(runInstallPackage)) {
    //     console.error(`Installation failed!`);
    //     process.exit(-1);
    // }

    const nameProject = process.argv[2] || "micro";
    /* Check folder exists */
    if (fs.existsSync(nameProject)) {
        console.error(
            `${chalk.bold(
                `Project name ${chalk.red(
                    nameProject
                )} is exist please use a different name!`
            )}\n`
        );
        process.exit(-1);
    }

    /* Check valid name */
    if (!validChar(nameProject)) {
        console.error(
            `${chalk.bold(
                `Project name ${chalk.red(
                    nameProject
                )} cannot contain uppercase letters!\n`
            )}`
        );
        process.exit(-1);
    }

    let appFramework = process.argv[3];
    const validApp = ["--react"];
    /* Check valid type app template */
    if (typeof appFramework !== "undefined") {
        if (!validApp.includes(appFramework)) {
            console.error(
                `${chalk.bold(
                    `Invalid type app ${chalk.red(
                        appFramework
                    )}, you can use ${chalk.blue("--react")}!\n`
                )}`
            );
            process.exit(-1);
        }
    } else {
        appFramework = "--react";
    }
    appFramework = appFramework.slice(2, appFramework.length) + "-app";
    console.log(
        `Create project with name ${chalk.bold(
            chalk.blue(nameProject)
        )} & with template ${chalk.bold(chalk.blue(appFramework))}\n`
    );
    const gitCheckoutCommand = `git clone --depth 1 --filter=blob:none --sparse https://github.com/ugiispoyo/Micro-Id.git ${nameProject} && cd ${nameProject} && git sparse-checkout init --cone && git sparse-checkout set ${appFramework}`;
    const checkedOut = runCommand(gitCheckoutCommand);
    if (!checkedOut) process.exit(-1);

    /* Delete file before finish */
    // let removeOther, execRemoveOther;
    // const opsys = process.platform;
    // if (opsys == "darwin" || opsys == "linux") {
    //     // removeOther = `cd ${nameProject} && rm -rf bin && rm .npmignore && git remote rm origin`;
    //     removeOther = `cd ${nameProject} && rm package.json && rm .npmignore && git remote rm origin`;
    // } else if (opsys == "win32" || opsys == "win64") {
    //     removeOther = `cd ${nameProject} && del package.json && mv ${appFramework}/* ../${nameProject} && rmdir /S /q react-app && rmdir /S /q vue-app && rmdir /S /q "bin" && del .npmignore && git remote rm origin`;
    // }

    const directoryProject = path.join(__dirname, nameProject);
    /* Delete File */
    const execRemoveOther = runCommand(
        `cd ${nameProject} && git remote rm origin`
    );
    if (!execRemoveOther) {
        console.error("Failed to created project!");
        process.exit(-1);
    }
    const filesNoDelete = [".git", appFramework];
    fs.readdir(directoryProject, (err, files) => {
        if (err) throw err;

        try {
            for (const file of files) {
                if (!filesNoDelete.includes(file)) {
                    fs.removeSync(path.join(directoryProject, file), (err) => {
                        if (err) throw err;
                    });
                }
            }
        } catch (e) {
            console.error("Failed to created project! ", e.message);
        }
        
    });

    /* Move Files */
    const directoryTemplate = path.join(directoryProject, appFramework);
    fs.readdir(directoryTemplate, (err, files) => {
        if (err) throw err;

        try {
            for (const file of files) {
                fs.moveSync(
                    path.join(directoryTemplate, file),
                    path.join(directoryTemplate, `../${file}`),
                    (err) => {
                        if (err) throw err;
                    }
                );
            }
            fs.removeSync(path.join(directoryProject, appFramework), (err) => {
                if (err) throw err;
            });
        } catch (e) {
            console.error("Failed to created project! ", e.message);
        }
    });

    /* Finish */
    console.log("Congratulations!!!\n");
    console.log("Happy coding!");
    console.log(
        `\n${chalk.bold(chalk.cyan(`cd ${nameProject}`))} && ${chalk.bold(
            chalk.cyan(`npm start`)
        )}\n\n`
    );
}

export { init };
// module.exports = { init };
