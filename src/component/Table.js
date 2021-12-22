/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { makeStyles } from "@mui/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Moment from "moment";

const useStyles = makeStyles({
  hiddenImage: {
    display: "none",
    padding: "10px 10px 10px 10px"
  },
  table: {
    overflow: "auto",
    color: "black"
  },
  tableHead: {
    verticalAlign: "top",
    color: "#9098AC",
    background: "transparent",
    padding: "6px 4px 8px!important",
    fontFamily: `"PoppinsMedium"`,
    border: "none",
    "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
      opacity: 1
    }
  },
  tableHeadimg: {
    color: "#9098AC",
    background: "transparent",
    textAlign: "center",
    padding: "0px!important",
    fontFamily: `"PoppinsMedium"`,
    border: "none",
    "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
      opacity: 1
    }
  },
  tableName: {
    color: "#4033AA",
    cursor: "pointer",
    "&:hover": {
      color: "#68dbda"
    }
  },
  tableCell: {
    fontSize: "14px",
    fontWeight: "300",
    border: "none",
    borderTop: "1px solid #323232",
    fontFamily: "PoppinsLight",
    padding: "10px 20px 9px 0px !important"
  },
  empty: {
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.5)",
    paddingLeft: "20px!important",
    textAlign: "center",
    border: "1px solid rgba(155, 155, 155, 0.34)",
    borderLeft: 0,
    borderRight: 0
  },
  textColor: {
    color: "#9098AC"
  },
  tableFirstRow: {
    color: "#9098AC",
    paddingLeft: "20px !important",
    paddingRight: "0!important"
  },
  tableLastRow: {
    color: "#9098AC",
    paddingRight: "20px !important"
  },
  tableRow: {
    "&:last-child": {
      "& .MuiTableCell-root": {
        borderBottom: "none",
        padding: "10px 20px 9px 0px"
      }
    }
  }
});

const TableData = (props) => {
  const classes = useStyles();
  const { headings, type, defaultOrder } = props;
  const [head, setHead] = useState(0);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(defaultOrder);

  useEffect(() => {
    if (head === 0) setHead(headings.length);
  }, [headings, head]);

  useEffect(() => {
    const { getOrder } = props;
    const setOrder = getOrder;
    if (setOrder) setOrder(order, orderBy);
  }, [order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "settlementTime") {
      if (new Date(b[orderBy]) < new Date(a[orderBy])) {
        return -1;
      }
      if (new Date(b[orderBy]) > new Date(a[orderBy])) {
        return 1;
      }
    } else if (orderBy === "totalVolumeStaked") {
      if (b[orderBy] / 1e18 < a[orderBy] / 1e18) {
        return -1;
      }
      if (b[orderBy] / 1e18 > a[orderBy] / 1e18) {
        return 1;
      }
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const compileHeader = (headings, value) => {
    return (
      <TableHead>
        <TableRow key={value}>
          {headings.map((heading) => (
            <TableCell key={`${heading.label}`} className={classes.tableHead}>
              <TableSortLabel
                active={orderBy === heading.label}
                direction={orderBy === heading.label ? order : "asc"}
                onClick={createSortHandler(heading.key)}
              >
                {heading.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderData = (data, heading) => {
    if (heading.key === "amount")
      return (
        <TableCell
          key={`${heading.key}_${data[heading.key] || 0}`}
          className={classes.tableCell}
        >
          {data[heading.key].toFixed(4)} NRG
        </TableCell>
      );

    if (heading.key === "timestamp")
      return (
        <TableCell
          key={`${heading.key}_${data[heading.key] || 0}`}
          className={classes.tableCell}
        >
          {Moment.unix(data[heading.key]).utc().fromNow()}
        </TableCell>
      );

    return (
      <TableCell
        key={`${heading.key}_${data[heading.key] || 0}`}
        className={classes.tableCell}
      >
        {data[heading.key]}
      </TableCell>
    );
  };

  const renderCell = (data, heading, index) => {
    return renderData(data, heading, index);
  };

  const renderRow = (row, index) => {
    const { headings } = props;
    return (
      <TableRow key={index} className={classes.tableRow}>
        {headings.map((heading) => {
          return renderCell(row, heading, index);
        })}
      </TableRow>
    );
  };

  const compileBody = () => {
    const { rowData, emptyText, rowsPerPage, page } = props;

    return (
      <TableBody>
        {!rowData.length ? (
          <TableRow key="no content">
            <TableCell colSpan={head} className={classes.empty}>
              {emptyText}
            </TableCell>
          </TableRow>
        ) : rowsPerPage ? (
          stableSort(rowData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(renderRow)
        ) : (
          stableSort(rowData, getComparator(order, orderBy)).map(renderRow)
        )}
      </TableBody>
    );
  };

  return (
    <div className="scrollbar">
      <Table className={`${classes.table} ${type}`}>
        {compileHeader(headings, type)}
        {compileBody()}
      </Table>
    </div>
  );
};

export default TableData;
