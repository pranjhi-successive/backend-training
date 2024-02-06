import { appendFileSync } from 'fs';
import {
    add, div, mult, sub,
} from './src/lib/math.js';

const Math = (num1, num2) => {
    const csvData = [
        ['Operations', 'num1', 'num2', 'Result'],
        ['Addition', num1, num2, add(num1, num2)],
        ['Subtraction', num1, num2, sub(num1, num2)],
        ['Multiplication', num1, num2, mult(num1, num2)],
        ['Division', num1, num2, div(num1, num2)],
    ];
    const csvString = `${csvData.map((row) => row.join(',')).join('\n')}\n\n`;
    appendFileSync('Math Result.xlsx', csvString, 'utf-8');
};
console.log(process.argv);
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Invalid!");
} else {
    const num1 = Number(args[0]);
    const num2 = Number(args[1]);
    console.log(num1,num2);
    if (!(num1 && num2)) {
        console.log("undefined");
    } else {
        Math(num1, num2);
    }
}
