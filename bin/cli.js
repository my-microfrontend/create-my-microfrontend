#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch(e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/ugiispoyo/Micro-Id.git ${repoName}`;
// const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if(!checkedOut) process.exit(-1);

const removeOther = `cd ${repoName} && rm -rf bin && rm .npmignore && git remote rm origin`;
const execRemoveOther = runCommand(removeOther);
if(!execRemoveOther) process.exit(-1);

// console.log(`Installing dependencies for ${repoName}`);
// const installeDeps = runCommand(installDepsCommand);

// if(!installeDeps) process.exit(-1);

console.log("Congratulations!");
console.log(`cd ${repoName} && npm start`);
