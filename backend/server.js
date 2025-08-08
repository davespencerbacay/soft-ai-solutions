import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import usersRoutes from "./routes/usersRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import initDB from "./config/db.js"

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/users", usersRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/roles", rolesRoutes);


app.use(notFound);
app.use(errorHandler)

const startServer = async () => {
  await initDB(); 
  app.listen(PORT, () => {
    console.log(`[Main] Server running at http://localhost:${PORT}`);
    console.log("[DB] Database initialized.");
  });
};

startServer();