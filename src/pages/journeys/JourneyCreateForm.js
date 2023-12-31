import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import appStyles from "../../App.module.css";
import formStyles from '../../styles/Form.module.css';
import journeyStyles from "../../styles/JourneyPages.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import { useRedirect } from "../../hooks/useRedirect";

function JourneyCreateForm(props) {
    useRedirect("loggedOut");
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

    const textFields = (
        <div className="text-center">
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

            <Button
                type="submit"
                onClick={handleSubmit}
                className={
                    `${appStyles.Button} ${journeyStyles.JourneyFormButton} px-4 py-2 mt-4`
                }
            >
                Publish
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <Row>
                <Col className="py-2 p-0 p-md-2 mt-5" xs={12}>
                    <Container
                        className={
                            `${formStyles.Container} d-flex flex-column justify-content-center`
                        }
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

                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col
                    xs={12} sm={{ span: 8, offset: 2 }}
                    className="d-none d-md-block p-0 p-md-2"
                >
                    <Container>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
};

export default JourneyCreateForm;