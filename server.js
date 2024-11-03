const express = require("express");
const morgan = require("morgan");

const router = require("./routes");
// const docsRouter = require("./routes/docsRouter");
const { systemController } = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/health-check", systemController);

app.use("/api/v1", router);
// app.use("/api-docs", docsRouter);

module.exports = app;
