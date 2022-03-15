#!/usr/bin/env node

const { execSync, exec } = require("child_process");

const runCommand = (command, type = "linux") => {
    try {
        if (type === "win") {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Failed to execute ${err}`);
                    return false;
                }
            });
        } else {
            execSync(`${command}`, { stdio: "inherit" });
        }
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.argv[2] || "micro";
const gitCheckoutCommand = `git clone --depth 1 https://github.com/ugiispoyo/Micro-Id.git ${repoName}`;
// const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

let removeOther, execRemoveOther;
const opsys = process.platform;
if (opsys == "darwin" || opsys == "linux") {
    removeOther = `cd ${repoName} && rm -rf bin && rm .npmignore && git remote rm origin`;
    execRemoveOther = runCommand(removeOther);
    if (!execRemoveOther) process.exit(-1);
} else if (opsys == "win32" || opsys == "win64") {
    removeOther = `cd ${repoName} && rmdir "bin" && del .npmignore && git remote rm origin`;
    execRemoveOther = runCommand(removeOther, "win");
}

if (!execRemoveOther) process.exit(-1);

// console.log(`Installing dependencies for ${repoName}`);
// const installeDeps = runCommand(installDepsCommand);

// if(!installeDeps) process.exit(-1);

console.log("Congratulations!");
console.log(`cd ${repoName} && npm start`);
