/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import TableData from "../component/Table";
import PaginationRounded from "../component/Pagination";

const TarnsactionList = (props) => {
  const { list } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const count = list.length;
  const pageSize = 10;
  const pagesCount = Math.ceil(count / pageSize);

  const tableHeading = [
    {
      key: "blockNumber",
      label: "Block#",
      type: "transactions"
    },
    {
      key: "hash",
      label: "Tx#",
      type: "transactions"
    },
    {
      key: "from",
      label: "From",
      type: "transactions"
    },
    {
      key: "to",
      label: "To",
      type: "transactions"
    },
    {
      key: "timestamp",
      label: "Age",
      type: "transactions"
    },
    {
      key: "amount",
      label: "Amount",
      type: "transactions"
    }
  ];

  return (
    <>
      <TableData
        headings={tableHeading}
        rowData={list || []}
        type="transaction"
        emptyText="No transaction to show."
        rowsPerPage={pageSize}
        page={currentPage - 1}
        defaultOrder="amount"
      />
      {pagesCount ? (
        <PaginationRounded
          currentPage={currentPage}
          pagesCount={pagesCount}
          handleChange={(event, value) => setCurrentPage(value)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(TarnsactionList);
