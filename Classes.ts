//Classes

class Point {}
//here is a empty one

//Fields
//field declaration creates a public writteable property on class
class Point {
    x: number;
    y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

// strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor

class BadGreeter {
    name: string; //error
}

class GoodGreeter {
    name: string;
    constructor(){
        this.name = "hello";
    }
}

// you can use ! to bypass that
class OKGreeter {
    name!: string;
}

//Fields can be prefixed with readonly, this prevents assignments to thw field outside the constructor
//exemple
class Greeter{
    readonly name: string = "mundo";
    constructor(otherName?: string){
        if (otherName !== undefined){
            this.name = otherName;
        }
    }

    err(){
        this.name = "not ok ERROR";
    }
}
const g = new Greeter();
g.name = "also not ok";

//Constructors
//they are very similar to function
class Point {
    x: number;
    y: number;

    constructor( x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}
//constructors can't have type paramters and return type annotations

//Super Calls
//if you have a base class you'll need to call super() in your contructor body before using any this.

//Methods
//Is a function property on a class
class Point {
    x = 10;
    y = 10;
    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}

//Getters and Setters
//classes can also have accessors
class C {
    _length = 0;
    get length(){
        return this._length;
    }
    set length(value){
        this._length = value;
    }
}
//RULES
// if get exists but no set, the property is automatically readonly
//if yhe type of the setter param is not specified, its inferred from the return type of the getter

//Class Heritage
//classes can inherit from base classes
class C implements A, B { ...}

//Extends Clauses 
class Animal {
    move(){
        console.log("indo ali");

    }
}
class Dog extends Animal {
    woof(times:number) {
        for (let i = 0; i< times; i++){
            console.log("auau");
        }
    }
}
const d = new Dog();
d.move(); ///base class method
d.woof(3);

//You can use super() to override methods

//Member Visibility: you can controll whenether certain methods or properties are visible to code outside the class

//public: default
class Greeter{
    public greet(){
        console.log("oi");
    }
}
cosnt g = new Greeter();
g.greet();

//protected: are only visible to subclasses of the class they're declared in

//private: is like protected, but doesn't allow acess to the members even from subclasses
//exemple:
class Base{
    private x = 0;
}
const b = new Base(); 
console.log(b.x); // ERROR, can't acess it 

//Because of private , a derived class can't increase their visibility

class Base {
    private x = 0;
}
class Derived extends Base {
    x = 1;
}

//Typescript allows cross-instance private access
class A {
    private x = 10;
    public sameAs(other: A){
        return other.x === this.x;
    }
}

// a private field can be accessed using bracket notation , these fields are soft private and don't strictly enforce privacy

//Static members: aren't associated with a particular instance of the class, can be accessed through the class constructor object itself
// also use the smae public, protectedm and private visibility

// Don't need a "static class" syntax in Typescript , because a regular object will do the job as well

class MyStaticclass{
    static doSomething() {}
}

function doSomething() {} //alternative

const MyHelperObject { //alternative
    dosomething() {},
}

//static Blocks in Classes

//Generic classes

class Box<Type> {
    contents : Type;
    constructor(value: Type){
        this.contents = value;
    }
}
const b = new Box("hello!");

//doesnt work for statics

//You can use "this is type" in the return position for methods in classes and interfaces .

//parameter properties
class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        privatez: number
    ){
        //no body necessary
    }
}
const a = new Params(1, 2, 3);
console.log(a.x);
console.log(a.z); // error , property z is private and only accessible within class 'Params'

//Class Expressions

//Abstract Classes and Members
// Classes, methods, fields in typescript may be abstract
// one that hasnt had an implementation provided 
//ROLE: serve as a base class for other subclasses
//CONCRETE: class that doesn't have any abstract members 

abstract class Base {
    abstract getName(): string;
    printName(){
        console.log("Ola," + this.gatName());
    }
}
const b = new Base(); //ERROR cannot create an isntance of an abstract class
//NEED TO MAKE A DERIVED CLASS AND IMPLEMENT THE ABSTRACT MEMBERS

class Derived extends Base {
    getName(){
        return "mundo";
    }
}
const d = new Derived()
d.printName();

//Relationship between classes
//can be used in place of each other because they're identical

