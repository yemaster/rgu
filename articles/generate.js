const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const assetsDir = path.join(__dirname, "data/assets");
const outDir = path.join(__dirname, "../public/data");
const assetsOutDir = path.join(__dirname, "../public/assets");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

if (!fs.existsSync(assetsOutDir)) {
    fs.mkdirSync(assetsOutDir);
}

const assetsFiles = fs.readdirSync(assetsDir);
assetsFiles.forEach((file) => {
    const filePath = path.join(assetsDir, file);
    const fileOutPath = path.join(assetsOutDir, file);
    fs.copyFileSync(filePath, fileOutPath);
});

const mdFiles = fs.readdirSync(dataDir).filter((file) => path.extname(file) === ".md");

const outlines = [];

mdFiles.forEach((file) => {
    const filePath = path.join(dataDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const [header, ...contentLines] = fileContent.split("---");
    const content = contentLines.join("---").trim().replace(/.[/\\]assets[/\\]/g, '/assets/');

    const keys = {};
    keys.path = path.basename(file, ".md");
    header.split("\n").forEach((line) => {
        const [key, ...value] = line.split(": ");
        const keyTrim = key.trim();
        if (!keyTrim) {
            return;
        }
        keys[keyTrim] = value.join(": ").trim();
    });

    const jsonObject = {
        ...keys,
        content,
    };

    const jsonFileName = path.basename(file, ".md") + ".json";
    const jsonFilePath = path.join(outDir, jsonFileName);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObject, null, 2), "utf-8");

    delete jsonObject.content;
    outlines.push(jsonObject);
});

const outlinesFilePath = path.join(outDir, "outlines.json");
fs.writeFileSync(outlinesFilePath, JSON.stringify(outlines, null, 2), "utf-8");

console.log("Done!");