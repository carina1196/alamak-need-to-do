import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const userRoute = express.Router();

userRoute.post("/login", async (req, res) => {
  const user = req.body;
  try {
    let data = await User.findOne({ username: user.username });

    bcrypt.compare(user.password, data.password, (err, result) => {
      if (err) {
        // Handle error
        console.error("Error comparing passwords:", err);
        return;
      }

      if (result) {
        // Passwords match, authentication successful
        console.log("Passwords match! User authenticated.");
        res.send("User login successfully");
      } else {
        // Passwords don't match, authentication failed
        console.log("Passwords do not match! Authentication failed.");
        throw new Error("Password incorrect");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  }
});

userRoute.post("/register", async (req, res) => {
  let newUser = req.body;

  try {
    let data = await User.findOne({ username: newUser.username });
    if (data) {
      throw new Error("User already exists");
    } else {
      //hashing password
      const saltRounds = 10;
      await bcrypt.genSalt(saltRounds, async (err, salt) => {
        if (err) {
          console.error(err);
          return;
        }
        newUser.password = await bcrypt.hash(newUser.password, salt); // Wait for password hashing
        await User.insertOne(newUser);
      });

      //inserting data
      console.log("User added successfully!");
      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  }
});

export { userRoute };
