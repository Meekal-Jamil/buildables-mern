// Functions

// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Function with default parameters
const createUser = (name, role = "student") => {
    return {
        name: name,
        role: role,
        createdAt: new Date().toLocaleString()
    };
};

// Function with rest parameters
const calculateAverage = (...numbers) => {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
};

// Immediately Invoked Function Expression (IIFE)
const counter = (function() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
})();

// Display in DOM
const functionsOutput = document.getElementById("functions-output");

// Call the functions
const greeting = greet("Meekal");
const sum = add(10, 5);
const product = multiply(4, 7);
const user = createUser("Meekal");
const average = calculateAverage(85, 90, 95, 80);

// Test counter
counter.increment();
counter.increment();
counter.decrement();

functionsOutput.innerHTML = `
    <p><strong>Greeting:</strong> ${greeting}</p>
    <p><strong>Sum (10+5):</strong> ${sum}</p>
    <p><strong>Product (4*7):</strong> ${product}</p>
    <p><strong>User:</strong> ${user.name} (${user.role}) - Created at ${user.createdAt}</p>
    <p><strong>Average of [85, 90, 95, 80]:</strong> ${average}</p>
    <p><strong>Counter value:</strong> ${counter.getCount()}</p>
`;

console.log("Functions exercise completed!");