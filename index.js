const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRouter = require("./api/category/router");
const userRouter = require("./api/user/router");
const productRouter = require("./api/products/router");
const invoiceRouter = require("./api/invoice/router");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./dist")));

// API Routes
app.use("/api/categories", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/invoices", invoiceRouter);

// Serve the index.html file

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
