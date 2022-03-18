#!/usr/bin/env node

"use strict";

// const https = require("https");
// const path = require("path");
// const fs = require("fs");
// const { execSync } = require("child_process");

// import https from "https";
// import path from "path";
// import fs from "fs-extra";
import { execSync } from "child_process";
import { init, runCommand } from "./cli.js";

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

console.log("\nIs processing..\n");
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

/* Check git */
if (!runCommand("git --version")) {
    console.error(`Please install "git" before continuing!\n`);
    process.exit(-1);
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
        /* Clear Cache npx */
        runCommand(`npx clear-npx-cache`);
        runCommand(`npm uninstall -g create-my-microfrontend`);
        const updateCMM = runCommand(
            `npm update -g create-my-microfrontend`,
            undefined,
            "inherit"
        );
        if (!updateCMM) {
            console.error(
                "Failed to update the last version!\n" +
                    "You can try the manual method:\n" +
                    "1. npx clear-npx-cache\n" +
                    "2. npm uninstall -g create-my-microfrontend\n" +
                    "3. npm install -g create-my-microfrontend\n"
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
    console.error("Sorry, something went wrong.\n");
    process.exit(-1);
}

/* Copy package */
const opsys = process.platform;
let pathNow;
if (opsys == "darwin" || opsys == "linux") {
    pathNow = execSync("pwd").toString().trim();
} else if (opsys == "win32" || opsys == "win64") {
    pathNow = execSync("cd").toString().trim();
}

// const { init } = require("./cli.js");

init(pathNow);
