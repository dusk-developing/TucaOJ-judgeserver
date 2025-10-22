const { spawn } = require("child_process");
const { existsSync } = require("fs");

function executeCPP(executablePath, input, timelim, memlim) {
    if (!existsSync(executablePath)) {
        return Promise.resolve({ ok: false, message: "Executable file does not exist." });
    }
    return new Promise((resolve, reject) => {
        const command = spawn(executablePath, [], {
            stdio: ["pipe", "pipe", "pipe"],
            detached: false
        });
        let stdout = "";
        let stderr = "";
        let timedOut = false;
        const timer = setTimeout(() => {
            timedOut = true;
            command.kill("SIGKILL");
        }, timelim);
        command.stdin.write(input);
        command.stdin.end();
        command.stdout.on("data", (data) => {
            stdout += data.toString();
        }
        );
        command.stderr.on("data", (data) => {
            stderr += data.toString();
        });
        command.on("close", (code) => {
            clearTimeout(timer);
            if (timedOut) {
                resolve({ ok: false, message: "Time Limit Exceeded" });
            } else if (code !== 0) {
                resolve({ ok: false, message: `Runtime Error: ${stderr}` });
            } else {
                resolve({ ok: true, output: stdout });
            }
        });
    });
}

// executeCPP(process.argv[2], process.argv[3], parseInt(process.argv[4]), parseInt(process.argv[5])).then(result => {
//     if (result.ok) {
//         console.log("Execution succeeded.");
//         console.log(`Output:\n${result.output}`);
//     } else {
//         console.error("Execution failed:");
//         console.error(result.message);
//     }
// });

module.exports = { executeCPP };