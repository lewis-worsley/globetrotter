import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import formStyles from "../../styles/Form.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import { useRedirect } from "../../hooks/useRedirect";

function NewsEditForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [newsData, setNewsData] = useState({
        image: "",
        title: "",
        content: "",
    });
    const { image, title, content } = newsData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/news/${id}/`);
                const { image, title, content } = data;

                setNewsData({ image, title, content });
            } catch (err) {
                console.error(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setNewsData({
            ...newsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setNewsData({
                ...newsData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/news/${id}/`, formData);
            history.push(`/news/${id}/`);
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
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={12}
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
                className={`${appStyles.BlogButton} px-4 py-2 mt-4`}
            >
                Save
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" xs={12}>
                    <Container
                        className={
                            `${formStyles.Container} d-flex flex-column justify-content-center`
                        }
                    >
                        <Form.Group className="text-center">
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

export default NewsEditForm;