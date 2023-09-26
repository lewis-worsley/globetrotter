import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import appStyles from '../../App.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { axiosRes } from '../../api/axiosDefaults';

const UniqueJourneyPage = (props) => {
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
        journeyPage,
        setJourneys,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/journeys/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/journeys/${id}/`);
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/journeys/likes/", { journey: id });
            setJourneys((prevJourneys) => ({
                ...prevJourneys,
                results: prevJourneys.results.map((journey) => {
                    return journey.id === id
                        ? { ...journey, likes_count: journey.likes_count + 1, like_id: data.id }
                        : journey;
                }),
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/journeys/likes/${like_id}`);
            setJourneys((prevJourneys) => ({
                ...prevJourneys,
                results: prevJourneys.results.map((journey) => {
                    return journey.id === id
                        ? { ...journey, likes_count: journey.likes_count - 1, like_id: null }
                        : journey;
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
                                {is_owner && journeyPage && (
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
                                                <Card.Title
                                                    className={`${appStyles.Headings} mt-3`}
                                                >
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
                                            overlay={<Tooltip>Can't like your own journey!</Tooltip>}
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
                                            overlay={<Tooltip>Sign in to like journeys!</Tooltip>}
                                        >
                                            <i className="far fa-heart"></i>
                                        </OverlayTrigger>
                                    )}
                                    <span>Likes {likes_count}</span>
                                    <span className='ml-3'>
                                        <Link to={`/journeys/${id}`}>
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

export default UniqueJourneyPage;