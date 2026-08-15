//The primitives: string, number and boolen

//arrays

//any, js doesnt have this, you can use it whenever you don't want a particular value to cause typechecking errors

//let :block scoped(only exists in the pair of curly braces {}), reassignable(you can assign a new value to that variable name), No redeclaration(can't declare the same variable name twice in the same scope)
//const : the recommended default for constants, block scoped, Not reassinable(but can modify its content if its an object or array), 
//var : avoid using,Function scoped, 

//Use const by default: If the value doesn't need to change, const makes your code safer and clearer.
//Use let when necessary: If you know the value needs to be reassigned (like in a loop or a toggle), use let.
//Avoid var, It is considered bad practice in modern development because its scoping behavior is counter-intuitive.

//Type annotations on Variables
let meuNome: string = "Rodrigo";

//Return type Annotations
function getFavoriteNumber(): number {
    return 26;
}

//Functions with return Promises, 
// a Promise is an object representing the eventual completion ,or failure, of an asynchronous operation and its resulting value.
// uses a async/await syntax
async function getFavoriteNumber(): Promise<number> {
    return 26;
    
}

//Anonymous Functions
//when a function appears in a place where typescript can determine how its going to be called, the parameters of that function are automatically given types
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
//this process is called contextual typing

//Object Types
// The parameters type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// adding "?" specify the ones that are optional
function printName(obj: { first: string; last?: string }) {
  // ...
}

//Union Types,
function printId( id: number | string){
    console.log("Your ID is:" + id);
}
//inside the function you can check its type with typeof, and do a if else for the type, in this exemple, number or string

//Type Aliases: a name for any type
//example:
type Point = {
  x: number;
  y: number;

}
function cordenadas(pt: Point){ //here
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });

//or even
type ID = number | string;

// Just like I saw in the last lesson, Interfaces declaration is another way to name a object type

//DIFERENCE BETWEEN TYPE ALIASES AND INTERFACES
// the key distinction is that a type cannot be re-opened to add a new 
//vs a interface which is always extendable

type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

 // Error: Duplicate identifier 'Window'.

//USING INTERFACE THIS WOULD BE POSSIBLE

//Type Assertions
//you can use type assertion to specify a more specific type
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

//Combining literals into unions:
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
//another exemple
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

//Combining with non literal types
interface Options {
  width: number;
}
function configure(x: Options | "auto") { //look
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

//Literal Inference: when you initialize a variable with an object, typescirpt assumes that teh properties of that object might change values later

//you can convert the entire object to be a type literal
const req = {url: "https:blabla", method: "GET" } as const;
handleRequest(req.url, req.method);


//NULL : signal of absent
//UNDEFINED : uninitialized value
//they are both primitives

//Non-null Assertion Operator(Postfix !)
//Writing ! after any expression is effectively a type assertion that the value isn't null or undefined
function Testando(x?: number | null){
  //no error
  console.log(x!.toFixed())
}

//Enums: Allows for describing a value which could be one of a set of possible named constants

//Less common primitives:

//bigint: used for large integers
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;

//symbol: used to create globally unique reference via the Symbol()
const firstName = Symbol("name");
