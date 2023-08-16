import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';


const SignUpForm = () => {
    return (
        <div>
            <h1>Recapture the memories & tell your story</h1>
            <h2>Join Globetrotters today.</h2>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                </Form.Group>

                <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password1"
                    />
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label className="d-none">Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Text className="text-muted">
                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                </Form.Text>
            </Form>

            <Container>
                <p>Already have an account?</p>
                <Button to="/signin">
                    Sign In
                </Button>
            </Container>

        </div>
    )
}

export default SignUpForm