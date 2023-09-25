import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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

import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import { useProfileData } from "../../contexts/ProfileDataContext";

import { ProfileEditDropdown } from "../../components/MoreDropdown";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        content: "",
        image: "",
        based: "",
    });
    const { name, content, image, based } = profileData;

    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;

    const [errors, setErrors] = useState({});

    const mainProfile = (
        <>
            {<ProfileEditDropdown id={profile?.id} />}
        </>
    );

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, content, image, based } = data;
                    setProfileData({ name, content, image, based });
                } catch (err) {
                    console.error(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setProfileData({
                ...profileData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);
        formData.append("based", based);

        if (imageFile?.current?.files[0]) {
            formData.append('image', imageFile.current.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.error(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <div className="text-center">
                <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        name="content"
                        rows={7}
                    />
                </Form.Group>
                {errors?.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Which country are you based?</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={based}
                        onChange={handleChange}
                        name="based"
                        rows={1}
                    />
                </Form.Group>
                {errors?.based?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <div>
                    <Button
                        type="submit"
                        className={`${appStyles.Button} ${appStyles.GreenButton} mt-4`}
                    >
                        Save
                    </Button>
                </div>
                <Button
                    onClick={() => history.goBack()}
                    className={`${appStyles.Button} ${appStyles.InverseButton} mt-4`}
                >
                    Cancel
                </Button>
            </div>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-5 p-0 text-center" xs={12}>
                    {mainProfile}
                    <Container
                        className={
                            `${formStyles.Container} d-flex flex-column justify-content-center`
                        }
                    >
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image className={appStyles.Image} src={image} rounded />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className="btn my-auto"
                                    htmlFor="image-upload"
                                >
                                    Click to change your profile image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col
                    xs={12} sm={{ span: 8, offset: 2 }}
                    className="d-none d-md-block p-0 p-md-2"
                >
                    <Container >{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;