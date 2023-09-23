import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import appStyles from '../../App.module.css';
import newsStyles from '../../styles/NewsPages.module.css';

const News = (props) => {
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
                {isReadMore ? text.slice(0, 250) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/news/${id}`}>...read more</Link> : ""}
                </span>
            </span>
        );
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={`${newsStyles.CardTop}`}>
                {created_at}
            </Card.Body>
            <Card.Body>
                <Link to={`/news/${id}`}>
                    {title &&
                        <Card.Title>
                            <h2 className={appStyles.Headings}>{title}</h2>
                        </Card.Title>
                    }
                </Link>
                {
                    content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>
                }
                <Link to={`/news/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.Image} />
                </Link>
                <div className='mt-4 d-flex justify-content-end'>
                    <Link to={`/news/${id}`}>
                        <Button
                            className={`${newsStyles.NewsButton} ${appStyles.Button}`}
                        >
                            Read more
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default News;