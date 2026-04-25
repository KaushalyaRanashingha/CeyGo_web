import React from "react";

export default function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <img src={agent.avatar} alt={agent.name} />
      <h4>{agent.name}</h4>
      <p>{agent.info}</p>
      <button className="book-btn">Book Agent</button>
    </div>
  );
}