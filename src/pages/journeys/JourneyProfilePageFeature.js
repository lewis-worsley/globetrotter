import React, { useState } from 'react'
import appStyles from "../../App.module.css"
import journeyStyles from "../../styles/JourneyPages.module.css"
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
import { Button, CardColumns, Col, Row } from 'react-bootstrap';


const JourneyProfilePageFeature = (props) => {
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
        journeyPage,
        setJourneys,
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
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/journeys/${id}`}>...read more</Link> : ""}
                </span>
            </p>
        );
    };

    const handleEdit = () => {
        history.push(`/journeys/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/journeys/${id}/`)
            history.goBack();
        } catch (err) {
            console.log(err);
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
                        ? { ...journey, likes_count: journey.likes_count - 1, like_id: null }
                        : journey;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={`${journeyStyles.CardTop}`}>
                <Row className="align-items-center">
                    <Col xs={5}>
                        <Card.Text className={`${appStyles.Date}`}>{created_at}</Card.Text>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Card.Text className={appStyles.Headings}>{countries}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title><h4 className={appStyles.Headings}>{title}</h4></Card.Title>}
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <Link to={`/journeys/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.Image} />
                </Link>
                <div className='mt-4 d-flex justify-content-end align-items-center'>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Can't like your own journey!</Tooltip>}
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
                            overlay={<Tooltip>Login to like journeys!</Tooltip>}
                        >
                            <i className={`${appStyles.Heart} far fa-heart`}></i>
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <span className='ml-3'>
                        <Link to={`/journeys/${id}`}>
                            <i className={`${appStyles.Comment} far fa-comments`}></i>
                        </Link>
                        {comments_count}
                    </span>
                    <Link to={`/journeys/${id}`}>
                        <Button className={`${journeyStyles.JourneyButton} ${appStyles.Button}`}>Read journey</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default JourneyProfilePageFeature;