const express = require("express");
const morgan = require("morgan");
const instrumentRouter = require("./routers/instrumentRouter");
const constitutionRouter = require("./routers/constitutionRouter")
const chapterRouter = require("./routers/chapterRouter")
const sectionRouter = require("./routers/sectionRouter")

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/instruments", instrumentRouter);
app.use("/api/v2/constitutions", constitutionRouter)
app.use("/api/v2/constitutions/:constitutionId/chapters", chapterRouter)
app.use("/api/v2/constitutions/:constitutionId/chapters/:chapterId/sections", sectionRouter)

module.exports = app;
