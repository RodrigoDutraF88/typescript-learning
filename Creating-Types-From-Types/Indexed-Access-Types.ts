//Indexed acess types

//We can use an indexed access type to look up a specific property on another type
type Person = { age: number; name: string; alive: boolean};
type Age = Person["age"];
// Type Age = number

//The indexing type is itself a type

type I1 = Person["age" | "name"];
//Type I1 = string | number
type I" = Person[keyof Person];
//type I2 = string | number | boolean

//We can combine with typeof

const MyArray = [
    { name: "ALice", age: 15}
    
];

type Person = typeof MyArray[number];



