import React from 'react'
import iconStyles from "../../styles/Blog.module.css"
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
import styles from '../../styles/UniqueBlogPage.module.css'
import appStyles from '../../App.module.css'
import { useSetProfileData } from '../../contexts/ProfileDataContext';

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
        updated_at,
        created_at,
        blogPage,
        setBlogs,
        following_id,
        profile,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const { handleFollow, handleUnfollow } = useSetProfileData();


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

        <div>
            <div className={styles.HeroImage}>
                <div className={`d-flex text-center`}>
                    <div className={`${styles.Hero}`}>
                        <Card.Img src={image} alt={title} className={`${styles.Hero}  `} />
                        <div className={`${styles.Title} border-bottom`}>
                            {title && <Card.Title ><h1 className={appStyles.Headings}>{title}</h1></Card.Title>}
                            <h3 className={`${appStyles.Headings} mt-3`}>{countries}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Card className={`${styles.Card} p-1`} mobile bg="dark" text="white">
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
                            <Col>
                                <Card.Body>
                                    <div>
                                        <Row>
                                            <Col>
                                                <span>{created_at}</span>
                                                {title && <Card.Title className={`${appStyles.Headings} mt-3`}>{title}</Card.Title>}
                                            </Col>
                                            <p className={` ${appStyles.Headings} mx-3`}>{countries}</p>
                                        </Row>
                                    </div>
                                    {content && <Card.Text>{content}</Card.Text>}
                                    <div>
                                        {is_owner ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Can't like your own blog!</Tooltip>}
                                            >
                                                <i className="far fa-heart"></i>
                                            </OverlayTrigger>
                                        ) : like_id ? (
                                            <span onClick={handleUnlike}>
                                                <i className={`fas fa-heart ${iconStyles.Heart}`}></i>
                                            </span>
                                        ) : currentUser ? (
                                            <span onClick={handleLike}>
                                                <i className={`fas fa-heart ${iconStyles.HeartOutline}`}></i>
                                            </span>
                                        ) : (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Login to like posts!</Tooltip>}
                                            >
                                                <i className={`${iconStyles.Heart} far fa-heart`}></i>
                                            </OverlayTrigger>
                                        )}
                                        <span>Likes {likes_count}</span>
                                        <span className='ml-3'>
                                            <Link to={`/blogs/${id}`}>
                                                <i className={`${styles.Comment} far fa-comments`}></i>
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
                                            {owner}
                                        </Link>

                                        <div className='mt-3'>
                                            {currentUser &&
                                                !is_owner &&
                                                (following_id ? (
                                                    <Button
                                                        className={appStyles.FollowButton}
                                                        onClick={() => handleUnfollow(profile)}
                                                    >
                                                        Unfollow
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className={appStyles.FollowButton}
                                                        onClick={() => handleFollow(profile)}
                                                    >
                                                        Follow
                                                    </Button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Media>
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>


            </Card>
        </div>

    )
}

export default UniqueBlogPage;