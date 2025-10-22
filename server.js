const express = require("express");
const cors = require("cors");
const env = require("dotenv").config({ path: [".env.dev", ".env"] });
const { compileCPP } = require("./operates/compile");
const { getTestcases } = require("./operates/testcases");

const app = express();
const PORT = env.parsed.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/ping", (req, res) => {
    return res.send("pong");
});
app.use("/testcases/get", (req, res) => {
    if (!req.query.problemId) {
        return res.status(400).json({ error: true, message: "Missing problemId parameter." });
    }
    let problemId = req.query.problemId;
    let baseDirectory = env.parsed.TESTCASE_BASE_DIR || "./test";
    let result = getTestcases(problemId, baseDirectory);
    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});