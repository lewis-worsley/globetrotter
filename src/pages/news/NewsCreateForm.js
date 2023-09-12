import { useRef } from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import formStyles from "../../styles/Form.module.css";
import newsStyles from "../../styles/NewsPages.module.css"
import appStyles from "../../App.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";

function NewsCreateForm(props) {
    useRedirect("loggedOut")
    const [errors, setErrors] = useState({});

    const [newsData, setNewsData] = useState({
        image: "",
        title: "",
        content: "",
    });
    const { image, title, content } = newsData;

    const imageInput = useRef(null);
    const history = useHistory();

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

        formData.append('image', imageInput.current.files[0]);
        formData.append('title', title);
        formData.append('content', content);

        try {
            const { data } = await axiosReq.post('/news/', formData);
            history.push(`/news/${data.id}`);
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
                className={`${newsStyles.NewsButton} ${appStyles.Button}`}
            >
                Publish
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <Row>
                <Col className="py-2 p-0 p-md-2" xs={12}>
                    <Container
                        className={`${appStyles.Content} ${formStyles.Container} d-flex flex-column justify-content-center`}
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
                <Col xs={12} sm={{ span: 8, offset: 2 }} className="d-none d-md-block p-0 p-md-2" >
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default NewsCreateForm;