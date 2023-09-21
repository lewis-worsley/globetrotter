import { useState } from "react";

import commentStyles from "../../../styles/Comment.module.css";
import appStyles from "../../../App.module.css"

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { axiosRes } from '../../../api/axiosDefaults';

function BlogCommentEditForm(props) {
    const {
        id,
        content,
        setShowEditForm,
        setBlogComments,
    } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/blogs/comments/${id}/`, {
                content: formContent.trim(),
            });
            setBlogComments((prevBlogComments) => ({
                ...prevBlogComments,
                results: prevBlogComments.results.map((blogComment) => {
                    return blogComment.id === id
                    ? {
                        ...blogComment,
                        content: formContent.trim(),
                        updated_at: "now",
                    }
                    : blogComment;
                }),
            }));
            
            setShowEditForm(false);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={commentStyles.BlogForm}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div>
                <Button
                    className={`${appStyles.Button} ${appStyles.InverseButton} mr-2 mt-2 pt-2`}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    className={`${appStyles.Button} ${appStyles.BlueButton} ml-2 mt-2`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default BlogCommentEditForm;