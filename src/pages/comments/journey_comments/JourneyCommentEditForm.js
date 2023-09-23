import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import appStyles from "../../../App.module.css";
import commentStyles from "../../../styles/Comment.module.css";

import { axiosRes } from '../../../api/axiosDefaults';

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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={commentStyles.JourneyForm}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div>
                <Button
                    className={
                        `${appStyles.Button} ${appStyles.InverseButton} mr-2 mt-2 pt-2`
                    }
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    className={
                        `${appStyles.Button} ${appStyles.GreenButton} ml-2 mt-2`
                    }
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