import React from 'react'
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
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const UniqueNewsPage = (props) => {
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
        history.push(`/news/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/news/${id}/`)
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div>
            <div className={appStyles.HeroImage}>
                <div className={`text-center`}>
                    <Card.Img src={image} alt={title} className={`${appStyles.Hero}`} />
                    <image src={image}/>
                    <div className={`${appStyles.Title} border-bottom`}>
                        {title && <Card.Title ><h1 className={appStyles.Headings}>{title}</h1></Card.Title>}
                    </div>
                </div>
            </div>

            <Card className={`${appStyles.Card}`} bg="dark" text="white">
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex mx-4" >
                                    <MoreDropdown
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Col>
                                <Card.Body>
                                    <div>
                                        <Row>
                                            <Col xs={12} className='d-flex align-items-baseline'>

                                                <span className={`${appStyles.Date}`}>{created_at}</span>
                                                <span className={`${appStyles.Headings} ml-auto`}>{countries}</span>
                                            </Col>
                                            <Col>{title && <Card.Title className={`${appStyles.Headings} mt-3`}>{title}</Card.Title>}</Col>
                                        </Row>
                                    </div>
                                    {content && <Card.Text>{content}</Card.Text>}
                                </Card.Body>
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>


            </Card>
        </div>

    )
}

export default UniqueNewsPage;