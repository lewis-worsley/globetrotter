import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";

import { axiosRes } from "../../api/axiosDefaults";

import { useProfileData } from "../../contexts/ProfileDataContext";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import { ProfileEditDropdown } from "../../components/MoreDropdown";

const UsernameForm = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;

    const mainProfile = (
        <>
            <Container>
                {<ProfileEditDropdown id={profile?.id} />}
            </Container>
        </>
    );

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            history.goBack();
        } catch (err) {
            console.error(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-5 mx-auto text-center" md={6}>
                <Container>
                    <Form onSubmit={handleSubmit} className="my-5">
                        {mainProfile}
                        <h1
                            className={
                                `${appStyles.Headings} ${appStyles.GreenHeading} mb-5`
                            }
                        >
                            Change username
                        </h1>

                        <Form.Group>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <div>
                            <Button
                                type="submit"
                                className={
                                    `${appStyles.Button} ${appStyles.GreenButton} mt-4`
                                }
                            >
                                Save name change
                            </Button>
                        </div>
                        <Button
                            onClick={() => history.goBack()}
                            className={
                                `${appStyles.Button} ${appStyles.InverseButton} mt-4`
                            }
                        >
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UsernameForm;