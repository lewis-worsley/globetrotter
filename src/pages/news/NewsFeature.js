import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";

import appStyles from "../../App.module.css";
import newsStyles from "../../styles/NewsPages.module.css";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const NewsFeature = (props) => {
    const {
        id,
        title,
        content,
        image,
        created_at,
    } = props;

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <span className="text">
                {isReadMore ? text.slice(0, 60) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/news/${id}`}>...read more</Link> : ""}
                </span>
            </span>
        );
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={newsStyles.CardTop}>
                <Row className="align-items-center">
                    <Col xs={8}>
                        <Card.Text>News</Card.Text>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Card.Text
                            className={appStyles.Date}
                        >
                            {created_at}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                <Link to={`/news/${id}`}>
                    {title &&
                        <Card.Title>
                            <h4 className={appStyles.Headings}>{title}</h4>
                        </Card.Title>
                    }
                </Link>
                {content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>}
                <Link to={`/news/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.Image} />
                </Link>
            </Card.Body>
        </Card>
    );
};

export default NewsFeature;