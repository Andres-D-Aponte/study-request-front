require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

const devModePath = `./src/environments/environment.development.ts`;
const prodModePath = `./src/environments/environment.ts`;

const envDevMode = `export const environment = {
    API_URL: "${process.env.API_URL}",
};`;

const envProdMod = `export const environment = {
    API_URL: "${process.env.API_URL}",
};`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(devModePath, envDevMode);
writeFileSync(prodModePath, envProdMod);