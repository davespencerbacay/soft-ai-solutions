import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import usersRoutes from "./routes/usersRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use("/api/users", usersRoutes);

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})