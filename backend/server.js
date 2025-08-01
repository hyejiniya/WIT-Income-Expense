/**
 * Main Server File
 *
 * Sets up an Express server with routes for managing:
 * - Users
 * - Expenses
 * - Income
 */

// Import required modules
const express = require('express');
const cors = require('cors');           // enable CORS for cross-origin requests 
require('dotenv').config();             // environment variables from .env file 

const app = express();
app.use(cors());                         // allow requests from different origins
app.use(express.json());                 

// Root endpoint 
app.get("/", (req, res) => {
  res.json({
    message: "Hello! This is a simple REST API for managing users, expenses, and income!",
    endpointsList: {
      "GET /users": "Retrieve all users",
      "POST /users": "Add a new user",
      "PUT /users/:id": "Update a user by ID",
      "DELETE /users/:id": "Delete a user by ID",
      "GET /expenses": "Retrieve all expenses",
      "POST /expenses": "Add a new expense",
      "PUT /expenses/:id": "Update an expense by ID",
      "DELETE /expenses/:id": "Delete an expense by ID",
      "GET /income": "Retrieve all income",
      "POST /income": "Add a new income",
      "PUT /income/:id": "Update an income by ID",
      "DELETE /income/:id": "Delete an income by ID"
    }
  });
});

// Routes for users, expenses, and income
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const expensesRouter = require('./routes/expenses');
app.use('/expenses', expensesRouter);

const incomeRouter = require('./routes/incomes');
app.use('/income', incomeRouter);

// Start the sever
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


