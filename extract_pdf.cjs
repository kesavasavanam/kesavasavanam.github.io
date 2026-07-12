const { createRequire } = require('module');
const fs = require('fs');

async function main() {
  const pdfParse = require('pdf-parse');
  console.log('Type of pdfParse:', typeof pdfParse);
  console.log('Keys:', Object.keys(pdfParse));
  const dataBuffer = fs.readFileSync('KesavaReddy_FullStack_Developer_Resume.pdf');
  const parseFn = pdfParse.default || pdfParse;
  const data = await parseFn(dataBuffer);
  console.log(data.text);
}

main().catch(console.error);
