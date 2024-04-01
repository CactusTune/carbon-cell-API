import { Sequelize } from "sequelize";
import { DB_PASSWORD, DB_URL, DB_USER } from "../constants/env.constants";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_URL,
  port: 5432,
  database: "carbon_cell",
  username: "postgres",
  password: DB_PASSWORD,
});
