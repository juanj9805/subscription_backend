import express from "express";
import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import subsccriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
// Often this are middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subsccriptionRouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, async () => {
  console.log(`running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
