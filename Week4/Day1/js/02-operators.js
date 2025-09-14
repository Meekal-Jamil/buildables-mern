// Operators

// Arithmetic operators
let a = 10;
let b = 5;

let addition = a + b;
let subtraction = a - b;
let multiplication = a * b;
let division = a / b;
let remainder = a % b;
let exponentiation = a ** 2; // 10^2

// Increment and decrement
let counter = 0;
counter++; // counter is now 1
counter--; // counter is back to 0

// Assignment operators
let x = 10;
x += 5; // x = x + 5 (x is now 15)
x -= 3; // x = x - 3 (x is now 12)
x *= 2; // x = x * 2 (x is now 24)
x /= 4; // x = x / 4 (x is now 6)

// Comparison operators
let isEqual = a === b; // false
let isNotEqual = a !== b; // true
let isGreater = a > b; // true
let isLess = a < b; // false
let isGreaterOrEqual = a >= b; // true
let isLessOrEqual = a <= b; // false

// Logical operators
let logicalAnd = (a > b) && (x < 10); // true && false = false
let logicalOr = (a > b) || (x < 10); // true || false = true
let logicalNot = !(a > b); // !true = false

// String operators
let firstName = "Meekal";
let lastName = "Jamil";
let fullName = firstName + " " + lastName;

// Display in the DOM
const operatorsOutput = document.getElementById("operators-output");
operatorsOutput.innerHTML = `
    <p><strong>Addition (10+5):</strong> ${addition}</p>
    <p><strong>Subtraction (10-5):</strong> ${subtraction}</p>
    <p><strong>Multiplication (10*5):</strong> ${multiplication}</p>
    <p><strong>Division (10/5):</strong> ${division}</p>
    <p><strong>Remainder (10%5):</strong> ${remainder}</p>
    <p><strong>Exponentiation (10^2):</strong> ${exponentiation}</p>
    <p><strong>Counter value:</strong> ${counter}</p>
    <p><strong>X value after operations:</strong> ${x}</p>
    <p><strong>Is 10 equal to 5?</strong> ${isEqual}</p>
    <p><strong>Is 10 not equal to 5?</strong> ${isNotEqual}</p>
    <p><strong>Logical AND result:</strong> ${logicalAnd}</p>
    <p><strong>Logical OR result:</strong> ${logicalOr}</p>
    <p><strong>Full name:</strong> ${fullName}</p>
`;

console.log("Operators exercise completed!");