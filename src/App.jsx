import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './app.css'
function App() {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <div className="auth-container">
        <h1>Event Planner</h1>
        <Register />
        <Login />
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
