/**
 * User Controller for Firebase Firestore
 *
 * Endpoints:
 *   - GET    /users        : Get all user records
 *   - GET    /users/:id    : Get a specific user by ID
 *   - POST   /users        : Add new user (ID must be unique)
 *   - PUT    /users/:id    : Update user by ID
 *   - DELETE /users/:id    : Delete user by ID
 *
 * HTTP Status Codes:
 *   200 OK          : Success
 *   201 Created     : Resource created
 *   400 Bad Request : Invalid request data
 *   404 Not Found   : User not found
 *   409 Conflict    : Duplicate user ID
 *   500 Server Error: Internal server error
 */

const db = require('../config/firebaseConfig');
const usersCollection = db.collection('users');

// GET all users
// exports.getUsers = async (req, res) => {
//   try {
//     const queryResult = await usersCollection.get();
//     const users = queryResult.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to load users!' });
//   }
// };

exports.getUsers = async (req, res) => {
  try {
    console.log("🚀 GET /users called");

    const queryResult = await usersCollection.get();
    const users = queryResult.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(users);
  } catch (err) {
    console.error("🔥 Error loading users:", err);
    res.status(500).json({ error: 'Failed to load users!' });
  }
};

// POST a new user
exports.addUser = async (req, res) => {
  try {
    const { id, name, username, email, phone, address } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: 'ID, name, and email are required!' });
    }

    // Check for duplicate user by ID
    const queryResult = await usersCollection.where("id", "==", id).get();

    if (!queryResult.empty) {
      return res.status(409).json({ error: 'This ID already exists!' });
    }

    // Add new user : automatically generated document ID 
    await usersCollection.add({ id, name, username, email, phone, address });

    res.status(201).json('User added successfully!');
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: 'Failed to add user!' });
  }
};

// PUT update user by id field
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, phone, address } = req.body;

  try {
    const queryResult = await usersCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "User not found!" });
    }

    const userDoc = queryResult.docs[0];
    await userDoc.ref.update({ name, username, email, phone, address });

    res.json("User updated successfully!");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user!" });
  }
};

// DELETE user by id field
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const queryResult = await usersCollection.where("id", "==", id).get();

    if (queryResult.empty) {
      return res.status(404).json({ error: "User not found!" });
    }

    const userDoc = queryResult.docs[0];
    await userDoc.ref.delete();

    res.json("User deleted successfully!");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user!" });
  }
};
