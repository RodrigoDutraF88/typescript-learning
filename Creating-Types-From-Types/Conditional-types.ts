//Conditional types
//They help us describe the relation between the types pf inputs and outputs

interface Animal{
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number: string;
// Type example1 = number
type Exampple2 = RegExp extends Animal ? number : string;
// type Example2 = string

// REMEMBER : condition ? trueExpression : falseExpression

// We can use the conditional type yo simplify our overloads 
let c = createLabel(Math.random() ? "hello" : 42);

//Inferring Within Conditional Types

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

//Distributive Conditional Types
// we can make conditional types act on a generic type, they become distributive when given a union type
type ToArray<Type> = Type extends any ? Type[] : never;
// If we plug a union type into toArray, then the conditional type will be applied to each member of that union
type StrArrOrNumArr = toArray<strign | number>;
// type StrArrOrNumArr = strign[] | number[]