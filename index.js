const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { readdirSync } = require("fs");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "https://front-end-auth-use-cookie.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: [("http://localhost:5173","https://front-end-auth-use-cookie.vercel.app")],
    credentials: true,
  })
);

app.use(cookieParser());

db();

app.get("/", (req, res) => {
  res.send("WELCOME HOME PAGE");
});

readdirSync("./routes").map((p) => app.use("/", require("./routes/" + p)));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
