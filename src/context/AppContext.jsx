// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const LS_USER = "event_planner_user";
const LS_EVENTS = "event_planner_events";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  // Load from storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(LS_USER);
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedEvents = localStorage.getItem(LS_EVENTS);
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  // Persist user + events
  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LS_EVENTS, JSON.stringify(events));
  }, [events]);

  // ---- actions ----
  const addEvent = (evt) => setEvents((prev) => [...prev, evt]);

  const updateEvent = (id, patch) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const removeEvent = (id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <AppContext.Provider
      value={{ user, setUser, events, addEvent, updateEvent, removeEvent }}
    >
      {children}
    </AppContext.Provider>
  );
};
