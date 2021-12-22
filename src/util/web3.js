import Web3 from "web3";
import web3Extension from "@energi/web3-ext";
import { energiRpcUrl } from "../lib/Constants";

export const connectWeb3 = async () => {
  const web3 = new Web3(energiRpcUrl);
  web3Extension.extend(web3);
  return web3;
};

export const getBlockDetails = async () => {
  const web3 = await connectWeb3();
  const value = await web3.nrg.getBlock("latest");
  return value;
};

export const getTransactionDetails = async (hash) => {
  const web3 = await connectWeb3();
  const value = await web3.nrg.getTransaction(hash);
  return value;
};
