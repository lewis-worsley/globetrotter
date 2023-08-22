import React from 'react'
import styles from "../../styles/Blog.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from "react-router-dom";

const Blog = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        countries,
        locations,
        image,
        updated_at,
        blogPage,
        setBlogs,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/blogs/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/${id}/`)
            history.goBack();
        } catch(err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/blogs/likes/", { blog: id });
            setBlogs((prevBlogs) => ({
                ...prevBlogs,
                results: prevBlogs.results.map((blog) => {
                    return blog.id === id
                        ? { ...blog, likes_count: blog.likes_count + 1, like_id: data.id }
                        : blog;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/blogs/likes/${like_id}`);
            setBlogs((prevBlogs) => ({
                ...prevBlogs,
                results: prevBlogs.results.map((blog) => {
                    return blog.id === id
                    ? {...blog, likes_count: blog.likes_count - 1, like_id: null}
                    : blog;
                }),
            }));
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    {countries}
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && blogPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/blogs/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.Post}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Can't like your own blog!</Tooltip>}
                        >
                            <i className="far fa-heart"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`}></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fas fa-heart ${styles.HeartOutline}`}></i>
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Login to like posts!</Tooltip>}
                        >
                            <i className={`${styles.Heart} far fa-heart`}></i>
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/blogs/${id}`}>
                        <i className={`${styles.Comment} far fa-comments`}></i>
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Blog;