#!/usr/bin/env node

"use strict";

const https = require("https");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

console.log("Is processing..");
if (major < 14) {
    console.error(
        "You are running Node " +
            currentNodeVersion +
            ".\n" +
            "Create My Microfrontend requires Node 14 or higher. \n" +
            "Please update your version of Node."
    );
    process.exit(1);
}

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
        console.error(`Failed to execute ${command}`, e.message);
        return false;
    }
}

/* Check latest version */
// function checkForLatestVersion() {
//     return new Promise((resolve, reject) => {
//         https
//             .get(
//                 "https://registry.npmjs.org/-/package/create-my-microfrontend/dist-tags",
//                 (res) => {
//                     if (res.statusCode === 200) {
//                         let body = "";
//                         res.on("data", (data) => (body += data));
//                         res.on("end", () => {
//                             resolve(JSON.parse(body).latest);
//                         });
//                     } else {
//                         reject();
//                     }
//                 }
//             )
//             .on("error", () => {
//                 reject();
//             });
//     });
// }
// function checkVersion() {
//     return checkForLatestVersion().then((a) => {
//         const checkVersionLocal = execSync("npm view create-my-microfrontend version").toString().trim();
//         if(a !== checkVersionLocal) {
//             /* Update version create-my-microfrontend */
//             console.log("Updating latest version...");
//             const updateCMM = runCommand(
//                 `npm update -g create-my-microfrontend`,
//                 undefined,
//                 "inherit"
//             );
//             if(!updateCMM) {
//                 console.log(
//                     'Failed to update the last version:\n' +
//                     'You can try the manual method:\n'+
//                     '1. npx clear-npx-cache:\n'+
//                     '2. npm uninstall -g create-my-microfrontend:\n' +
//                     '3. npm install -g create-my-microfrontend'
//                 )
//             }
//         }
//     });
// }
function checkVersion() {
    const localVersion = execSync("npm list -g create-my-microfrontend version")
        .toString()
        .trim();
    const repoVesion = execSync("npm view create-my-microfrontend version")
        .toString()
        .trim();
    if (!localVersion.includes(repoVesion)) {
        /* Update version create-my-microfrontend */
        console.log("Updating latest version...");
        const updateCMM = runCommand(
            `npm update -g create-my-microfrontend`,
            undefined,
            "inherit"
        );
        if (!updateCMM) {
            console.log(
                "Failed to update the last version:\n" +
                    "You can try the manual method:\n" +
                    "1. npx clear-npx-cache:\n" +
                    "2. npm uninstall -g create-my-microfrontend:\n" +
                    "3. npm install -g create-my-microfrontend"
            );
        }
    }
}

/* Check package */
function checkPackage() {
    let result = runCommand("npm list -g", "create-my-microfrontend");
    if (!result) {
        const installCMM = runCommand(
            `npm i -g create-my-microfrontend`,
            undefined,
            "inherit"
        );
        if (installCMM) {
            const checkGlobal = runCommand(
                "npm list -g",
                "create-my-microfrontend"
            );
            return checkGlobal;
        } else {
            return false;
        }
    }
    checkVersion();
    return true;
}

if (!checkPackage()) {
    console.log("Sorry, something went wrong.");
    process.exit(-1);
}
const pathMicro = path.join(
    execSync("npm root -g").toString().trim(),
    "create-my-microfrontend"
);

/* Copy package */
const opsys = process.platform;
let copyPackage, runCopy, pathNow;
if (opsys == "darwin" || opsys == "linux") {
    pathNow = execSync("pwd").toString().trim();
    /* Delete package.json */
    if (fs.existsSync("package.json")) {
        if (!runCommand("rm package.json")) process.exit(-1);
    }
    copyPackage = `cp ${pathMicro}/package.json ${pathNow}`;
} else if (opsys == "win32" || opsys == "win64") {
    pathNow = execSync("cd").toString().trim();
    /* Delete package.json */
    if (fs.existsSync("package.json")) {
        if (!runCommand("del package.json")) process.exit(-1);
    }
    copyPackage = `xcopy /s ${pathMicro}\\package.json ${pathNow}`;
}

runCopy = runCommand(copyPackage);
if (!runCopy) process.exit(-1);

// const { init } = require("./cli.js");

// init();
