// DOM Manipulation

// Get elements
const changeTextBtn = document.getElementById("changeText");
const changeColorBtn = document.getElementById("changeColor");
const addItemBtn = document.getElementById("addItem");
const demoText = document.getElementById("demo-text");
const demoList = document.getElementById("demo-list");

// Event: Change text
changeTextBtn.addEventListener("click", function() {
    demoText.textContent = "Text changed! JavaScript is awesome!";
});

// Event: Change color
changeColorBtn.addEventListener("click", function() {
    // Generate random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    demoText.style.color = randomColor;
});

// Event: Add list item
let itemCount = 1;
addItemBtn.addEventListener("click", function() {
    // Create new list item
    const newItem = document.createElement("li");
    itemCount++;
    newItem.textContent = `Item ${itemCount}`;
    
    // Add animation class
    newItem.style.animation = "fadeIn 0.5s";
    
    // Append to list
    demoList.appendChild(newItem);
});

// Add some CSS animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log("DOM manipulation exercise ready!");