const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConfig");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/product", require("./routes/productRoute"));
app.use("/api/user", require("./routes/userRoute"));

app.listen(port, () => console.log(`running on port ${port}`));
