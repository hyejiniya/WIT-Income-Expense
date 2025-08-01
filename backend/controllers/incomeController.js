/**
 * Income Controller for Firebase Firestore
 *
 * Endpoints:
 *   - GET /income        : Get all income records
 *   - GET /income/:id    : Get a specific income by ID
 *   - POST /income       : Add new income (user ID must exist)
 *   - PUT /income/:id    : Update income by ID
 *   - DELETE /income/:id : Delete income by ID
 *
 * HTTP Status Codes:
 *   200 OK          : Success
 *   201 Created     : Resource created
 *   400 Bad Request : Invalid request data
 *   404 Not Found   : Income or User not found
 *   409 Conflict    : Duplicate income record
 *   500 Server Error: Internal server error
 */

const db = require('../config/firebaseConfig');
const incomeCollection = db.collection('income');
const usersCollection = db.collection('users');

// Add a new income (only if user exists & no duplicate)
exports.addIncome = async (req, res) => {
  try {
    const { id, wages, secondaryIncome, interest, supportPayment, others } = req.body;

    if (!id || wages === undefined || secondaryIncome === undefined || interest === undefined || supportPayment === undefined || others === undefined) {
      return res.status(400).json({ error: "All income fields are required!" });
    }

    const userResult = await usersCollection.where("id", "==", id.trim()).get();

    if (userResult.empty) {
      return res.status(404).json({ error: `User ID '${id}' does not exist!` });
    }

    const incomeResult = await incomeCollection.where("id", "==", id.trim()).get();
    
    if (!incomeResult.empty) {
      return res.status(409).json({ error: `Income for ID '${id}' already exists!` });
    }

    const createdDocRef = await incomeCollection.add({
      id: id.trim(),
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others
    });

    res.status(201).json({ message: "Income added successfully!", docId: createdDocRef.id });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ error: "Failed to add income!" });
  }
};

// Get all income records
exports.getIncome = async (req, res) => {
  try {
    const queryResult = await incomeCollection.get();
    const data = queryResult.docs.map(doc => ({ ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error("Failed to get all income:", error);
    res.status(500).json({ error: "Failed to load income data!" });
  }
};

// Get income by ID
exports.getIncomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const queryResult = await incomeCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "No income found for the entered ID!" });
    }

    const doc = queryResult.docs[0];
    res.json({ ...doc.data() });
  } catch (error) {
    console.error("Get income error:", error);
    res.status(500).json({ error: "Failed to fetch income data!" });
  }
};

// Update income by ID
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const queryResult = await incomeCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "No income found for the entered ID!" });
    }

    const doc = queryResult.docs[0];
    await incomeCollection.doc(doc.id).update(updatedData);

    res.json({ message: "Income updated successfully!" });
  } catch (error) {
    console.error("Update income error:", error);
    res.status(500).json({ error: "Failed to update income!" });
  }
};

// Delete income by ID
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const queryResult = await incomeCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "Income not found by ID!" });
    }

    const doc = queryResult.docs[0];
    await incomeCollection.doc(doc.id).delete();

    res.json({ message: "Income deleted successfully!" });
  } catch (error) {
    console.error("Delete income error:", error);
    res.status(500).json({ error: "Failed to delete income!" });
  }
};
