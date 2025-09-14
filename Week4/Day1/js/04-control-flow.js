// Control Flow

// If-else statement
function checkTemperature(temp) {
    if (temp < 0) {
        return "It's freezing!";
    } else if (temp < 20) {
        return "It's cold.";
    } else if (temp < 30) {
        return "It's nice outside.";
    } else {
        return "It's hot!";
    }
}

// Switch statement
function getDayName(dayNum) {
    let day;
    switch (dayNum) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Invalid day number";
    }
    return day;
}

// For loop
function countEvenNumbers(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            count++;
        }
    }
    return count;
}

// While loop
function generateRandomNumbers(count) {
    const numbers = [];
    let i = 0;
    while (i < count) {
        numbers.push(Math.floor(Math.random() * 100) + 1);
        i++;
    }
    return numbers;
}

// For...of loop
function sumArray(arr) {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum;
}

// Display in DOM
const controlFlowOutput = document.getElementById("control-flow-output");

const temperature = 25;
const dayNumber = new Date().getDay();
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNums = generateRandomNumbers(5);

controlFlowOutput.innerHTML = `
    <p><strong>Current temperature (${temperature}°C):</strong> ${checkTemperature(temperature)}</p>
    <p><strong>Today is:</strong> ${getDayName(dayNumber)}</p>
    <p><strong>Even numbers in [1-10]:</strong> ${countEvenNumbers(numbers)}</p>
    <p><strong>Random numbers:</strong> ${randomNums.join(", ")}</p>
    <p><strong>Sum of random numbers:</strong> ${sumArray(randomNums)}</p>
`;

console.log("Control flow exercise completed!");