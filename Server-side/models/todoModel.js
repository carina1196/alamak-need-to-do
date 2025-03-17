import mongoose from "mongoose";

const toDoLists = mongoose.Schema({
  user: String,
  title: String,
  items: [
    {
      _id: { type: String, unique: true },
      description: String,
      status: Boolean,
    },
  ],
});

//Models take your schema and apply it to each document in its collection.
const ToDoList = mongoose.model("ToDoList", toDoLists);
export { ToDoList };
