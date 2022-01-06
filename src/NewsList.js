import React from "react";

export default function NewsList({ news }) {
  return (
    <ul className="list-group">
      {news.map((n, index) => (
        <li key={n.objectID}>
          {/* >{index + 1}.{" "} */}
          <a href={n.url} className="page-link">
            {n.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
