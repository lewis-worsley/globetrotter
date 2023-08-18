import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Journey from "./Journey";
import appStyles from "../../App.module.css";

import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.png";

import styles from "../../styles/JourneyCreateEditForm.module.css";

function JourneysPage({ message }) {
    const [journeys, setJourneys] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    // handle modal appearance
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const { data } = await axiosReq.get("/journeys/");
                setJourneys(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchJourneys();

    }, [pathname])



    function CreateJourneyModal(props) {
        const [errors, setErrors] = useState({});

        const [journeyData, setJourneyData] = useState({
            image: "",
            title: "",
            countries: "",
            locations: "",
            content: "",
        });
        const { image, title, countries, locations, content } = journeyData;

        const imageInput = useRef(null);
        const history = useHistory();

        const handleChange = (event) => {
            setJourneyData({
                ...journeyData,
                [event.target.name]: event.target.value,
            });
        };

        const handleChangeImage = (event) => {
            if (event.target.files.length) {
                URL.revokeObjectURL(image);
                setJourneyData({
                    ...journeyData,
                    image: URL.createObjectURL(event.target.files[0]),
                });
            }
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();

            formData.append('image', imageInput.current.files[0]);
            formData.append('title', title);
            formData.append('countries', countries);
            formData.append('locations', locations);
            formData.append('content', content);

            try {
                const { data } = await axiosReq.post('/journeys/', formData);
                history.push(`/journeys/${data.id}`);
            } catch (err) {
                if (err.response?.status !== 401) {
                    setErrors(err.response?.data);
                }
            }
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create journey
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Row>
                        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                            <Container
                                className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                            >
                                <Form.Group className="text-center">
                                    {image ? (
                                        <>
                                            <figure>
                                                <Image className={appStyles.Image} src={image} />
                                            </figure>
                                            <div>
                                                <Form.Label
                                                    className="btn"
                                                    htmlFor="image-upload"
                                                >
                                                    Change the image
                                                </Form.Label>
                                            </div>
                                        </>
                                    ) : (
                                        <Form.Label
                                            className="d-flex justify-content-center"
                                            htmlFor="image-upload"
                                        >
                                            <Asset
                                                src={Upload}
                                                message="Click or tap to upload an image"
                                            />
                                        </Form.Label>
                                    )}

                                    <Form.File
                                        id="image-upload"
                                        accept="image/*"
                                        onChange={handleChangeImage}
                                        ref={imageInput}
                                    />

                                </Form.Group>
                                {errors?.image?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}

                                <div className="d-md-none">{ }</div>
                            </Container>
                        </Col>
                        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                            <Container className={appStyles.Content}>{ }</Container>
                        </Col>
                    </Row>
                </Form >
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.title?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="countries"
                            value={countries}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.countries?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="locations"
                            value={locations}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.locations?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            name="content"
                            value={content}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Button onClick={props.onHide}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Publish</Button>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div>
            <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" xs={8}>
                    <>
                        <Button variant="primary" onClick={handleShow}>
                            Create Journey <i className="fa-solid fa-globe"></i>
                        </Button>

                        <CreateJourneyModal
                            show={setShow}
                            onHide={() => setShow(false)}
                        />
                    </>
                </Col>
                <Col xs={4}>
                    <Form className="py-2 p-0 p-lg-2">
                        <Form.Control
                            placeholder="Search journeys"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {hasLoaded ? (
                        <>
                            {journeys.results.length ? (
                                journeys.results.map((journey) => (
                                    <Journey key={journey.id} {...journey} setJourneys={setJourneys} />
                                ))
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset src={NoResults} message={message} />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <p>Popular profiles for desktop</p>
                </Col>
            </Row>
        </div>
    );
}

export default JourneysPage;