import React, { useState } from 'react'
import { Media } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Avatar from '../../../components/Avatar';
import styles from "../../../styles/Comment.module.css"
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../../components/MoreDropdown';
import { axiosRes } from '../../../api/axiosDefaults';
import BlogCommentEditForm from './BlogCommentEditForm';

const BlogComment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setBlog,
        setBlogComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/comments/${id}/`);
            setBlog(prevBlog => ({
                results: [
                    {
                        ...prevBlog.results[0],
                        comment_count: prevBlog.results[0].comment_count - 1,
                    },
                ],
            }));

            setBlogComments((prevBlogComments) => ({
                ...prevBlogComments,
                results: prevBlogComments.results.filter((blogComment) => blogComment.id !== id),
            }));
        } catch (err) {
            console.log(err);
        };
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
                        <span className={styles.Owner}>{owner}</span>
                    </Link>
                    <span className={styles.Date}>{updated_at}</span>
                    {showEditForm ? (
                        <BlogCommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setBlogComments={setBlogComments}
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

export default BlogComment;