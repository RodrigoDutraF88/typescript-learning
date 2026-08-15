//Typescript is basically a extension of Javascript
//is adds new features like new types
// Is "Javascript with Type Checking"
//uses Static Typing
//Interfaces

//You can use interfaces to annotate parameters and return values to functions:
interface User {
  name: string;
  id: number;
}

function deleteUser(user: User) {
  // ...
}
 
function getAdminUser(): User {
  //...
}


//Composing types, you can create your own types
//There are two ways of doing it: Unions and Generics

//Unions:
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";

//Unions in functions, very usefull:
function getLength(obj: string | string[]) { // array or string
  return obj.length;
} 

//To learn a type of variable you can use typeof:
//string ; typeof s === "string"
// Example in function
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
            
  }
  return obj;
}

//Generics
//they provide variables to types.
//Common examples
//Array with generics can describe the values of array it contain

type NumberArray = Array<number>;
// I used to always see this in code, nice to finally understand it

//you can also declare your own types that use generics,
interface Backpack<Type> { 
  add: (obj: Type) => void;
  get: () => Type;
}
 

// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);

//Structural Type System
//type checking focuses on the shape that values have
//"duck typing" or "structural typing"

//If the object or class has all the required properties, TypeScript will say they match, regardless of the implementation details.