// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-count');
const fetchButton = document.getElementById('fetch-todos');
const loadingElement = document.getElementById('loading');
const emptyListElement = document.getElementById('empty-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// App State
let tasks = [];
let currentFilter = 'all';

// DOM Manipulation Functions
function renderTasks() {
    // Clear existing tasks
    tasksList.innerHTML = '';
    
    // Filter tasks based on current filter
    const filteredTasks = filterTasks(tasks, currentFilter);
    
    // Show or hide empty list message
    if (filteredTasks.length === 0) {
        emptyListElement.classList.remove('hidden');
    } else {
        emptyListElement.classList.add('hidden');
    }
    
    // Render each task
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksList.appendChild(taskElement);
    });
    
    // Update task counts
    updateTaskCounts();
}

function createTaskElement(task) {
    // Create list item
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
    
    // Create task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.title;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    return li;
}

function updateTaskCounts() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    taskCount.textContent = `${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
    completedCount.textContent = `${completedTasks} completed`;
}

function filterTasks(tasks, filter) {
    switch(filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

function showLoading(show = true) {
    if (show) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
}

// Task Management Functions
function addTask(title) {
    const newTask = {
        id: Date.now(),
        title,
        completed: false
    };
    
    tasks.unshift(newTask);
    renderTasks();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Async Function to Fetch Tasks from API
async function fetchTodos() {
    try {
        showLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        
        // Transform API data to our format
        tasks = data.map(item => ({
            id: item.id,
            title: item.title,
            completed: item.completed
        }));
        
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Failed to load tasks. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Event Listeners
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    
    if (taskTitle) {
        addTask(taskTitle);
        taskInput.value = '';
    }
});

fetchButton.addEventListener('click', fetchTodos);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current filter and re-render
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

// Initialize app
renderTasks();