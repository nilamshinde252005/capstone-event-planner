import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Register() {
  const { setUser } = useContext(AppContext);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const username = form.username.trim();
    const password = form.password;

    if (!name || !email || !username || !password) {
      alert("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email!");
      return;
    }

    const userObj = { name, email, username, password };

    // Save to context (in-memory)
    setUser(userObj);

    // Persist so a refresh won't lose the registered user
    localStorage.setItem("event_planner_user", JSON.stringify(userObj));

    // Optional: clear form
    setForm({ name: "", email: "", username: "", password: "" });

    alert("Registered successfully! You are now logged in.");
    // After register we set the user in context; App.js will show Dashboard
  };

  return (
    <form onSubmit={handleRegister} className="form-box">
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
