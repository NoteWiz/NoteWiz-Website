const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

// Database connection

const client = mongoose.connect(
  "mongodb+srv://Juwairia:070898@cluster0.pghgbgz.mongodb.net/registered_users"
);
if (client) {
  console.log("successfull");
}

// schema for creating user model

const Users = mongoose.model("Users", {
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
// api for signup
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret-auth");
  res.json({ success: true, token });
});
// api for login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const password_compare = req.body.password === user.password;
    if (password_compare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret-auth");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "incorrect password, try again" });
    }
  } else {
    res.json({ success: false, errors: "entered invalid email id" });
  }
});

app.get("/", (req, res) => {
  res.send("app is running");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`server running on port ${port}`);
  } else {
    console.log(error);
  }
});
