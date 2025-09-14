// State variables
let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let functionUsed = '';

// DOM Elements
const currentInputDisplay = document.getElementById('current-input');
const calculationHistory = document.getElementById('calculation-history');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');

// FUNCTION DECLARATION
// These functions are hoisted, meaning they can be used before they're defined
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// FUNCTION EXPRESSION
// These functions are not hoisted and must be defined before they're used
const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        return "Error";
    }
    return a / b;
};

// ARROW FUNCTIONS
// Concise syntax and lexical 'this' binding
const power = (a, b) => Math.pow(a, b);

const modulo = (a, b) => {
    if (b === 0) {
        alert("Cannot find modulo with zero");
        return "Error";
    }
    return a % b;
};

// HIGHER-ORDER FUNCTION
// Functions that take other functions as arguments or return functions
function createMathOperation(operation) {
    return function(number) {
        if (operation === 'square') {
            return number * number;
        } else if (operation === 'sqrt') {
            if (number < 0) {
                alert("Cannot find square root of negative number");
                return "Error";
            }
            return Math.sqrt(number);
        }
    };
}

// Create specialized functions using the higher-order function
const square = createMathOperation('square');
const sqrt = createMathOperation('sqrt');

// CALLBACK FUNCTION
// Update display with the current input
function updateDisplay() {
    currentInputDisplay.textContent = currentInput;
}

// Update the calculation history
function updateCalculationHistory(firstOperand, operator, secondOperand = '') {
    let operatorSymbol = '';
    
    switch(operator) {
        case 'add': operatorSymbol = '+'; break;
        case 'subtract': operatorSymbol = '-'; break;
        case 'multiply': operatorSymbol = '×'; break;
        case 'divide': operatorSymbol = '÷'; break;
        case 'power': operatorSymbol = '^'; break;
        case 'modulo': operatorSymbol = '%'; break;
        case 'square': operatorSymbol = '²'; break;
        case 'sqrt': operatorSymbol = '√'; break;
    }
    
    if (operator === 'square') {
        calculationHistory.textContent = `${firstOperand}${operatorSymbol} =`;
    } else if (operator === 'sqrt') {
        calculationHistory.textContent = `${operatorSymbol}${firstOperand} =`;
    } else {
        calculationHistory.textContent = `${firstOperand} ${operatorSymbol} ${secondOperand}`;
    }
}

// Clear the calculator state
function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    functionUsed = '';
    calculationHistory.textContent = '';
    updateDisplay();
}

// Handle number input
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

// Handle decimal point
function inputDecimal() {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Handle operation selection
function handleOperation(nextOperator, functionType) {
    const inputValue = parseFloat(currentInput);
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        functionUsed = functionType;
        return;
    }
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    functionUsed = functionType;
    
    updateCalculationHistory(firstOperand, operator);
    updateDisplay();
}

// Perform the calculation based on the selected operator
function performCalculation() {
    const secondOperand = parseFloat(currentInput);
    let result;
    
    updateCalculationHistory(firstOperand, operator, secondOperand);
    
    switch (operator) {
        case 'add':
            result = add(firstOperand, secondOperand);
            break;
        case 'subtract':
            result = subtract(firstOperand, secondOperand);
            break;
        case 'multiply':
            result = multiply(firstOperand, secondOperand);
            break;
        case 'divide':
            result = divide(firstOperand, secondOperand);
            break;
        case 'power':
            result = power(firstOperand, secondOperand);
            break;
        case 'modulo':
            result = modulo(firstOperand, secondOperand);
            break;
        case 'square':
            result = square(firstOperand);
            break;
        case 'sqrt':
            result = sqrt(firstOperand);
            break;
        default:
            return secondOperand;
    }
    
    return result;
}

// EVENT LISTENERS (using anonymous functions)
// Number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputDigit(button.dataset.number);
    });
});

// Operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperation(button.dataset.operation, button.dataset.functionType);
    });
});

// Equals button
equalsButton.addEventListener('click', () => {
    if (!operator) return;
    
    const result = performCalculation();
    currentInput = String(result);
    
    // Add a note about which function type was used
    calculationHistory.textContent += ` = ${result} (Using ${functionUsed} function)`;
    
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    functionUsed = '';
    
    updateDisplay();
});

// Clear button
clearButton.addEventListener('click', resetCalculator);

// Decimal button
decimalButton.addEventListener('click', inputDecimal);

// IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// Initialize the calculator
(function() {
    updateDisplay();
    console.log('Calculator initialized using an IIFE (Immediately Invoked Function Expression)');
})();