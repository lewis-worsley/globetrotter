import React from 'react'
import { useState } from "react";
import appStyles from "../../App.module.css"
import blogStyles from "../../styles/BlogPages.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const BlogFeature = (props) => {
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



    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 60) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/blogs/${id}`}>...read more</Link> : ""}
                </span>
            </p>
        );
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={`${blogStyles.CardTop}`}>
                <Row className="align-items-center">
                    <Col xs={8}>
                        <Media className="align-items-center">
                            <Link to={`/profiles/${profile_id}`}>
                                <Avatar src={profile_image} height={55} />
                            </Link>
                            <div className='mx-2'>
                                <Link to={`/profiles/${profile_id}`}>
                                    <span className={appStyles.User}>{owner}</span>
                                </Link>
                            </div>
                        </Media>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Card.Text className={`${appStyles.Date}`}>{created_at}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                <Link to={`/blogs/${id}`}>
                    {title && <Card.Title><h4 className={appStyles.Headings}>{title}</h4></Card.Title>}
                </Link>
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <Link to={`/blogs/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.Image} />
                </Link>
            </Card.Body>
        </Card>
    )
}

export default BlogFeature;