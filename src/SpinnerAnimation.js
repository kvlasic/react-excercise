import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function SpinnerAnimation() {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  );
}
