/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import Pagination from "@mui/material/Pagination";

export default function PaginationRounded(props) {
  const { currentPage, pagesCount, handleChange } = props;

  return (
    <Pagination
      count={pagesCount}
      page={currentPage}
      variant="outlined"
      shape="rounded"
      onChange={handleChange}
    />
  );
}
