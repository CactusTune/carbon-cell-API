import { Router } from "express";
import { userRouter } from "../controllers/user.controller";
import { entriesRouter } from "../controllers/entries.controller";
import { web3Router } from "../controllers/wallet.controller";

import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const swaggerSpec = YAML.load("src/documentation/swagger.yaml");

const router = Router();

router.use("/user", userRouter);
router.use("/entries", entriesRouter);
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use("/web3", web3Router);

export default router;
