import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import EventForm from "./EventForm";
import EventList from "./EventList";

function Dashboard() {
  const { user } = useContext(AppContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name} 👋</h1>
      <EventForm />
      <EventList />
    </div>
  );
}

export default Dashboard;
