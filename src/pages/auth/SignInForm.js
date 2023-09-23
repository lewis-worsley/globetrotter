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

import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

import { useRedirect } from '../../hooks/useRedirect';

import appStyles from "../../App.module.css";
import authStyles from '../../styles/AuthPages.module.css';
import formStyles from "../../styles/Form.module.css";

import signInImage from "../../assets/pexels-mathew-thomas-906531.jpg";

import { setTokenTimestamp } from '../../utils/utils';

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();
    useRedirect("loggedIn");

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
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            setTokenTimestamp();
            history.goBack();
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

            <Button
                type="submit"
                onClick={handleSubmit}
                className={`${appStyles.Button} ${appStyles.GreenButton} px-4 py-2 my-4`}
            >
                Sign in
            </Button>
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
                    <Image src={signInImage} className={authStyles.SignInImage} rounded />
                </Col>
                <Col xs={12} lg={6} className="d-none d-lg-block p-0 p-md-2 text-center d-flex justify-content-center">
                    <Form onSubmit={handleSubmit} className='mt-4'>
                        <Col>
                            <Container
                                className={`${formStyles.Container} d-flex flex-column justify-content-center`}
                            >
                                <h1 className={`${appStyles.Headings} ${appStyles.GreenHeading} mb-3`}>Hey there, Globetrotter!</h1>
                                <h2 className={appStyles.Headings}>Sign in to continue the adventure</h2>

                                <Container className="mt-4">{textFields}</Container>
                            </Container>

                            <div className='text-center mt-3'>
                                <p>Don't have an account?</p>
                                <Link to="/signup">
                                    <Button className={`${appStyles.Button} ${authStyles.InverseButton}`}>
                                        Sign up
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

export default SignInForm;