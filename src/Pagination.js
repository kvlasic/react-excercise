import React from "react";

export default function Pagination({ page, nextPage }) {
  return (
    <div>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">
            Page: {page + 1}
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" onClick={() => nextPage(page + 1)}>
            Next Page
          </a>
        </li>
      </ul>
    </div>
  );
}
