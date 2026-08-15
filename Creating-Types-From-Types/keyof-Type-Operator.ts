// Keyof Type Operator

//Takes an object type and produces a string or numeric literal union of its keys

type Point = { x: number; y: number};
type P = keyof Point;

// TYpe P = "x" | "y"

//If it has a string ot number index signatures, it will return those types instead

type Arrayish = { [n: number]: unknown};
type A = keyof Arrayish;

// Type A = number
