import express, { Request, Response } from "express";
import { PORT } from "./constants/env.constants";
import { sequelize } from "./db";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

async function bootstrap() {
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (req: Request, res: Response) => {
    const message = "Hello, welcome to your User development API";
    res.status(200).json({
      status: "success",
      message,
    });
  });

  app.use(router);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  throw err;
});
