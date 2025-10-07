# TaskTracker Pro - Redux Toolkit Implementation

## Week 7 Day 2-3: Advanced State Management with Redux Toolkit

This is a comprehensive task management application built as part of the Buildables Fellowship learning progression. It demonstrates advanced React patterns using Redux Toolkit for state management.

## 🚀 Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- Automatic token validation

### Task Management
- Create, read, update, and delete tasks
- Task priorities (High, Medium, Low)
- Due dates with overdue detection
- Task completion tracking
- Category organization

### Categories
- Create and manage task categories
- Color-coded category system
- Category-based task filtering

### Dashboard
- Overview of task statistics
- Recent tasks display
- Visual dashboard cards

### UI/UX
- Responsive design
- Real-time notifications
- Loading states
- Modal forms
- Sidebar navigation

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Redux Toolkit 1.9.7** - State management
- **React Router Dom 6.15.0** - Navigation
- **Custom CSS** - Styling

### Backend
- **Node.js** - Server runtime
- **Express.js 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 7.5.3** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Week7/Day2to3/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux Toolkit setup
│   │   │   ├── slices/    # Redux slices
│   │   │   └── store.js   # Store configuration
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── server/                # Node.js backend
    ├── controllers/       # Route handlers
    ├── middleware/        # Custom middleware
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    ├── server.js         # Main server file
    └── package.json
```

## 🔧 Redux Toolkit Implementation

### Store Configuration
- Centralized state management
- DevTools integration
- Middleware setup

### Slices
- **authSlice**: User authentication state
- **taskSlice**: Task management operations
- **categorySlice**: Category management
- **uiSlice**: UI state (modals, notifications, sidebar)

### Async Thunks
- API integration with proper error handling
- Loading states management
- Optimistic updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   cd Week7/Day2to3
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   Create `.env` file in server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktracker-redux
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

5. **Start the application**
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 (Client):
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Usage

1. **Register/Login**: Create an account or log in
2. **Dashboard**: View task statistics and recent tasks
3. **Tasks**: Create, edit, and manage tasks
4. **Categories**: Organize tasks with custom categories
5. **Filtering**: Sort and filter tasks by various criteria

## 🎯 Learning Objectives Achieved

- ✅ Redux Toolkit setup and configuration
- ✅ createSlice for reducer logic
- ✅ createAsyncThunk for API calls
- ✅ State normalization patterns
- ✅ Error handling in async operations
- ✅ Real-time UI updates
- ✅ Component-store integration
- ✅ Advanced React patterns

## 🔄 State Management Flow

1. **Action Dispatch**: Components dispatch actions
2. **Async Thunks**: Handle API calls with pending/fulfilled/rejected states
3. **Reducers**: Update state immutably
4. **Selectors**: Components subscribe to state changes
5. **Re-rendering**: UI updates automatically

## 🌟 Advanced Features

- **Optimistic Updates**: Immediate UI feedback
- **Error Boundaries**: Graceful error handling
- **Loading States**: Better UX with loading indicators
- **Notifications**: Real-time user feedback
- **Responsive Design**: Mobile-friendly interface

## 📚 Key Concepts Demonstrated

- Redux Toolkit best practices
- Async state management
- Form handling with Redux
- Authentication flow
- Protected routes
- Real-time notifications
- Component composition
- CSS-in-JS patterns

This project represents the culmination of full-stack development learning, incorporating modern React patterns with robust backend integration.