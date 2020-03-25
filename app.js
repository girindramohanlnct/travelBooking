const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const homeRoutes = require("./routes/pageRoute");
const DataRoutes = require("./routes/dataRoute");
const payRoutes = require("./routes/pay");
const path = require("path");
const router = express.Router();

mongoose
  .connect(
    "mongodb+srv://mohan:xQESqiXlYQnYNbMG@cluster0-iv487.mongodb.net/travel"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, text/html"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/booking", homeRoutes);
app.use("/booking/data", DataRoutes);
app.use("/booking/pay", payRoutes);
app.listen(3000);
module.exports = router;
module.exports = app;
