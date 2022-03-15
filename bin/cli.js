#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e.message);
        return false;
    }
    return true;
};

const repoName = process.argv[2] || "micro";
let appFramework = "react-app";
if (
    process.argv[3] && (process.argv[3] === "--react" ||
    process.argv[3] === "--vue")
) {
    appFramework = process.argv[3].slice(2, process.argv[3].length) + "-app";
}
console.log(`Create ${appFramework} ⬅️`);
const gitCheckoutCommand = `git clone --depth 1 https://github.com/ugiispoyo/Micro-Id.git ${repoName}`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

let removeOther, execRemoveOther;
const opsys = process.platform;
if (opsys == "darwin" || opsys == "linux") {
    // removeOther = `cd ${repoName} && rm -rf bin && rm .npmignore && git remote rm origin`;
    removeOther = `cd ${repoName} && rm package.json && mv ${appFramework}/* ../${repoName} && rm -rf react-app && rm -rf vue-app && rm -rf bin && rm .npmignore && git remote rm origin`;
    execRemoveOther = runCommand(removeOther);
} else if (opsys == "win32" || opsys == "win64") {
    removeOther = `cd ${repoName} && del package.json && mv ${appFramework}/* ../${repoName} && rmdir /S /q "react-app" && rmdir /S /q "vue-app" && rmdir /S /q "bin" && del .npmignore && git remote rm origin`;
    execRemoveOther = runCommand(removeOther);
}

if (!execRemoveOther) process.exit(-1);

// const installDepsCommand = `cd ${repoName} && npm install`;
// console.log(`Installing dependencies for ${repoName}`);
// const installeDeps = runCommand(installDepsCommand);

// if(!installeDeps) process.exit(-1);

console.log("🎊 🎊 🎊 Congratulations! 🎊 🎊 🎊");
console.log("😃 Happy coding 😃");
console.log("");
console.log(`cd ${repoName} && npm start`);
console.log("");
