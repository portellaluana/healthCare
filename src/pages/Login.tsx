import React, { useState } from "react";
import { Col, InputGroup, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isEmailValid = emailPattern.test(email);

    const isUsernameValid = username.length > 3;

    if (!isEmailValid || !isUsernameValid) {
      setErrorMessage(
        "Por favor, insira um email válido e um nome de usuário com no mínimo 4 letras"
      );
    } else {
      setErrorMessage("");
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div>
        <img
          src="/logo.png"
          alt="Header Image"
          className="img-fluid rounded-circle"
          width="200"
          style={{ cursor: "pointer" }}
        />
      </div>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col sm={5} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
              UserName
            </Form.Label>
            <Form.Control
              id="inlineFormInputName"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col sm={5} className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
              Email
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                id="inlineFormInputGroupUsername"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col xs="auto" className="my-1">
            <Button type="submit">Entrar</Button>
          </Col>
        </Row>

        {errorMessage && (
          <div
            className="error-message"
            style={{ color: "white", marginTop: "10px", fontSize: "14px" }}
          >
            {errorMessage}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Login;
