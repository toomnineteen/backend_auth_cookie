require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");
const cors = require("cors");
const connectdb = require("../config/connectdb");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://front-end-auth-use-cookie.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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
