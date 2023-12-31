import { useState } from 'react';
import { Link } from "react-router-dom";

import Avatar from "../../../components/Avatar";

import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import appStyles from "../../../App.module.css";
import commentStyles from "../../../styles/Comment.module.css";

import { axiosRes } from '../../../api/axiosDefaults';

function BlogCommentCreateForm(props) {
    const {
        blog,
        setBlog,
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
            const { data } = await axiosRes.post("/blogs/comments/", {
                content,
                blog,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setBlog((prevBlog) => ({
                results: [
                    {
                        ...prevBlog.results[0],
                        comments_count: prevBlog.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={commentStyles.BlogForm}
                        placeholder="Add your comment here..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={3}
                    />
                </InputGroup>
            </Form.Group>
            <Button
                className={
                    `${appStyles.Button} ${appStyles.BlueButton} d-block ml-auto`
                }
                disabled={!content.trim()}
                type="submit"
            >
                Post
            </Button>
        </Form>
    );
};

export default BlogCommentCreateForm;