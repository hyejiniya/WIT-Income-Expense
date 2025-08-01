/**
 * User Routes
 *
 * Defines REST API endpoints for managing user data.
 * Supports:
 *  - GET all users
 *  - POST new user
 *  - PUT update user by ID
 *  - DELETE user by ID
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/usersController');

router.get('/', getUsers);          // Get all users
router.post('/', addUser);          // Add new user
router.put('/:id', updateUser);     // Update user by ID
router.delete('/:id', deleteUser);  // Delete user by ID

module.exports = router;
