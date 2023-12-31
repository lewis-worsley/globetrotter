import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Avatar from '../../components/Avatar';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import appStyles from '../../App.module.css';

import { MoreDropdown } from '../../components/MoreDropdown';

import { axiosRes } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

const UniqueBlogPage = (props) => {
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
        blogPage,
        setBlogs,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/blogs/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blogs/${id}/`);
            history.goBack();
        } catch (err) {
            console.error(err);
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
            console.error(err);
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
            console.error(err);
        }
    };

    return (
        <div>
            <div className={appStyles.HeroImage}>
                <Card.Img src={image} alt={title} className={`${appStyles.Hero}`} />
                <div className={`${appStyles.Title} border-bottom text-center`}>
                    {title &&
                        <Card.Title>
                            <h1 className={appStyles.Headings}>{title}</h1>
                        </Card.Title>
                    }
                    <h3 className={`${appStyles.Headings} mt-5`}>{countries}</h3>
                </div>
            </div>
            <Card className={`${appStyles.Card}`} bg="dark" text="white">
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex mx-4" >
                                {is_owner && blogPage && (
                                    <MoreDropdown
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                )}
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col xs={12} className='d-flex align-items-baseline'>
                                            <span className={`${appStyles.Date}`}>{created_at}</span>
                                            <span
                                                className={`${appStyles.Headings} ml-auto`}
                                            >
                                                {locations ? (
                                                    <span>{locations},</span>
                                                ) : (
                                                    ""
                                                )} {countries}
                                            </span>
                                        </Col>
                                        <Col>
                                            {title &&
                                                <Card.Title className={`${appStyles.Headings} mt-3`}>
                                                    {title}
                                                </Card.Title>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                {content && <Card.Text>{content}</Card.Text>}
                                <div>
                                    {is_owner ? (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Can't like your own blog!</Tooltip>}
                                        >
                                            <i className="fa-regular fa-heart"></i>
                                        </OverlayTrigger>
                                    ) : like_id ? (
                                        <span onClick={handleUnlike}>
                                            <i className="fas fa-heart"></i>
                                        </span>
                                    ) : currentUser ? (
                                        <span onClick={handleLike}>
                                            <i className="fa-regular fa-heart"></i>
                                        </span>
                                    ) : (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Sign in to like blogs!</Tooltip>}
                                        >
                                            <i className="far fa-heart"></i>
                                        </OverlayTrigger>
                                    )}
                                    <span>Likes {likes_count}</span>
                                    <span className='ml-3'>
                                        <Link to={`/blogs/${id}`}>
                                            <i className="far fa-comments"></i>
                                        </Link>
                                        Comments {comments_count}
                                    </span>
                                </div>
                            </Card.Body>
                            <Media className="align-items-center p-4">
                                <Link to={`/profiles/${profile_id}`}>
                                    <Avatar src={profile_image} height={100} />
                                </Link>
                                <div className="mx-4">
                                    <Link to={`/profiles/${profile_id}`}>
                                        <span className={appStyles.User}>{owner}</span>
                                    </Link>
                                </div>
                            </Media>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UniqueBlogPage;