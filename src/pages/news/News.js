import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import appStyles from '../../App.module.css'
import newsStyles from '../../styles/NewsPages.module.css'


const News = (props) => {
    const {
        id,
        title,
        content,
        image,
        created_at,
        updated_at,
        newsPage,
        setNewss,
    } = props;

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 280) : text}
                <span onClick={toggleReadMore} className={`${appStyles.ReadOrHide} pl-1`}>
                    {isReadMore ? <Link to={`/news/${id}`}>...read more</Link> : ""}
                </span>
            </p>
        );
    };

    return (
        <Card className='my-4' bg='dark' text='light'>
            <Card.Body className={`${newsStyles.CardTop}`}>
                {created_at}
            </Card.Body>

            <Card.Body>
                {title && <Card.Title><h2 className={appStyles.Headings}>{title}</h2></Card.Title>}
                {
                    content &&
                    <Card.Text>
                        <ReadMore>{content}</ReadMore>
                    </Card.Text>
                }
                <Link to={`/news/${id}`}>
                    <Card.Img src={image} alt={title} className={appStyles.Image} />
                </Link>
                <div className='d-flex justify-content-end'>
                    <Link to={`/news/${id}`}>
                        <Button className={`${newsStyles.NewsButton} ${appStyles.Button}`}>
                            Read more
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default News;