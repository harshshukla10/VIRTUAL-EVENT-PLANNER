const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const User = require("./models/model1.js");
const dashData = require("./models/dashdata.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const { userSchema } = require("./schema.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
const MONGO_URL = "mongodb://127.0.0.1:27017/VIRTUALPLANNER";
const signup = require("./routes/signup.js");
const login = require("./routes/login.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use("/SignUp", signup);
app.use("/login", login);

app.listen(port, () => {
  console.log(`Server is running on port 8080`);
});

app.get("/", (req, res) => {
  res.render("listings/index.ejs");
});

app.get("/home", (req, res) => {
  res.render("listings/index.ejs");
});

app.get("/dashboard", async (req, res) => {
  const dashData1 = await dashData.find({});
  res.render("listings/dashboard.ejs", { dashData1 });
});

app.get("/dashboard/:id",  (req, res) => {
  // let { id } = req.params;
  // const listing = await dashData.findById(id);
 
  res.render("listings/book.ejs");
});