import React from 'react'
import styles from "../../styles/Blog.module.css"
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { Link } from "react-router-dom";

const News = (props) => {
    const {
        id,
        title,
        content,
        image,
        updated_at,
        newsPage,
        setNewss,
    } = props;

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                </Media>
            </Card.Body>
            <Link to={`/news/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
        </Card>
    )
}

export default News;