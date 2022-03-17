#!/usr/bin/env node

'use strict';

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

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
    return true;
}

if (!checkPackage()) {
    console.log("Sorry, something went wrong.");
    process.exit(-1);
}
const pathMicro = path.join(execSync("npm root -g").toString().trim(), "create-my-microfrontend");

/* Copy package */
const opsys = process.platform;
let copyPackage, runCopy, pathNow;
if (opsys == "darwin" || opsys == "linux") {
    pathNow = execSync("pwd").toString().trim()
    copyPackage = `cp ${pathMicro}/package.json ${pathNow}`
} else if (opsys == "win32" || opsys == "win64") {
    pathNow = execSync("pwd").toString().trim()
    copyPackage = `copy ${pathMicro}\package.json ${pathNow}`
}
runCopy = runCommand(copyPackage);
if(!runCopy) process.exit(-1);

// const { init } = require("./cli.js");

// init();
