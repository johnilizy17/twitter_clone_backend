require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_STRING = "mongodb+srv://delivermaxpro:delivermaxpro@cluster0.yrxx2uc.mongodb.net/test"
const path = require("path");
const routes = require("./routes");
const bodyparser = require("body-parser");

mongoose.set("strictQuery", false);

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => console.log("Mongo Running"));
mongoose.connection.on("error", (err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);

app.listen(PORT);
console.log("App is running on port:" + PORT);