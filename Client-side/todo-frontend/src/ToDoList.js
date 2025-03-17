import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ToDoList() {
  const [data, setData] = useState({ user: "John Doe", title: "", items: [] });
  const [newItem, setNewItem] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/todo")
      .then((response) => {
        setData({ user: "JohnDoe", ...response.data });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    let updatedItems;
    // if list already has items
    if (data.items) {
      updatedItems = [
        ...data.items,
        { _id: Date.now().toString(), description: newItem, status: false },
      ];
    } else {
      //when list does not contain any items yet
      updatedItems = [
        { _id: Date.now().toString(), description: newItem, status: false },
      ];
    }

    //update items in data to new list
    const updatedData = { ...data, items: updatedItems };

    try {
      const response = await axios.post(
        "http://localhost:8080/todo",
        updatedData
      );
      setData(updatedData); // Update UI immediately
      setNewItem(""); // Clear input field
      console.log(response);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  //handle change in to do list description
  const handleChange = async (e) => {
    e.preventDefault();
    const updatedItems = data.items.map((item) =>
      item._id === e.target.id ? { ...item, description: e.target.value } : item
    );
    setData(updatedItems);
  };

  //handle change in status of to do item
  const handleChangeStatus = async (e) => {
    e.preventDefault();
    console.log(e.target.id);

    const updatedItems = data.items.map((item) =>
      item._id === e.target.id ? { ...item, status: !item.status } : item
    );
    setData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/todo", data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (itemId) => {
    const updatedList = data.items.filter((item) => item._id !== itemId);
    console.log(updatedList);
    try {
      await axios.delete(`http://localhost:8080/todo/${itemId}`);

      setData((prev) => ({ ...prev, items: updatedList }));
    } catch (err) {
      console.error(err);
    }
  };

  if (data.items) {
    return (
      <>
        <h3>List</h3>

        <Form>
          {data.items.map((item) => (
            <Form.Group controlId={item._id}>
              <Form.Check
                type="checkbox"
                checked={item.status}
                onChange={handleChangeStatus}
              />
              <Form.Control
                type="text"
                defaultValue={item.description}
                onChange={handleChange}></Form.Control>
              <Button variant="danger" onClick={() => deleteItem(item._id)}>
                Delete
              </Button>
            </Form.Group>
          ))}
          <Form.Group controlId="newItem">
            <Form.Control
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button type="button" variant="success" onClick={handleAdd}>
              +
            </Button>
          </Form.Group>

          <Button type="button" variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <h3>List</h3>

        <Form>
          <Form.Group controlId="newItem">
            <Form.Control
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button type="button" variant="success" onClick={handleAdd}>
              +
            </Button>
          </Form.Group>

          <Button type="button" variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </>
    );
  }
}

export { ToDoList };
