import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import fs from 'fs';

const dataBuffer = fs.readFileSync('KesavaReddy_FullStack_Developer_Resume.pdf');
const data = await pdf(dataBuffer);
console.log(data.text);
