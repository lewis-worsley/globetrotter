import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import appStyles from '../../App.module.css';

const UniqueNewsPage = (props) => {
    const {
        title,
        content,
        image,
        created_at,
    } = props;

    return (

        <div>
            <div className={appStyles.HeroImage}>
                <Card.Img src={image} alt={title} className={`${appStyles.Hero}`} />
                <image src={image} />
                <div className={`${appStyles.Title} border-bottom text-center`}>
                    {title && <Card.Title ><h1 className={appStyles.Headings}>{title}</h1></Card.Title>}
                </div>
            </div>

            <Card className={`${appStyles.Card}`} bg="dark" text="white">
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col xs={12} className='d-flex align-items-baseline'>
                                            <span className={`${appStyles.Date}`}>{created_at}</span>
                                        </Col>
                                        <Col>{title && <Card.Title className={`${appStyles.Headings} mt-3`}>{title}</Card.Title>}</Col>
                                    </Row>
                                </div>
                                {content && <Card.Text>{content}</Card.Text>}
                            </Card.Body>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UniqueNewsPage;