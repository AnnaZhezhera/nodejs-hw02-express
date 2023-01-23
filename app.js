const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/api/users");
// const currentUsersRouter = require("./routes/api/currentUsers");
const contactsRouter = require("./routes/api/contacts");

app.use("/api/users", authRouter);
// app.use("/api/users/current", currentUsersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
