import { config } from "dotenv";

config();

export const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_URL,
  JWT_SECRET,
  ENTRIES_URL,
  INFURA_URL,
  DEFAULT_SEPOLIA_ETH_ADDRESS,
} = process.env;
