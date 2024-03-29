const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConfig");

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", require("./routes/productRoute"));

app.listen(port, () => console.log(`running on port ${port}`));
