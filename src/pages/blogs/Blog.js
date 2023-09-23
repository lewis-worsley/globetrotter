import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import Avatar from '../../components/Avatar';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { axiosRes } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import appStyles from '../../App.module.css';
import blogStyles from '../../styles/BlogPages.module.css';

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
        created_at,
        setBlogs,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 250) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/blogs/${id}`}>...read more</Link> : ""}
                </span>
            </p>
        );
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
            <Card.Body className={`${blogStyles.CardTop}`}>
                <Row className="align-items-center">
                    <Col xs={12} sm={5}>
                        <Media
                            className="align-items-center justify-content-center justify-content-sm-start"
                        >
                            <Link to={`/profiles/${profile_id}`}>
                                <Avatar src={profile_image} height={55} />
                            </Link>
                            <div className='mx-4'>
                                <Link to={`/profiles/${profile_id}`}>
                                    <span className={appStyles.User}>{owner}</span>
                                </Link>
                                <Card.Text
                                    className={`${appStyles.Date}`}
                                >
                                    {created_at}
                                </Card.Text>
                            </div>
                        </Media>
                    </Col>
                    <Col
                        className='d-flex justify-content-center justify-content-sm-end mt-4 mt-sm-0'
                    >
                        <Card.Text
                            className={appStyles.Headings}
                        >
                            {locations}, {countries}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                <Link to={`/blogs/${id}`}>
                    {title &&
                        <Card.Title>
                            <h2 className={appStyles.Headings}>{title}</h2>
                        </Card.Title>
                    }
                </Link>
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <div>
                    <Link to={`/blogs/${id}`}>
                        <Card.Img src={image} alt={title} className={appStyles.Image} />
                    </Link>
                </div>
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
                            <i className={`fas fa-heart ${appStyles.Heart}`}></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fas fa-heart ${appStyles.HeartOutline}`}></i>
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Login to like blogs!</Tooltip>}
                        >
                            <i className={`${appStyles.Heart} far fa-heart`}></i>
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <span className='ml-3'>
                        <Link to={`/blogs/${id}`}>
                            <i className={`${appStyles.Comment} far fa-comments`}></i>
                        </Link>
                        {comments_count}
                    </span>
                    <Link to={`/blogs/${id}`}>
                        <Button
                            className={`${blogStyles.BlogButton} ${appStyles.Button}`}
                        >
                            Read blog
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Blog;