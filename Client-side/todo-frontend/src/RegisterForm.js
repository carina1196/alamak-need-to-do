import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function RegisterForm() {
  const registerUser = async (e) => {
    e.preventDefault();
    const registerData = {
      username: e.target.username.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      if (e.target.password.value === e.target.password2.value) {
        const response = await axios.post(
          "http://localhost:8080/user/register",
          registerData
        );
        console.log(response);
      } else {
        throw new Error("Password does not match");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Container className="registerForm" onSubmit={registerUser}>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label>First Name: </Form.Label>
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name: </Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label>Re-type Password: </Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
}

export { RegisterForm };
