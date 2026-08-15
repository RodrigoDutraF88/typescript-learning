//Modules

// IN JAVASCRIPT
// ES Modules :  import/export
// ComminJS : module.exports =

//any file containing top-level import or export is considered a module
// if you want a file to be trated as a module you just need to add the line:
export {};

//IN TYPESCRIPT

//ES Module Syntax:

//main export via:
export default function helloWorld() {
    console.log("Hello, world!");
}
// imported via:
import helloWorld from "./hello.js"
helloWorld();

//You can have more than one export of variables and functions via omitting default
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
//import:
import { pi, phi, absolute} from "./maths.js"
console.log(pi);
const absPhi = absolute(phi);

//Import can be renamed using "as"
import {pi as P} from "./maths.js"
//You can take all of exported objects and put thme into a single namespace using * as name
import * as math from "./maths.js"; //now all exports were imported as math
console.log(math.pi);

//In TypeScript types can be imported using the same sintax as JavaScript values
//Typescript has extended the import syntax with two concepts for declaring an import of a type
//@filename: annimal.ts
export type Cat = { breed: string; yearOfBirth: number};

//import 
import type { Cat, Dog} from "./animal.js";
export type Animals = Cat | Dog;

// COMMONJS SYNTAX

//exporting
function absolute(num: number){
    if (num < 0) return num * -1;
    return num;
}

module.exports ={
    pi: 3.14,
    squareTwo: 1.41
}
// importing
const maths = require("./maths")
maths.p1;
//or importing destructuring 
const { squareTwo} = require("./maths");
squareTwo;

