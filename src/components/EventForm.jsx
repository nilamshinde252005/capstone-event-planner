// src/components/EventForm.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function EventForm() {
  const { addEvent } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    location: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, date, time, description, location } = form;

    if (!name.trim() || !date || !time || !description.trim() || !location.trim()) {
      alert("All fields are required");
      return;
    }

    addEvent({ id: crypto.randomUUID(), ...form });
    setForm({ name: "", date: "", time: "", description: "", location: "" });
  };

  return (
    <form onSubmit={onSubmit} className="form-box">
      <h3>Add Event</h3>
      <input name="name" placeholder="Event name" value={form.name} onChange={onChange} />
      <div style={{ display: "flex", gap: 8 }}>
        <input type="date" name="date" value={form.date} onChange={onChange} />
        <input type="time" name="time" value={form.time} onChange={onChange} />
      </div>
      <input name="location" placeholder="Location" value={form.location} onChange={onChange} />
      <textarea
        name="description"
        placeholder="Description"
        rows={3}
        value={form.description}
        onChange={onChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
