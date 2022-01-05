import React from "react";

export default function Pagination({ page, callback }) {
  return (
    <div>
      <p>Page: {page}</p>
      <button onClick={() => callback(page + 1)}>Next Page</button>
    </div>
  );
}
