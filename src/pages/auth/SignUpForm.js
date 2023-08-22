import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';
import { useRedirect } from '../../hooks/useRedirect';


const SignUpForm = () => {
    useRedirect("loggedIn")
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <div>
            <h1>Recapture the memories & tell your story</h1>
            <h2>Join Globetrotters today.</h2>
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

                <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password1"
                        value={password1}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password1?.map((message, idx) =>
                    <Alert
                        variant="warning"
                        key={idx}
                    >
                        {message}
                    </Alert>
                )}

                <Form.Group controlId="password2">
                    <Form.Label className="d-none">Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.password2?.map((message, idx) =>
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
                <Form.Text className="text-muted">
                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                </Form.Text>
                {errors.non_field_errors?.map((message, idx) => (
					<Alert key={idx} variant="warning" className="mt-3">
						{message}
					</Alert>
					))}
            </Form>

            <Container className="mt-3">
                <p>Already have an account?</p>
                <Link to="/signin">
                    <Button >
                        Sign in
                    </Button>
                </Link>
            </Container>

        </div>
    )
}

export default SignUpForm