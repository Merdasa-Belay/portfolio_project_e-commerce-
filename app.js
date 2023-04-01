//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin-merdasa:test123@cluster0.ntdeu9a.mongodb.net/userDB",
  {
    useNewUrlParser: true,
  }
);
const userSchema = { email: String, password: String };

const User = new mongoose.model("User", userSchema);
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("acc_home");
    }
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("acc_home");
        }
      }
    }
  });
});
app.get("/logout", function (req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

app.get("/account", function (req, res) {
  res.render("my_account");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
