import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import appStyles from "../App.module.css";
import footerStyles from "../styles/Footer.module.css";

import companyLogo from "../assets/globetrotters-logo-grey.svg"

import { useCurrentUser } from "../contexts/CurrentUserContext";

const Footer = () => {
    const currentUser = useCurrentUser();

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
                    {currentUser ? (
                        <Col xs={12} md={3} className="mt-2">
                            <Link
                                to={`/profiles/${currentUser?.profile_id}`}
                                className={appStyles.Headings}
                            >
                                Profile account
                            </Link>
                        </Col>
                    ) : (
                        <Col xs={12} md={3} className={`mt-2`}>
                            <Link to="/signin" className={appStyles.Headings}>
                                Account
                            </Link>
                            <Link to="/signin">
                                <div className="mt-2">Sign in</div>
                            </Link>
                            <Link to="/signup">
                                <div className="mt-1">Sign up</div>
                            </Link>
                        </Col>
                    )}
                </Row>
                <Row className='mt-5'>
                    <Col>Copyright © Globetrotters 2023. All rights reserved.</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;