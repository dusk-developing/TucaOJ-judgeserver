const fs = require("fs");
const path = require("path");
const json = require("json5");
const normalize = require("../extra_modules/normalize").normalize;

function getTestcases(problemId, baseDirectory) {
    let problemDir = path.join(baseDirectory, problemId);
    console.log(`Looking for testcases in ${problemDir}`);
    if (!fs.existsSync(problemDir)) {
        console.error(`Problem directory ${problemDir} does not exist.`);
        return { ok: false, message: "Problem directory does not exist." };
    }
    let inputDir = path.join(problemDir, "input");
    let outputDir = path.join(problemDir, "output");
    if (!fs.existsSync(inputDir) || !fs.existsSync(outputDir)) {
        console.error(`Input or output directory does not exist for problem ${problemId}.`);
        return { ok: false, message: "Input or output directory does not exist." };
    }
    let input_files = fs.readdirSync(inputDir).filter(file => file.endsWith(".in"));
    let output_files = fs.readdirSync(outputDir).filter(file => file.endsWith(".out"));
    let testcases = [];
    input_files.forEach(input_file => {
        let testcaseId = path.basename(input_file, ".in");
        let output_file = `${testcaseId}.out`;
        if (output_files.includes(output_file)) {
            let inputPath = path.join(inputDir, input_file);
            let outputPath = path.join(outputDir, output_file);
            let inputContent = fs.readFileSync(inputPath, "utf-8");
            let outputContent = fs.readFileSync(outputPath, "utf-8");
            testcases.push({
                id: testcaseId,
                input: normalize(inputContent),
                output: normalize(outputContent)
            });
        }
    });
    return { ok: true, testcases: testcases };
}

// console.log(getTestcases("P1001", "./test").testcases.at(0).input);
export default { getTestcases };