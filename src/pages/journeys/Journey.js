import React from 'react'
import styles from "../../styles/Journey.modules.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import { axiosRes } from '../../api/axiosDefaults';

const Journey = (props) => {
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
        journeyPage,
        setJourneys,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

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
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/journeys/likes/${like_id}`);
            setJourneys((prevJourneys) => ({
                ...prevJourneys,
                results: prevJourneys.results.map((journey) => {
                    return journey.id === id
                    ? {...journey, likes_count: journey.likes_count - 1, like_id: null}
                    : journey;
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
                        {is_owner && journeyPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/journeys/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.Post}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Can't like your own journey!</Tooltip>}
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
                    <Link to={`/journeys/${id}`}>
                        <i className={`${styles.Comment} far fa-comments`}></i>
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Journey