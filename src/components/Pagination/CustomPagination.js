import React from "react";
import Pagination from "@material-ui/lab/Pagination";

// import { usePagination as pagination } from "@mui/material/Pagination";

export default function CustomPagination({ setPage, numOfPages }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
  // window.scroll(0, 0);
  };

  return (
    <div data-testid="custom-pagination"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
