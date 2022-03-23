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
let directoryProject = "";
const nameProject = process.argv[2] || "micro";

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
    directoryProject = path.join(pathNow, nameProject);

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
                    )}, you can using ["${chalk.blue("--react")}"]\n`
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
        fs.removeSync(directoryProject);
        console.error("Failed to created project!\n");
        process.exit(-1);
    }

    /* Delete File */
    const execRemoveOther = runCommand(
        `cd ${nameProject} && git remote rm origin`
    );
    if (!execRemoveOther) {
        fs.removeSync(directoryProject);
        console.error("Failed to created project!\n");
        process.exit(-1);
    }
    const filesNoDelete = [".git", appFramework];
    fs.readdir(directoryProject, (err, files) => {
        if (err) throw err;

        try {
            for (const file of files) {
                if (!filesNoDelete.includes(file)) {
                    fs.removeSync(path.join(directoryProject, file));
                }
            }
        } catch (e) {
            fs.removeSync(directoryProject);
            console.error(
                chalk.red("Failed to created project! ", e.message, "\n")
            );
            process.exit(-1);
        }
    });

    /* Create file .env */
    const directoryTemplate = path.join(directoryProject, appFramework);
    fs.readFile(
        path.join(directoryTemplate, ".env.example"),
        "utf8",
        (err, data) => {
            if (err) {
                fs.removeSync(directoryProject);
                console.error(err);
                return;
            }
            const writeEnv = data.replace(/=app1/g, `=${nameProject}`);
            fs.writeFile(
                path.join(directoryProject, ".env"),
                writeEnv,
                (err) => {
                    if (err) {
                        fs.removeSync(directoryProject);
                        console.error(err);
                        return;
                    }
                }
            );
        }
    );

    /* Create package.json */
    fs.readFile(
        path.join(directoryTemplate, "package.json"),
        "utf8",
        (err, data) => {
            if (err) {
                fs.removeSync(directoryProject);
                console.error(err);
                return;
            }
            const writePackage = data.replace(
                /"name": "create-my-microfrontend"/g,
                `"name": "${nameProject}"`
            );
            fs.writeFile(
                path.join(directoryProject, "package.json"),
                writePackage,
                (err) => {
                    if (err) {
                        fs.removeSync(directoryProject);
                        console.error(err);
                        return;
                    }
                }
            );
        }
    );

    /* Move Files */
    fs.readdir(directoryTemplate, (err, files) => {
        if (err) throw err;

        try {
            for (const file of files) {
                fs.moveSync(
                    path.join(directoryTemplate, file),
                    path.join(directoryTemplate, `../${file}`)
                );
            }
        } catch (e) {
            fs.removeSync(directoryProject);
            console.error(
                chalk.red("Failed to created project! ", e.message, "\n")
            );
            process.exit(-1);
        }
    });

    /* Install package dependencies */
    console.log("Installation package dependencies...");
    let listPackage = Object.keys(readWritePackageJson(pathNow).dependencies)
        .toString()
        .replace(/,/g, " ");
    const installPackage = runCommand(
        `cd ${directoryProject} && npm install ${listPackage}`,
        undefined,
        "inherit"
    );
    if (!installPackage) {
        fs.removeSync(directoryProject);
        console.error(`${chalk.red(`\nError install package ${listPackage}\n`)},
                you can try with the manual method, ${chalk.bold(
                    `npm install ${listPackage} --force`
                )}
            \n`);
        process.exit(-1);
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
        fs.removeSync(directoryProject);
        console.error(`${chalk.red(
            `\nError install package ${listPackageDev}\n`
        )},
                you can try with the manual method, ${chalk.bold(
                    `npm install ${listPackageDev} --save-dev --force`
                )}
            \n`);
        process.exit(-1);
    }

    /* Delete folder template */
    let deleteTemplate = fs.remove(directoryTemplate);
    if (!deleteTemplate) {
        fs.removeSync(directoryProject);
        console.error(chalk.red("Failed to created project!\n"));
        process.exit(-1);
    }

    /* Update lock */
    fs.readFile(
        path.join(directoryProject, "package-lock.json"),
        "utf8",
        (err, data) => {
            if (err) {
                fs.removeSync(directoryProject);
                console.error(err);
                return;
            }
            const writePackage = data.replace(
                /"name": "create-my-microfrontend"/g,
                `"name": "${nameProject}"`
            );
            const updatePackage = JSON.parse(writePackage);
            delete updatePackage.packages[""].bin;
            fs.writeFile(
                path.join(directoryProject, "package-lock.json"),
                JSON.stringify(updatePackage),
                (err) => {
                    if (err) {
                        fs.removeSync(directoryProject);
                        console.error(err);
                        return;
                    }
                }
            );
        }
    );

    /* Update package.json */
    // const valWrite = {
    //     name: nameProject,
    // };
    // let writePackage = readWritePackageJson(pathNow, "write", valWrite);
    // if (!writePackage) {
    //     fs.removeSync(directoryProject);
    //     console.error(chalk.red("Failed to created the package project!\n"));
    //     process.exit(-1);
    // }

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
        const filePath = path.join(pathNow, nameProject);
        const fileDir = path.join(
            path.join(filePath, appFramework),
            "package.json"
        );

        let packageData = fs.readJsonSync(fileDir);
        if (type === "write" && typeof value !== "undefined") {
            let writeData = { ...value, ...packageData };
            packageData = fs.writeJson(fileDir, writeData);
            return true;
        }
        if (!packageData) {
            process.exit(-1);
        }

        return packageData;
    } catch (e) {
        fs.removeSync(directoryProject);
        console.error(`${chalk.red(`${e.message}\n`)}`);
        process.exit(-1);
    }
}

export { init, runCommand };
// module.exports = { init };
