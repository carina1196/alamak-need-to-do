import express from "express";
import { ToDoList } from "../models/todoModel.js";
import { User } from "../models/userModel.js";

const todoRoute = express.Router();

todoRoute.get("/", async (req, res) => {
  //const todoList = req.params.todoList.split("-").join(" ");
  let data;
  try {
    data = await ToDoList.findOne({ user: "JohnDoe" });
    console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

todoRoute.post("/", async (req, res) => {
  const user = "JohnDoe";
  const todoList = req.body;
  console.log(todoList);

  try {
    let userExists = await User.findOne({ username: user });
    if (!userExists) {
      throw new Error("User does not exists.");
    } else {
      await ToDoList.updateOne(
        { title: todoList.title },
        { $set: todoList },
        { upsert: true }
      );
      console.log("To do list inserted successfully");
      res.send("To do list inserted successfully");
    }
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  }
});

todoRoute.delete("/:itemId", async (req, res) => {
  const user = "JohnDoe";
  const { itemId } = req.params;
  console.log(itemId);

  try {
    let userExists = await User.findOne({ username: user });
    if (!userExists) {
      throw new Error("User does not exists.");
    } else {
      await ToDoList.updateOne(
        { user: user },
        { $pull: { items: { _id: itemId } } }
      );

      res.send("Item deleted successfully");
    }
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  }
});

export { todoRoute };
