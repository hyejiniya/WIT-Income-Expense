/**
 * Expense Routes
 *
 * Defines REST API endpoints for managing expense data.
 * Supports:
 *  - GET all expenses
 *  - GET expense by ID
 *  - POST new expense
 *  - PUT update expense
 *  - DELETE expense by ID
 */

const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expensesController');

router.get('/', getExpenses);             // Get all expenses
router.get('/:id', getExpenseById);       // Get expense by ID
router.post('/', addExpense);             // Add new expense
router.put('/:id', updateExpense);        // Update expense by ID
router.delete('/:id', deleteExpense);     // Delete expense by ID

module.exports = router;
