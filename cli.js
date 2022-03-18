#!/usr/bin/env node

"use strict";

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const validApp = ["--react"];
let appFramework = "";

/* Run Command */
function runCommand(command, param, typeStdio = "ignore") {
    try {
        if (typeof param === "undefined") {
            execSync(`${command}`, { stdio: typeStdio });
            return true;
        } else {
            return execSync(command).toString().trim().includes(param);
        }
    } catch (e) {
        console.error(`Failed to execute ${command}`, e.message, " \n");
        return false;
    }
}

/* Check Valid Name Project */
function validChar(s) {
    /* Check Uppercase letters */
    if (/[A-Z]/g.test(s)) {
        return false;
    }
    return true;
}

function init(pathNow) {
    const nameProject = process.argv[2] || "micro";
    const directoryProject = path.join(pathNow, nameProject);

    /* Check folder exists */
    if (fs.existsSync(nameProject)) {
        console.error(
            `${chalk.bold(
                `Project name ${chalk.red(
                    nameProject
                )} is exist please use a different name!\n`
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

    appFramework = process.argv[3];
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
    if (!checkedOut) {
        console.error("Failed to created project!\n");
        process.exit(-1);
    }

    /* Delete File */
    const execRemoveOther = runCommand(
        `cd ${nameProject} && git remote rm origin`
    );
    if (!execRemoveOther) {
        console.error("Failed to created project!\n");
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
            console.error(
                chalk.red("Failed to created project! ", e.message, "\n")
            );
            process.exit(-1);
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
            console.error(
                chalk.red("Failed to created project! ", e.message, "\n")
            );
            process.exit(-1);
        }
    });

    /* Install package dependencies */
    let listPackage = Object.keys(readWritePackageJson(pathNow).dependencies)
        .toString()
        .replace(/,/g, " ");
    const installPackage = runCommand(
        `cd ${directoryProject} && npm install ${listPackage}`,
        undefined,
        "inherit"
    );
    if (!installPackage) {
        console.error(`${chalk.red(`\nError install package ${listPackage}\n`)},
                you can try with the manual method, ${chalk.bold(
                    `npm install ${listPackage} --force`
                )}
            \n`);
    }
    /* Install package dev dependencies */
    let listPackageDev = Object.keys(
        readWritePackageJson(pathNow).devDependencies
    )
        .toString()
        .replace(/,/g, " ");
    const installPackageDev = runCommand(
        `cd ${directoryProject} && npm install ${listPackageDev} --save-dev`,
        undefined,
        "inherit"
    );
    if (!installPackageDev) {
        console.error(`${chalk.red(
            `\nError install package ${listPackageDev}\n`
        )},
                you can try with the manual method, ${chalk.bold(
                    `npm install ${listPackageDev} --save-dev --force`
                )}
            \n`);
    }
    const valWrite = {
        name: nameProject,
    };
    let writePackage = readWritePackageJson(pathNow, "write", valWrite);
    if (!writePackage) {
        console.error(chalk.red("Failed to created the package project!\n"));
        process.exit(-1);
    }

    /* Finish */
    console.log("\nCongratulations!!!\n");
    console.log("Happy coding!");
    console.log(
        `\n${chalk.bold(chalk.cyan(`cd ${nameProject}`))} && ${chalk.bold(
            chalk.cyan(`npm start`)
        )}\n\n`
    );
}

function readWritePackageJson(pathNow, type = "read", value = undefined) {
    try {
        /* "/[namProject]/[typeApp/appFramework]/package.json" */
        const nameProject = process.argv[2] || "micro";
        const filePath = path.join(pathNow, nameProject);
        const fileDir = path.join(
            path.join(filePath, appFramework),
            "package.json"
        );

        let packageData = fs.readJsonSync(fileDir, (err) => {
            if (err) {
                fs.removeSync(path.join(pathNow, nameProject));
            }
        });
        if (type === "write" && typeof value !== "undefined") {
            let writeData = { ...packageData, ...value };
            packageData = fs.writeJsonSync(fileDir, writeData, (err) => {
                if (err) {
                    fs.removeSync(path.join(pathNow, nameProject));
                }
            });
            return true;
        }
        if (!packageData) {
            process.exit(-1);
        }

        return packageData;
    } catch (e) {
        fs.removeSync(path.join(pathNow, nameProject));
        console.error(`${chalk.red(`${e.message}\n`)}`);
        process.exit(-1);
    }
}

export { init, runCommand };
// module.exports = { init };
