import _ from 'lodash';

const add = (num1: number, num2: number): number => _.add(num1, num2);
const sub = (num1: number, num2: number): number => _.subtract(num1, num2);
const mult = (num1: number, num2: number): number => _.multiply(num1, num2);
const div = (num1: number, num2: number): number => _.divide(num1, num2);
export {
    add, sub, mult, div,
};
