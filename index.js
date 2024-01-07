const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRouter = require("./api/category/router"); 
const userRouter = require("./api/user/router"); 
const productRouter = require("./api/products/router"); 
const invoiceRouter = require("./api/invoice/router"); 
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use("/api/categories", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/invoices", invoiceRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on SERVER_PORT ${SERVER_PORT}`);
});

