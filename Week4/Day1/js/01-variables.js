let name = "Meekal";
const birthYear = 2004;
let age = 2025 - birthYear;

// Different data types
let isStudent = true; // Boolean
let courseName = "MERN Stack"; // String
let completionPercentage = 75.5; // Number
let skills = ["HTML", "CSS", "JavaScript"]; // Array
let person = { // Object
    firstName: "Meekal",
    lastName: "Jamil",
    university: "Air University"
};
let noValue = null; // Null
let undefinedVar; // Undefined

// Display values in the DOM
const variablesOutput = document.getElementById("variables-output");
variablesOutput.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Is Student:</strong> ${isStudent}</p>
    <p><strong>Course:</strong> ${courseName}</p>
    <p><strong>Completion:</strong> ${completionPercentage}%</p>
    <p><strong>Skills:</strong> ${skills.join(", ")}</p>
    <p><strong>Person:</strong> ${person.firstName} ${person.lastName} (${person.university})</p>
`;

console.log("Variables exercise completed!");