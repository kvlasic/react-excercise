import React from "react";

export default function NewsList({ news }) {
  return (
    <ul>
      {news.map((n, index) => (
        <li key={n.objectID}>
          {index + 1}. <a href={n.url}>{n.title}</a>
        </li>
      ))}
    </ul>
  );
}
