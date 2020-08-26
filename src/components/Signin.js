import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";

export function Signin({ setUser }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "all",
  });
  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/signin", data);
      axios.defaults.headers.common = {
        Authorization: `Bearer ${res.data.token}`,
      };
      setLoading(false);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Sign in</h2>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
            ref={register({
              required: { value: true, message: "Email is required" },
              maxLength: {
                value: 255,
                message: "Email max length is 255 character",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is invalid",
              },
            })}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            isInvalid={!!errors.password}
            ref={register({
              required: { value: true, message: "Password is required" },
              maxLength: {
                value: 255,
                message: "Password max length is 255 character",
              },
              minLength: {
                value: 8,
                message: "Password min length is 8 character",
              },
            })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Sign in
        </Button>
        <p className="mt-4">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </PublicLayout>
  );
}
