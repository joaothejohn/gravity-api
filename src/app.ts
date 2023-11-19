import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import plansRouter from "./routes/plans";
import radiusUsersRouter from "./routes/radiusUsers";
import teamsRouter from "./routes/teams";
import authRouter from "./routes/auth";
import { swaggerOptions } from "./utils/globalVariables";

const app = express();
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/plans", plansRouter);
app.use("/radiususers", radiusUsersRouter);
app.use("/teams", teamsRouter);
app.use("/auth", authRouter);

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:3000 - ${process.env.NODE_ENV} Evironment`);
});
