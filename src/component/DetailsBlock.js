/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NumberFormat from "react-number-format";
import { energiBlockExploere } from "../lib/Constants";

const DetailsBlock = (props) => {
  const { title, value } = props;

  const formatAddress = (address) => {
    if (!address) return "...";

    const l = address.length;
    return (
      <Link
        href={`${energiBlockExploere}/address/${address}`}
        underline="hover"
        target="_blank"
        style={{ color: "#00e676" }}
      >
        {address.slice(0, 8)}...
        {address.slice(l - 7, l)}
      </Link>
    );
  };

  const formateNumber = (number) => {
    return (
      <NumberFormat
        decimalScale={0}
        value={number || 0}
        displayType="text"
        thousandSeparator
      />
    );
  };

  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { md: "flex" } }}
      >
        {title}
      </Typography>
      <Typography
        noWrap
        component="div"
        sx={{ mr: 2, display: { md: "flex" } }}
      >
        {title.includes("Address")
          ? formatAddress(value)
          : title.includes("Difficulty")
          ? formateNumber(value)
          : value}
      </Typography>
    </Box>
  );
};

export default React.memo(DetailsBlock);
