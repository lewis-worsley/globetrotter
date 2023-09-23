import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

import { useRedirect } from '../../hooks/useRedirect';

import appStyles from "../../App.module.css";
import authStyles from '../../styles/AuthPages.module.css'
import formStyles from "../../styles/Form.module.css";

import signUpImage from "../../assets/pexels-rakicevic-nenad-1262304.jpg";

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

    const textFields = (
        <div className='text-center'>
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

            <Button
                type="submit"
                onClick={handleSubmit}
                className={`${appStyles.Button} ${appStyles.GreenButton} px-4 py-2 mt-4`}
            >
                Create an account
            </Button>
            <Form.Text className="text-muted mt-3 mb-4">
                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
            </Form.Text>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                </Alert>
            ))}
        </div>
    );

    return (
        <div>
            <Row className='mt-5 align-items-center'>
                <Col xs={12} lg={6} className='d-none d-lg-block '>
                    <Image src={signUpImage} className={authStyles.SignUpImage} rounded />
                </Col>
                <Col xs={12} lg={6} className="d-none d-lg-block p-0 p-md-2 text-center d-flex justify-content-center">
                    <Form onSubmit={handleSubmit} className='mt-4'>
                        <Col>
                            <Container
                                className={`${formStyles.Container} d-flex flex-column justify-content-center`}
                            >
                                <h1 className={`${appStyles.Headings} ${appStyles.GreenHeading} mb-3`}>Recapture the memories & tell your travel story</h1>
                                <h2 className={appStyles.Headings}>Join Globetrotters today</h2>

                                <Container className={`${appStyles.Content} mt-4`}>{textFields}</Container>
                            </Container>

                            <div className='text-center mt-3'>
                                <p>Already have an account?</p>
                                <Link to="/signin">
                                    <Button className={`${appStyles.Button} ${authStyles.InverseButton}`}>
                                        Sign in
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default SignUpForm;