#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: "ignore" });
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
const gitCheckoutCommand = `git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  https://github.com/ugiispoyo/Micro-Id.git ${repoName} \
;
cd ${repoName}
git sparse-checkout init --cone
git sparse-checkout set ${appFramework}`;

console.log(`⏳ Cloning the repository with name "${repoName}"..`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

// const opsys = process.platform;
// if (opsys == "darwin" || opsys == "linux") {
// } else if (opsys == "win32" || opsys == "win64") {
// }

console.log("🎊 🎊 🎊 Congratulations! 🎊 🎊 🎊");
console.log("😃 Happy coding 😃");
console.log("");
console.log(`cd ${repoName} && npm start`);
console.log("");
