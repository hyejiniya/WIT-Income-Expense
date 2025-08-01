/**
 * Expense Controller for Firebase Firestore
 *
 * Endpoints:
 *   - GET    /expenses        : Get all expense records
 *   - GET    /expenses/:id    : Get a specific expense by ID
 *   - POST   /expenses        : Add new expense (user ID must exist)
 *   - PUT    /expenses/:id    : Update expense by ID
 *   - DELETE /expenses/:id    : Delete expense by ID
 *
 * HTTP Status Codes:
 *   200 OK          : Success
 *   201 Created     : Resource created
 *   400 Bad Request : Invalid request data
 *   404 Not Found   : Expense or User not found
 *   409 Conflict    : Duplicate expense record
 *   500 Server Error: Internal server error
 */


const db = require('../config/firebaseConfig');
const expensesCollection = db.collection('expenses');
const usersCollection = db.collection('users');

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const queryResult = await expensesCollection.get();
    const expenses = queryResult.docs.map(doc => ({ ...doc.data() }));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load expenses!' });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const queryResult = await expensesCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "Expense not found!" });
    }

    const doc = queryResult.docs[0];
    res.json({ ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: "Failed to get expense!" });
  }
};

// Add a new expense (only for valid existing user ID)
exports.addExpense = async (req, res) => {
  try {
    const { id, Savings, PaymentObligations, Insurance, Housing, Utilities, Personal } = req.body;

    if (!id || !Savings || !PaymentObligations || !Insurance || !Housing || !Utilities || !Personal) {
      return res.status(400).json({ error: "All expense categories are required!" });
    }

    const queryResult = await usersCollection.where("id", "==", id.trim()).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: `User ID '${id}' does not exist!` });
    }

    const addedRef = await expensesCollection.add({
      id: id.trim(),
      Savings,
      PaymentObligations,
      Insurance,
      Housing,
      Utilities,
      Personal
    });

    res.status(201).json({ message: "Expense added successfully!", docId: addedRef.id });
  } catch (err) {
    console.error("Error in addExpense:", err);
    res.status(500).json({ error: "Failed to add expense!" });
  }
};

// Update an existing expense by user ID
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const queryResult = await expensesCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "Expense not found by ID!" });
    }

    const doc = queryResult.docs[0];
    await expensesCollection.doc(doc.id).update(updatedData);

    res.json({ message: "Expense updated successfully!" });
  } catch (err) {
    console.error("Failed to update expense:", err);
    res.status(500).json({ error: "Failed to update expense!" });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const queryResult = await expensesCollection.where('id', '==', id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: 'Expense not found by ID!' });
    }

    const doc = queryResult.docs[0];
    await expensesCollection.doc(doc.id).delete();

    res.json({ message: 'Expense deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense!' });
  }
};
