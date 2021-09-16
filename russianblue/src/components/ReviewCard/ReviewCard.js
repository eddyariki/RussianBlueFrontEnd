import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div>
      title:{review.title}
      <br />
      content:{review.content}
      <hr />
    </div>
  );
}
