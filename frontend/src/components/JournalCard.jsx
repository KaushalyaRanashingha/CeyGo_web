import React from "react";

export default function JournalCard({ entry }) {
  return (
    <div className="journal-card">
      <img src={entry.image} alt={entry.title} />
      <div className="journal-card-content">
        <span className="category">{entry.category}</span>
        <h3>{entry.title}</h3>
        <p className="location">{entry.location} • {entry.date}</p>
        <p>{entry.description}</p>
        <div className="tags">
          {entry.tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
        </div>
      </div>
    </div>
  );
}