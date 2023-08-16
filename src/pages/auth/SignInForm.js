import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';

const SignInForm = () => {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", signInData);
            history.goBack("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <div>
            <h1>Hey there, Globetrotter!</h1>
            <h2>Login to continue the adventure</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.username?.map((message, idx) =>
                    <Alert
                        variant="warning"
                        key={idx}
                    >
                        {message}
                    </Alert>
                )}

                <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password?.map((message, idx) =>
                    <Alert
                        variant="warning"
                        key={idx}
                    >
                        {message}
                    </Alert>
                )}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                    </Alert>
                ))}
            </Form>

            <Container className="mt-3">
                <p>Don't have an account?</p>
                <Link to="/signup">
                    <Button >
                        Sign up
                    </Button>
                </Link>

            </Container>

        </div>
    )
}

export default SignInForm