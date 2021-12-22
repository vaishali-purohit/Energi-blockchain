/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DetailsBlock from "../component/DetailsBlock";
import { getBlockDetails, getTransactionDetails } from "../util/web3";
import TransactionList from "./TransactionList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const Details = () => {
  const [start, setStart] = useState(true);
  const [state, setState] = useState("Pause");
  const [interval, setCallInterval] = useState({});
  const [details, setDetails] = useState({
    number: 0,
    transactions: [],
    miner: 0,
    totalDifficulty: 0
  });
  const [list, setList] = useState([]);

  const headings = [
    {
      title: "Block Number",
      value: details.number
    },
    {
      title: "Number of Transactions",
      value: details.transactions.length
    },
    {
      title: "Miner Address",
      value: details.miner
    },
    {
      title: "Total Difficulty",
      value: details.totalDifficulty
    }
  ];

  const handleCall = (val) => {
    if (val) setState("Pause");
    else setState("Start");
    setStart(val);
  };

  useEffect(async () => {
    if (start) {
      const data = setInterval(async () => {
        const value = await getBlockDetails();
        setDetails(value);
      }, 1000);
      setCallInterval(data);
    } else clearInterval(interval);
  }, [start]);

  useEffect(async () => {
    if (details.number) {
      const transList = [];
      await Promise.all(
        details.transactions.map(async (val) => {
          const transacnDetails = await getTransactionDetails(val);
          return transList.push({
            ...transacnDetails,
            timestamp: details.timestamp,
            amount: parseFloat(transacnDetails.value) / 1e18
          });
        })
      );
      setList(transList);
    }
  }, [details]);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} sm={6} md={6} key="block">
          <Item style={{ boxShadow: "none" }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ mr: 2, display: { md: "flex" } }}
            >
              Latest Block Details:
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={6} key="call">
          <Item
            sx={{ mr: 2, textAlign: { xs: "center", md: "end" } }}
            style={{ boxShadow: "none" }}
          >
            <Button variant="contained" onClick={() => handleCall(!start)}>
              {state}
            </Button>
          </Item>
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {headings.map((data) => {
          return (
            <Grid item xs={12} sm={3} md={3} key={data.title}>
              <Item>
                <DetailsBlock title={data.title} value={data.value} />
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <br />
      <TransactionList list={list} />
    </Container>
  );
};

export default React.memo(Details);
