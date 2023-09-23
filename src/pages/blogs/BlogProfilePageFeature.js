import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { axiosRes } from '../../api/axiosDefaults';

import appStyles from '../../App.module.css';
import blogStyles from '../../styles/BlogPages.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

const BlogProfilePageFeature = (props) => {
    const {
        id,
        owner,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        countries,
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
            <span className="text">
                {isReadMore ? text.slice(0, 100) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/blogs/${id}`}>...read more</Link> : ""}
                </span>
            </span>
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
        <Card className="my-4" bg='dark' text='light'>
            <Card.Body className={blogStyles.CardTop}>
                <Row className="align-items-center">
                    <Col xs={5}>
                        <Card.Text className={appStyles.Date}>{created_at}</Card.Text>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Card.Text className={appStyles.Headings}>{countries}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body className='p-4'>
                {title &&
                    <Link to={`/blogs/${id}`}>
                        <Card.Title>
                            <h4 className={appStyles.Headings}>{title}</h4>
                        </Card.Title>
                    </Link>
                }
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <Link to={`/blogs/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.ImagesOnProfile} />
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
                    <span>{likes_count}</span>
                    <span className='ml-3'>
                        <Link to={`/blogs/${id}`}>
                            <i className={`${appStyles.Comment} far fa-comments`}></i>
                        </Link>
                        {comments_count}
                    </span>
                    <Link to={`/blogs/${id}`}>
                        <Button
                            className={`${appStyles.Button} ${blogStyles.BlogButton}`}
                        >
                            Read blog
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BlogProfilePageFeature;