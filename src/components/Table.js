import React from "react";
import "./table.css";

export default function Table({ date, author, msg, url }) {
  const time = new Date(date);
  const DATE =
    time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
  return (
    <div className="table">
      <div className="date">{DATE}</div>
      <div className="author">{author}</div>
      <div className="url">{url}</div>
      <div className="message">{msg}</div>
    </div>
  );
}
