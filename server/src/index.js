import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "../lib/ConnectDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js";

import path, { join } from "path";

import { app, server } from "../lib/Socket.js";

dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();

ConnectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, '/client', 'dist', 'index.html'))
})


server.listen(PORT, () => {
  console.log("Server Start On PORT : " + PORT);
});
