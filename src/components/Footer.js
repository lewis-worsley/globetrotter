import React from 'react';
import styles from '../styles/Footer.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <Container>
                <Row>
                    <Col xs={12} sm={4}>1 of 3</Col>
                    <Col xs={12} sm={4}>2 of 3</Col>
                    <Col xs={12} sm={4}>3 of 3</Col>
                </Row>
                <Row>
                    <Col>Copyright goes here</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer