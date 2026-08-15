//Function type expressions
//the simplest way to describe a function
//similar sintax to arrow functions
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);

//The sintax (a: string) => void means :
//a function with one parameter named a, of type string, that doesnt have a return value.

//just like with functions declarations , if a parameter type isn't specified, it's implicitly any.
//Parameter name IS REQUIRED, ex: function type (string) => void means:
//function with a parameter named string of type ANY

//you can use a type alias to name a function type
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction){
    // ....
}

//Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
 
doSomething(myFunc);

//Construct Signatures
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

//Some objects, like JavaScript’s Date object, can be called with or without new. You can combine call and construct signatures in the same type arbitrarily

//Generic Functions
//Its common to write a function where the types of the imput are realted to the type of the output, like in the example
function firstElement(arr: any[]) {
  return arr[0];
}
//But it'd be better if the return was of the array type
//In TypeScript Generics are used when we want to describe a correspondence between two values, we do this by declaring a type parameter in the function signature
function fistElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
// by adding the parameter type to this function and the output we've created a link between the input and the output of the function.
//now when we call it a more specific type comes out
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

//Inference
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// constrains: we can use it to limit the kinds of types that a type parameter can accept

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
//Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.

//when possible it's recomended to use the type parameter itself rather than constraining it
function firstElement1<Type>(arr: Type[]){
    return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad),inferred return type is any because TypeScript has to resolve the arr[0] expression using the constraint type
const b = firstElement2([1, 2, 3]);

//We have to be careful and realize that the simpler version is better:
//ex:
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");
//can be written:
function greet(s: string) {
  console.log("Hello, " + s);
}

//Type parameters are for relating the types of multiple values, if a type parameter is only used once in the function, it's not relating anything.

//Optional Parameters can be used in callbacks

//Function Overloads
//In Typescript we can specify a function that can be called in different ways by writing overload signatures.
// (that really cool)
//the signature used to write a function can't be seen from outside, when writing an overloaded function, you should always have two or more signatures above the implementation of the function
//writting good Overloads:
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
//this function is fine we can involke it with strings or arrays, however we can't invoke it with a value that might be a string or an array

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]); //not ok

//we can instead write a non-overload version of the function
function len(x: any[] | string) {
  return x.length;
}

// ALWAYS PREFER PARAMETERS WITH UNION TYPES INSTEAD OF OVERLOADS WHEN POSSIBLE, so much easier

//Declaring this in Function, this part is important, i always see it in code, kinda already know what it does.
//Typescript infers what this shoulf be via code flow analysis

const user = {
    id: 123,

    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};

//TYpeScript understand that the function user.becomeAdmin has a corresponding "this" which is the outer object user.

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
//This pattern is common with callback-style APIs, where another object typically controls when your function is called.

//Other Types to know about
//void: represents the return value of functions which don't return a value. 
function noop(){
    return;
}
//VOID IS NOT THE SAME AS UNDEFINED

//Object: refers to any value that isn't a primitive: (number, bigint, boolean, symbol, null, undefined)

//Unknown : represents any value , similar to "any"type but it's safer because it's not legal to do anything with an unknown value
function f1(a:any){
    a.b(); //ok 
}
function f2(a: unknown){
    a.b();
    //not ok
}
//why is this useful? you can decribe a function that returns a value of unknown type
function safeParse(s: string): unknown {
    return JSON.parse(s);
}
// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);

//Never : Some functions never return a value
function fail(msg: string): never {
    throw new Error(msg),
};
// in a return type, this means that the function throws an exception or terminates execution of the program.
//also appears when TypeScript determines there's nothing left in a union
function fn(x: string | number){
    if(typeof x === "string"){
        //bla
    } else if (typeof x === "number"){
        //bleble
    } else {
        x; // has type NEVER
    }
}

//Function:
function doSomething(f: Function) {
  return f(1, 2, 3);
}
//normally avoided because it's a unsafe any return type
// if you need to accept an arbitrary function but don't intend to call it, the type () => void is generally safer

//Rest Parameters and Arguments
//a rest parameters uses the ... syntax and appears after all other parameters
// in typescript the type annotation on these parameters is implicitly any[] instead of any
//any type annotation given must be of the form Array<T> or T[]
//or tupple
//exemple:
function multiply(n: number, ...m: number[]){
    return m.map((x)=> n * x);
}
//Rest Arguments
//the push method of arrays takes any number of arguments
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
arr1.push(...arr2);

//Parameter Destructuring
//you can use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body
// in javascript looks like this
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
//Type annotation for the object goes after the destructuring syntax
function sum({a, b, c}: { a: number; b: number; c:number}){
    console.log( a + b + c);
}
// you can use a named type here as well:
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}

//Assignability of Functions

//return type VOID
//contextual typing with a return type void does not force functions to not return something
//It CAN return another value but it is going to be ignored
//Thus the following implementations of the type void() => are valid

type voidFunc = () => void;

const f1: voidFunc = () => {
    return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function() {
    return true;
}

//all of these implementations are valid
const v1 = f1();
 
const v2 = f2();
 
const v3 = f3();
// when assigned to another variable it will retain the type of void
// this behavior exist so that this can be done:
const src = [1, 2, 3];
const dst = [0];
 
src.forEach((el) => dst.push(el));

//Obs: a literal function definition has a void return type, that a function must not return anything

