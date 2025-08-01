/**
 * Income Routes
 *
 * Defines REST API endpoints for managing income data.
 * Supports:
 *  - GET all income records
 *  - GET income by ID
 *  - POST new income
 *  - PUT update income
 *  - DELETE income by ID
 */

const express = require("express");
const router = express.Router();
const {
  getIncome,
  getIncomeById,
  addIncome,
  updateIncome,
  deleteIncome
} = require("../controllers/incomeController");

router.get("/", getIncome);             // Get all income records
router.get("/:id", getIncomeById);      // Get income by ID
router.post("/", addIncome);            // Add new income
router.put("/:id", updateIncome);       // Update income by ID
router.delete("/:id", deleteIncome);    // Delete income by ID

module.exports = router;