import React, { useState } from 'react'
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
import { Button, Col, Row } from 'react-bootstrap';
import appStyles from '../../App.module.css'

const BlogHomePageFeature = (props) => {
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
        created_at,
        blogPage,
        setBlogs,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 100) : text}
                <span onClick={toggleReadMore} className={`${styles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/blogs/${id}`}>...read more</Link> : ""}
                </span>
            </p>
        );
    };

    const handleEdit = () => {
        history.push(`/blogs/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/${id}/`)
            history.goBack();
        } catch (err) {
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
                        ? { ...blog, likes_count: blog.likes_count - 1, like_id: null }
                        : blog;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={`${styles.CardTop}`}>
                <Row className="align-items-center">
                    <Col xs={8}>
                        <Media className="align-items-center">
                            <Link to={`/profiles/${profile_id}`}>
                                <Avatar src={profile_image} height={55} />
                            </Link>
                            <div className='mx-4'>
                                <Link to={`/profiles/${profile_id}`}>
                                    <span className={styles.User}>{owner}</span>
                                </Link>
                                <Card.Text className={`${styles.Date}`}>{created_at}</Card.Text>
                            </div>
                        </Media>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Card.Text className={appStyles.Headings}>{countries}</Card.Text>
                    </Col>

                </Row>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title><h2 className={appStyles.Headings}>{title}</h2></Card.Title>}
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <Link to={`/blogs/${id}`}>
                    <Card.Img src={image} alt={title} />
                </Link>
                <div className='mt-4 d-flex justify-content-end align-items-center'>
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
                            overlay={<Tooltip>Login to like blogs!</Tooltip>}
                        >
                            <i className={`${styles.Heart} far fa-heart`}></i>
                        </OverlayTrigger>
                    )}
                    <span>{likes_count}</span>
                    <span className='ml-3'>
                        <Link to={`/blogs/${id}`}>
                            <i className={`${styles.Comment} far fa-comments`}></i>
                        </Link>
                        {comments_count}
                    </span>
                    <Link to={`/blogs/${id}`}>
                        <Button className={`${styles.Button} ml-4 py-2 px-4`}>Read blog</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default BlogHomePageFeature;