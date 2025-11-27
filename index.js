require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

const FRONTEND = "https://front-end-auth-use-cookie.vercel.app";

app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.options(
  "*",
  cors({
    origin: FRONTEND,
    credentials: true,
  })
);

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
