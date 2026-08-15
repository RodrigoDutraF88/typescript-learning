//There are a couple of different constructs Typescript understands for narrowing
//These special checks (called typeguards) and assignments, and the process of refining types to more specific types than declared is called narrowing
//typeof type guards!
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
                        
(parameter) padding: number
  }
  return padding + input;
           
(parameter) padding: string
}

//Truthiness narrowing
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") { //without this boolean check, there would be an error bellow
    for (const s of strs) { //here, 'str' is possibly null
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

//Equality narrowing
function example( x: string | number, y: string | boolean){
    if ( x === y ){
        //now we can call any string method
    }
}

//The IN operator narrowing: Operator that determines if an object or its prototype
// chain has a property with a name
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

//Instanceof narrowing
//JavaScript has an operator for checking if a value is an instance of another value
//In TypeScript instanceof is also a type guard , narrows in branches guarded by instanceof s

function logValue(x: Date | string){
    if ( x instanceof Date){
        console.log(x.toUTCString());
    } else{
        console.log(x.toLocaleUpperCase());
    }
}

//Assignments
//when we assign to any variable typescript looks at the right side of the assignment and narrows the left side appropriately
let x = Math.random() < 0.5 ? 10 : "hello world!";
   
x = 1; 
console.log(x);           

x = "goodbye!"; 
console.log(x);
//if i assigned boolean to x, it would give an error since that wasn't part of the declared type

//Control flow analysis
//analysis of code based on reachability is called control flow analisis
//example:
function example() {
  let x: string | number | boolean;
 
  x = Math.random() < 0.5;
 
  console.log(x);
             
let x: boolean
 
  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
               
let x: string
  } else {
    x = 100;
    console.log(x);
               
let x: number
  }
 
  return x;
        
let x: string | number
}

//Using type predicates
//Types can also be narrowed using Assertion functions

//Discriminated Unions
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
//Property 'radius' does not exist on type 'Shape'.
  //Property 'radius' does not exist on type 'Square'.
}

//but if we tried doing it like this:
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
                      
  }
}
//Now the narrowing was possible,

//The never type
//The Exhaustiveness checking
//The never type is assignable to every type, however no type is assignable to never exceptnever itself
//this means you can rely on never turning up to do exhaustive checking in a switch statement
//example:
type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}