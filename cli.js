"use strict";

import fs from "fs";
import chalk from "chalk";
import { execSync, spawn } from "child_process";

// const fs = require("fs");
// const chalk = require("chalk");
// const { execSync, spawn } = require("child_process");

/* Run Command */
function runCommand(command) {
    try {
        // execSync(`${command}`, { stdio: 'inherit' });
        execSync(`${command}`, { stdio: 'ignore' });
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
    // const program = new commander.Command(packageJson.name)
    // const ls = spawn("npm", ["i"]);
    // ls.stdout.on("data", (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // console.log("Installation process..")
    // const runInstallPackage = `npm install`;
    // if (!runCommand(runInstallPackage)) {
    //     console.error(`Installation failed!`);
    //     process.exit(-1);
    // }

    // /* Check git */
    // if (!runCommand("git --version")) {
    //     console.error(`Please install ${chalk.green("git")} before continuing!`);
    //     process.exit(-1);
    // }

    // const repoName = process.argv[2] || "micro";
    // /* Check folder exists */
    // if (fs.existsSync(repoName)) {
    //     console.error(`Project name ${chalk.red(repoName)} is exist please use a different name!`);
    //     process.exit(-1);
    // }

    // /* Check valid name */
    // if (!validChar(repoName)) {
    //     console.error(`Project name ${chalk.red(repoName)} cannot contain uppercase letters`);
    //     process.exit(-1);
    // }

    // let appFramework = process.argv[3];
    // const validApp = ["--react"];
    // /* Check valid type app template */
    // if (typeof appFramework !== 'undefined') {
    //     if (!validApp.includes(appFramework)) {
    //         console.error(`Invalid type app ${chalk.red(appFramework)} you can use ${chalk.blue("--react")}`);
    //         process.exit(-1);
    //     }
    // } else {
    //     appFramework = "--react";
    // }
    // appFramework = appFramework.slice(2, appFramework.length) + "-app";
    // console.log(`Create ${appFramework} ⬅️`);
    // const gitCheckoutCommand = `git clone --depth 1 --filter=blob:none --sparse https://github.com/ugiispoyo/Micro-Id.git ${repoName} && cd ${repoName} && git sparse-checkout init --cone && git sparse-checkout set ${appFramework}`;
    // console.log(`⏳ Cloning process "${repoName}"..`);
    // const checkedOut = runCommand(gitCheckoutCommand);
    // if (!checkedOut) process.exit(-1);

    // // const opsys = process.platform;
    // // if (opsys == "darwin" || opsys == "linux") {
    // // } else if (opsys == "win32" || opsys == "win64") {
    // // }
    // console.log("🎊 🎊 🎊 Congratulations! 🎊 🎊 🎊");
    // console.log("😃 Happy coding 😃");
    // console.log("");
    // console.log(`cd ${repoName} && npm start`);
    // console.log("");
}

// export { init };
module.exports = {init}
