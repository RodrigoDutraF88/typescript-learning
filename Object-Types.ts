//In Javasript the fundamental way to group and pass arround data is through objects, in TypeScript we represent those though object types
//Object types
//they can be annonymous
function greet(person: { name: string; age: number}){
    return "OIoi" + person.name;
}

//Or they can be named by using either an interface or type alias

//1)
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
//2)
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}

//Optional properties use "?"
//Under strictNullChecks TypeScript will tell us that they're potentially undefined

//readonly Properties
interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType){

    console.log(`prop has the value '${obj.prop}'.`);
    // can do this

    obj.prop = "ola";
    //can't do this, because of readonly
}
// we can read and update properties but can't write to the property itself

//Index signatures
interface StringArray {
    [index: number]: string; // states that when a StringArray is indexed with a number, it will return a string.
}
const minhaArray: StringArray = getStringArray();
const segundoItem = minhaArray[1];
//only some types are allowed for index signatures properties: string, number, symbol

//Properties from different types are acceptable if the index signature is union of the property types
interface NumberOrStringDictionary {
    [index: string]: number | string;
    lengh: number; //ok
    name: string; //ok
}

//can combine with readonly also( to prevent assignment to their indices)
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

//Excess Property Checks
// Object literals get a special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments.
//To get around some of the erros that come with this just use a type assertion:
//exemple:
//...
let mySquare = createSquare({ colour: "red", width: 100 });
//"Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?"
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//now it doesn't trigger an error

// A better approach might be to add a string index signature if you're sure that the object can have some extra properties
//exemple:
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: unknown;
} //basically saying that SquareConfig can have any number of Properties and as long as they aren't color or width , their types don't matter.

//Extending Types, i learned this before doing DTOs with Nest.js

//2 examples of interface, so that you don't have to rewrite the in common parts of these objects you can use exetends

//1)
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
//2)
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string; // just need to add the new members we want
}

// Also a Interface can extend from multiple types
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

// Intersection Types
// comnine existing types using &
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;

//Interface Extension vs Intersection
//Main difference is that in INtersection, TypesScript will expect the property to satisfy both types simultaneously, witch can lead to erros
//ex 
interface Person1 {
  name: string;
}
 
interface Person2 {
  name: number;
}
 
type Staff = Person1 & Person2
 
declare const staffer: Staff;
staffer.name; // Type here is never, can't be number and strign at the same time

//Generic Object Types
interface Box<Type> {
    constents: Type;
}

let box: Box<string>;
//Box is reusable in that Type can be subsdtituted with anything, that means we don't need to declare a new Box type  when we need a box for a new type.

//We can avoid overloads entirely by insted using generic functions
function setContents<Type>(box: Box<Type>, newContents: Type){
    box.contents = newContents;
}

// Type aliases can also be generic:
type Box<Type> = { // Type instead of interface
  contents: Type;
};

// since type alias can describe more than just object types, we can also use them to create other kinds of generic helper types
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

//The Array Type
//Whenever we write number[] that just a shorthand Array<number>

//Array itself is a generic type

//The ReadonlyArray Type is a special type that descibres arrays that souldn't be changed
// we can read ( can use for ex: .slice() )but can't mutate like .push

function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
//"Property 'push' does not exist on type 'readonly string[]'."

//UNlike array, there isn't a ReadOnlyArray contructor that we can use
new ReadonlyArray(...) //doesnt work

//instead we can assign Arrays to ReadonlyArrays
const roArray: ReadonlyArray<string> = ["red", "green"];

// just like there's the shorthand syntax for Array<Type> with Type[]
//There's the readonly Type[] for ReadonlyArray<Type>.

function doStuff(values: readonly string[]){
    //...
}

//TUPLE TYPES
//Tuple types is another sort of Array that knows how many elements it contains and which types it contains at specific positions
type StringNumberPairs = [string, number];

//we can also destructure tuples using JAvaScript array destructuring
function doSomething(stringHash: [string, number]){
    const [inputString, hash] = stringHash;

    console.log(inputString) //type string
    console.log(hash) // type number
};

//other exemples of tuples
type StringNumberBooleans = [string, number, ...boolean[]];
//describes a tuple whose first two elements are string and number respectively, but which may have any number of booleans following.

type BooleansStringNumber = [...boolean[], string, number];
//describes a tuple whose starting elements are any number of booleans and ending with a string then a number.


// tuple with rest element has no let "lenght" it only has a set of well-known elements i diferent positions

//Readonly Tuple Types
//just like with the array shorthand syntax:
function doSomething(pair: readonly [string, number]) {
    //bleble
}

