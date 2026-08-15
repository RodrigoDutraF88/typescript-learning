// Typeof type operator

console.log(typeof "Hello Mundo");
// Print "string";

let s = "hello";
let n: typeof s;

//Remember that values and types aren't the same thing. To refer to type that the value f has, we use typeof

function f(){
    return { x: 10, y: 3};
}
type P = ReturnType<typeof f>