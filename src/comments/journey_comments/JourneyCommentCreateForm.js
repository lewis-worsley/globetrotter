import { useState } from 'react'
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css"
import Avatar from "../../components/Avatar";
import { Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';

function JourneyCommentCreateForm(props) {

    const {
        journey,
        setJourney,
        setComments,
        profileImage,
        profile_id,
    } = props;

    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/journeys/comments/", {
                content,
                journey,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setJourney((prevJourney) => ({
                results: [
                    {
                        ...prevJourney.results[0],
                        comments_count: prevJourney.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="Add your comment here"
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={3}
                    />
                </InputGroup>
            </Form.Group>
            <Button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Post
            </Button>
        </Form>
    )
}

export default JourneyCommentCreateForm;