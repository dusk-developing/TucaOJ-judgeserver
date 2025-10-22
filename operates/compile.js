const { spawn } = require("child_process");

function compileCPP(codePath, targetPath) {
    return new Promise((resolve, reject) => {
        const args = ["-o", targetPath, codePath, "-std=c++17", "-O2", "-Wall", "-Wextra", "-Wpedantic"];
        const startTime = Date.now();
        const command = spawn("g++", args);
        let stderr = "";
        command.stderr.on("data", (data) => {
            stderr += data.toString();
        });
        command.on("close", (code) => {
            const compileTime = Date.now() - startTime;
            if (code === 0) {
                resolve({ ok: true, time: compileTime });
            } else {
                resolve({ ok: false, error: stderr, time: compileTime });
            }
        });
    });
}

// compileCPP(process.argv[2], process.argv[3]).then(result => {
//     if (result.ok) {
//         console.log("Compilation succeeded.");
//         console.log(`Compilation time: ${result.time} ms`);
//     } else {
//         console.error("Compilation failed:");
//         console.error(result.error);
//     }
// });

module.exports = { compileCPP };