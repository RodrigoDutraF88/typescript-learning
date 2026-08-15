//Major part of software engennering is building components that can be reusable
//In C#, Java, one of the tools for creating reusable components is generics
//That is, being able to create a component that can work over a variaty of types rather than a single one.

//This allows users to consume these components and use their own types

//HELLO WORD OF GENERICS

//the identity function
function identity(arg: any): any{
    return arg;
}
//will return whatever is passed in, similar to echo command

//While using any is certai ly generic, we loose information about what type was when the function returns
// if we passed a number, we only know that any type could return
//We need a way of capturing the type of the argument, to denotate what is being returned
//We can use the Type variable, works on types rather than values
function identity<Type>(arg: Type): Type{
    return arg;
}
//This allows us to capture the type the user provides, so we can use this info later
//Here we used it to specify the return type

//Here we can write a generic function
let output = identity<string>("myString");

//or let the compiler set it for us
let output= identity("myString")

//Generic Types

function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Type>(arg: Type) => Type = identity;

//We can create generic Classes 
//Can't create genric enums and namespaces

class GenericNumber<NumType>{
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
//putting type parameters in the class itself let us make sure all the properties of the class are working with the same type

//Generic Constraints

//We can create an interface that describes our constrain
//ex:
interface Lengthwise{
    length: number;
}

function loggingIdentity<Type extends Lenghtwise>(arg: Type): Type{ //using extends
    console.log(arg.lenght); //Now we know it has a .lenght propertie, so no more error
    return arg;
}
//bc the generic func is now contrained, it will no longer work over any and all types
loggingIdentity(3); //Error
loggingIdentity({ length: 10, value: 3 }); //need to pass in values whose type has all the required properties

//Using Type parameters in Generic Constraints
//Used to declare a type parameter that is constrained by another type parameter, for example, here we'd like to get a property from an object given its name
//We'd like to ensure we're no accidentaly grabbing a property that does not exist on the obj, so we'll place a constraint between the two types
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
//Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

//Using Class Types in Generics

function create<Type>( c: {new (): Type}): Type {
    return new c();
}

//Generic Parameter Defaults
//We are able to reduce this:
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;
// To this:

declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;
 
const div = create();
      
const div: Container<HTMLDivElement, HTMLDivElement[]>
 
const p = create(new HTMLParagraphElement());
     
const p: Container<HTMLParagraphElement, HTMLParagraphElement[]>
// A generic parameter default follows the following rules:
// A type parameter is deemed optional if it has a default 
// When you specify type arguments, only do so for the required ones
//Defaut types for a type parameter must satisfy the constrain for the type parameter if it exists
//These are the main ones

//Variance Annotations
// Covariance and contravarience
// // are type theory terms that describe what the relationships between two generic types is
// Example
interface Producer<T> {
    make(): T;
}
// We can use Producer<Cat> where a Produce>Animal> id expected, because cat is an animal
// Covariance: The relantionship from Producer<T> to Producer<U> is the same as the one from T to U

interface Consumer<T> {
    consume: (arg: T) => void;
}
//We can use a Consumer>Animal> where a Consumer<Cat> is expected because any function is capable of accepting an Animal must also be able to accept cat
//Contravariance: The relationship from Consumer<T> to Connsumer<U> is the smae as the one from U to T
// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}
// Covariant annotation
interface Producer<out T> {
  make(): T;
}
// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
