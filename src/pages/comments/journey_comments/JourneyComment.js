import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from '../../../components/Avatar';
import { MoreDropdown } from '../../../components/MoreDropdown';

import Media from 'react-bootstrap/Media';

import commentStyles from "../../../styles/Comment.module.css";

import { useCurrentUser } from '../../../contexts/CurrentUserContext';

import { axiosRes } from '../../../api/axiosDefaults';

import JourneyCommentEditForm from './JourneyCommentEditForm';

const JourneyComment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setJourney,
        setJourneyComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/journeys/comments/${id}/`);
            setJourney(prevJourney => ({
                results: [
                    {
                        ...prevJourney.results[0],
                        comment_count: prevJourney.results[0].comment_count - 1,
                    },
                ],
            }));
            setJourneyComments((prevJourneyComments) => ({
                ...prevJourneyComments,
                results: prevJourneyComments.results.filter((journeyComment) => journeyComment.id !== id),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <Link to={`/profiles/${profile_id}`}>
                        <span className={commentStyles.JourneyUser}>{owner}</span>
                    </Link>
                    <span className={commentStyles.Date}>{updated_at}</span>
                    {showEditForm ? (
                        <JourneyCommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setJourneyComments={setJourneyComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <MoreDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default JourneyComment;