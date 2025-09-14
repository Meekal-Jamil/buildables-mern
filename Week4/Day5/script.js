// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoCount = document.getElementById('todo-count');

// App State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

// Functions
function renderTodos() {
    // Clear current list
    todoList.innerHTML = '';
    
    // Filter todos based on current filter
    let filteredTodos = todos;
    if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    // Render todos
    filteredTodos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
    
    // Update todo count
    updateTodoCount();
}

function createTodoElement(todo) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoStatus(todo.id));
    
    // Create todo text
    const span = document.createElement('span');
    span.className = `todo-text ${todo.completed ? 'completed' : ''}`;
    span.textContent = todo.text;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
}

function addTodo(text) {
    if (text.trim() === '') return;
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.unshift(newTodo);
    saveTodos();
    renderTodos();
}

function toggleTodoStatus(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function updateTodoCount() {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeTodos} items left`;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function setFilter(newFilter) {
    filter = newFilter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === newFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTodos();
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
});

clearBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Initialize app
renderTodos();