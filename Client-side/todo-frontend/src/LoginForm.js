import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./LoginForm.css";

function LoginForm() {
  const onLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = { username: username, password: password };
    const response = await axios.post("http://localhost:8080/user/login", data);
    console.log(response);
  };

  return (
    <>
      <Container className="loginForm">
        <Form onSubmit={onLogin}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export { LoginForm };
