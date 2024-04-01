import web3 from "web3";
import express, { Request, Response, Router } from "express";
import {
  INFURA_URL,
  DEFAULT_SEPOLIA_ETH_ADDRESS,
} from "../constants/env.constants";

const web3js = new web3(INFURA_URL);

export const web3Router = Router();

web3Router.post(
  "/get-wallet-balance",
  async (request: Request, response: Response) => {
    try {
      const { account_address } = request.body;

      const address =
        account_address == null ? DEFAULT_SEPOLIA_ETH_ADDRESS : account_address;

      const wei_balance = await web3js.eth.getBalance(address);
      const ether_balance = web3js.utils.fromWei(wei_balance, "ether");

      console.log(ether_balance);
      return response
        .status(200)
        .json({ wei_balance: wei_balance.toString(), ether_balance });
    } catch (error: any) {
      return response
        .status(500)
        .json({ code: 500, success: false, message: error.message });
    }
  }
);
