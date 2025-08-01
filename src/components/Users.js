/**
 * Users Component
 *
 * - Add, update, delete, and view user data
 * - Each user includes fields like name, email, phone, and address
 * - Supports structured forms, input validation, and backend integration
 */

import React, { useState, useEffect } from "react";
import "../styles/common.css";
import "../styles/Users.css";

const Users = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    }
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    }
  });

  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [users, setUsers] = useState([]);

  // Load all users - GET
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  // Add new user - POST
  const createUser = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setMessage(data);
      setFormData({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        address: { street: "", suite: "", city: "", zipcode: "" }
      });
    } catch {
      setMessage({ error: "Failed to add user!" });
    }
  };

  // Update user by ID - PUT
  const updateUser = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/users/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });

      const data = await res.json();
      setUpdateMessage(data);
      setUpdateData({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        address: { street: "", suite: "", city: "", zipcode: "" }
      });
    } catch {
      setUpdateMessage({ error: "Failed to update user!" });
    }
  };

  // Delete user by ID - DELETE
  const deleteUser = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/users/${deleteId}`, {
        method: "DELETE"
      });

      const data = await res.json();
      setDeleteMessage(data);
      setDeleteId("");
    } catch {
      setDeleteMessage({ error: "Failed to delete user." });
    }
  };

  // Update Add User form inputs
  const updateAddForm = (event) => {
    const { name, value } = event.target;
    if (["street", "suite", "city", "zipcode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Update update(edit) user form inputs
  const updateEditForm = (event) => {
    const { name, value } = event.target;
    if (["street", "suite", "city", "zipcode"].includes(name)) {
      setUpdateData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setUpdateData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="users-container">
      <h1 className="section-title">User Management</h1>
      <div className="grid-container">

        {/* GET: Show all users */}
        <div className="form-section grid-area-read">
          <h2>All Users</h2>
          <h3 className="user-list-header">Name (Email) - Phone</h3>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> ({user.email}) - {user.phone}
              </li>
            ))}
          </ul>
        </div>

        {/* POST: Add user */}
        <div className="form-section grid-area-add">
          <h2>Add User</h2>
          <form onSubmit={createUser}>
            {["id", "name", "username", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field === "id" ? "ID" : field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={updateAddForm}
                onFocus={() => setMessage(null)}
                className="input"
                required={field === "id" || field === "name" || field === "email"}
              />
            ))}
            {["street", "suite", "city", "zipcode"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.address[field]}
                onChange={updateAddForm}
                onFocus={() => setMessage(null)}  
                className="input"
              />
            ))}
            <button type="submit" className="button">Submit</button>
          </form>
          {message && <pre className="message">{JSON.stringify(message, null, 2)}</pre>}
        </div>

        {/* PUT: Update user */}
        <div className="form-section grid-area-update">
          <h2>Update User</h2>
          <form onSubmit={updateUser}>
            {["id", "name", "username", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field === "id" ? "ID to update (Uneditable)" : field.charAt(0).toUpperCase() + field.slice(1)}
                value={updateData[field]}
                onChange={updateEditForm}
                onFocus={() => setUpdateMessage(null)} 
                className="input"
                // required={field === "id"}
                required
              />
            ))}
            {["street", "suite", "city", "zipcode"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={updateData.address[field]}
                onChange={updateEditForm}
                className="input"
                required
              />
            ))}
            <button type="submit" className="button">Update</button>
          </form>
          {updateMessage && <pre className="message">{JSON.stringify(updateMessage, null, 2)}</pre>}
        </div>

        {/* DELETE: Delete user */}
        <div className="form-section grid-area-delete">
          <h2>Delete User</h2>
          <form onSubmit={deleteUser}>
            <input
              name="deleteId"
              placeholder="ID to delete"
              value={deleteId}
              onChange={(event) => setDeleteId(event.target.value)}
              onFocus={() => setDeleteMessage(null)}
              className="input"
              required
            />
            <button type="submit" className="button delete">Delete</button>
          </form>
          {deleteMessage && <pre className="message">{JSON.stringify(deleteMessage, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
};

export default Users;
