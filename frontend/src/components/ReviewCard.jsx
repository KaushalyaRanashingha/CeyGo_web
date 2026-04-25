import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <img src={review.avatar} alt={review.name} />
      <h4>{review.name}</h4>
      <p className="location">{review.location}</p>
      <p>"{review.comment}"</p>
      <div className="rating">
        {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
      </div>
    </div>
  );
}