import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Login() {
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const password = form.password;

    // Try context user first; if none, try localStorage (registered earlier)
    const stored = user ?? JSON.parse(localStorage.getItem("event_planner_user"));

    console.log("login attempt: ", { username, password, stored }); // debug log

    if (stored && stored.username === username && stored.password === password) {
      // successful login: ensure context is set and persisted
      setUser(stored);
      localStorage.setItem("event_planner_user", JSON.stringify(stored));
      alert("Login successful!");
      return;
    }

    alert("Invalid credentials!");
  };

  return (
    <form onSubmit={handleLogin} className="form-box">
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
