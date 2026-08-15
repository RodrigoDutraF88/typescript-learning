const message = "hello";
message.toLowerCase();

message();

//This javascript operations , leaves a bunch of questions in opem
//like: it message callable?
//is toLowerCase even callable? what do they return?

//it would be awesome to avoid mistakes that can happen because of this
//ex: message is not a function 

//JavaScript is like "lets run and see what happens"

//Typescript will give us an erro message before we run the code

//Not only Typescript can cath bugs in our code but it can prevent us from even making mistakes
//The type-checker does that
//it can provide error messages and code completion as you type

//TSC the typescript compiler

// Greets the world.
console.log("Hello world!");
// after running tsc, it generates a javascript file equivalent
// type-checking code limits the sorts of programs you can run unfortunally

//if you want to be a bit more strict and denfensive against mistakes, you can use the noEmitOnError compiler option.
//tsc --noEmitOnError hello.ts

//Explicit Types
//ex:
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

//you dont't have to always write explicit type annotations, in many cases it just figures it out
//ex
let mensagem = "ola"; // it assumes : mensagem: string

//Downleveling
//went from: 
`Hello ${person}, today is ${date.toDateString()}!`;
//to:
"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!");
//Typescript is able to use template strings, that is a feature from a newer version of ECMASScript
// if we used : tsc --target es2015 hello.ts. It would turn out the same in js

//in tsconfig.json you can manipulate the coonfigs and the strictiviness of type-chekcing

//noImplicitAny: sometimes using any as defaulf kinda defeats the purpose of using TypeScript in the first place,
//turning this on will issue an error on any variables whose type is implicitly as any

//strictNullChecks: makes handling null and undefined more explicit, and spares us from worring about it
//cool fun facts about it 