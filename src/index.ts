import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { appRouter } from "routes";
import { globalErrorHandler } from "shared";

import server from "server";
import connectDB from "db-connect";

dotenv.config();

const { PORT, JWT_SECRET, DB_PATH } = process.env;

if (PORT && JWT_SECRET && DB_PATH) {
  connectDB(DB_PATH);
  server.use(cors());
  server.use(express.json());

  server.use(appRouter);

  server.use(globalErrorHandler);
  server.listen(PORT, () => console.log("Server is running, port", PORT));
} else {
  console.log(
    `Failed to start. PORT ${PORT}, DB_PATH ${DB_PATH}, JWT_SECRET ${JWT_SECRET}. Check .env file`
  );
}
