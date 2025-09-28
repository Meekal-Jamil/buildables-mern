const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Express Learning',
        message: 'Welcome to Express!'
    });
});

// API Routes
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    // Handle creating a new user
    const { name } = req.body;
    res.status(201).json({ message: `User ${name} created successfully` });
});

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});