import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

function UserApp() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", email: "", age: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err.message);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, age: user.age });
    setEditingId(user._id);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update User" : "Add User"}
        </button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.age} years
            <button onClick={() => handleEdit(user)}>✏️ Edit</button>
            <button onClick={() => handleDelete(user._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserApp;
