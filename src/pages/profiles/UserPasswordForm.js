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

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileDataContext";

import { ProfileEditDropdown } from "../../components/MoreDropdown";

const UserPasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;

    const mainProfile = (
        <>
            {<ProfileEditDropdown id={profile?.id} />}
        </>
    );

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            // redirect user if they are not the owner of this profile
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
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
                    {mainProfile}
                    <Form onSubmit={handleSubmit}>
                        <h1
                            className={
                                `${appStyles.Headings} ${appStyles.GreenHeading} mb-5`
                            }
                        >
                            Change password
                        </h1>

                        <Form.Group>
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                placeholder="new password"
                                type="password"
                                value={new_password1}
                                onChange={handleChange}
                                name="new_password1"
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                placeholder="confirm new password"
                                type="password"
                                value={new_password2}
                                onChange={handleChange}
                                name="new_password2"
                            />
                        </Form.Group>
                        {errors?.new_password2?.map((message, idx) => (
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
                                Save new password
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

export default UserPasswordForm;