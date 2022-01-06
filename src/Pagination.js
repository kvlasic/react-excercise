import React from "react";

export default function Pagination({ page, nextPage }) {
  return (
    <div>
      <ul class="pagination">
        <li class="page-item">
          <p class="page-link">Page: {page + 1}</p>
        </li>
        <li class="page-item">
          <p class="page-link" onClick={() => nextPage(page + 1)}>
            Next Page
          </p>
        </li>
      </ul>
    </div>
  );
}
