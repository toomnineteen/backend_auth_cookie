require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://front-end-auth-use-cookie.vercel.app",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.use(cookieParser());
app.use(express.json());

db();

app.get("/", (req, res) => {
  res.send("WELCOME HOME PAGE");
});

readdirSync("./routes").map((p) => app.use("/", require("./routes/" + p)));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});