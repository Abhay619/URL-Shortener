const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url");

const {connectMongoDb} = require("./connection");

const port = 9001;

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/", urlRouter);

app.listen(port, () => console.log(`Server is Live at : ${port}`));