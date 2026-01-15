import express from "express";
import cors from "cors";

import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", routes);

// error handler (ALWAYS LAST)
app.use(errorHandler);

export default app;
