import React from 'react';
import footerStyles from '../styles/Footer.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import appStyles from '../App.module.css'
import { Image } from 'react-bootstrap';
import companyLogo from "../assets/globetrotters-logo.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const Footer = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    return (
        <div className={footerStyles.Footer}>
            <Container className='text-md-left text-center'>
                <Link to="/home">
                    <Image src={companyLogo} className={footerStyles.CompanyLogo} />
                </Link>
                <Row>
                    <Col xs={12} md={3} className={`${appStyles.Headings} mt-2`}>
                        <Link to="/">Journeys</Link>
                    </Col>
                    <Col xs={12} md={3} className={`${appStyles.Headings} mt-2`}>
                        <Link to="/blogs">Blogs</Link>
                    </Col>
                    <Col xs={12} md={3} className={`${appStyles.Headings} mt-2`}>
                        <Link to="/news">News</Link>
                    </Col>
                    <Col xs={12} md={3} className={`${appStyles.Headings} mt-2`}>
                        <Link to={`/profiles/${currentUser?.profile_id}`}>
                            Profile account
                        </Link>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Col>Copyright © Globetrotters 2023. All rights reserved.</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer