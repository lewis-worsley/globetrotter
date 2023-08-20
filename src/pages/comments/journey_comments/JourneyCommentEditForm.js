import { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Button from "react-bootstrap/Button";

function JourneyCommentEditForm(props) {
    const {
        id,
        content,
        setShowEditForm,
        setJourneyComments,
    } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/journeys/comments/${id}/`, {
                content: formContent.trim(),
            });
            setJourneyComments((prevJourneyComments) => ({
                ...prevJourneyComments,
                results: prevJourneyComments.results.map((journeyComment) => {
                    return journeyComment.id === id
                    ? {
                        ...journeyComment,
                        content: formContent.trim(),
                        updated_at: "now",
                    }
                    : journeyComment;
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
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div>
                <Button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    className={styles.Button}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default JourneyCommentEditForm;