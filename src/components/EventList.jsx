// src/components/EventList.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function EventItem({ evt, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(evt);

  const handleSave = () => {
    onSave(evt.id, draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="event-card editing">
        <input
          name="name"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          <input
            type="time"
            value={draft.time}
            onChange={(e) => setDraft({ ...draft, time: e.target.value })}
          />
        </div>
        <input
          name="location"
          value={draft.location}
          onChange={(e) => setDraft({ ...draft, location: e.target.value })}
        />
        <textarea
          rows={2}
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
        <div className="actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className="event-card">
      <h4>{evt.name}</h4>
      <p>
        {evt.date} • {evt.time} • {evt.location}
      </p>
      <p>{evt.description}</p>
      <div className="actions">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={() => onDelete(evt.id)}>Delete</button>
      </div>
    </li>
  );
}

export default function EventList() {
  const { events, updateEvent, removeEvent } = useContext(AppContext);

  if (!events.length) return <p>No events yet. Add one above 👆</p>;

  // map() to render the list, as the brief requires
  return (
    <ul className="event-list">
      {events.map((evt) => (
        <EventItem
          key={evt.id}
          evt={evt}
          onSave={updateEvent}
          onDelete={removeEvent}
        />
      ))}
    </ul>
  );
}
