import React, { useEffect, useState } from 'react'
import { Button, Card, CardDeck, Col, Container, Image, Media, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Journey from "../journeys/Journey";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/Homepage.module.css"
import blogStyles from "../../styles/BlogPages.module.css"
import newsStyles from "../../styles/NewsPages.module.css"
import BlogHomePageFeature from '../blogs/BlogHomePageFeature';
import NewsHomePageFeature from '../news/NewsHomePageFeature';

const HomePage = () => {
    const [blogs, setBlogs] = useState({ results: [] });
    const [journeys, setJourneys] = useState({ results: [] });
    const [newss, setNewss] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const { data } = await axiosReq.get("/journeys/");
                setJourneys(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchBlogs = async () => {
            try {
                const { data } = await axiosReq.get("/blogs/");
                setBlogs(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchNews = async () => {
            try {
                const { data } = await axiosReq.get("/news/");
                setNewss(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchJourneys();
            fetchBlogs();
            fetchNews();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [])

    return (
        <div>
            <div className={`${appStyles.HeroImage} ${appStyles.HeroImageHomePage}`}>
                <div className={appStyles.Centered}>
                    <h1 className={`${appStyles.Headings}`}>
                        Life is either a daring adventure or nothing at all
                    </h1>
                    <Link to={"/signup"}>
                        <Button>
                            Sign up
                        </Button>
                    </Link>
                    <Link to={"/signin"}>
                        <Button>
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>


            <Row className={`${styles.Intro} py-5`}>
                <Col>
                    <Image />
                </Col>

                <Col>
                    <h2 className={appStyles.Headings}>About Globetrotters</h2>
                    <p>Blurb</p>

                </Col>
            </Row>

            <Row className={`${styles.Journey} py-5`}>
                <Col xs={6}>
                    <h2>Become a Globetrotter</h2>
                    <p>Blurb</p>
                    <Link to="/signup">
                        <Button>Sign up</Button>
                    </Link>
                    <Link to="/signin">
                        <Button variant='secondary'>Sign in</Button>
                    </Link>
                </Col>
                <Col xs={6}>
                    Image goes here

                </Col>
                <Col xs={12}>
                    <h3 className={appStyles.Headings}>Fellow Globetrotters</h3>
                    <p>Blurb</p>
                </Col>
                <Row>
                    <Col>
                        <CardDeck>
                            <Card>
                                {hasLoaded ? (
                                    <>
                                        {journeys.results.slice(0, 3).map((journey) => (
                                            <Journey key={journey.id} {...journey} setJourneys={setJourneys} />
                                        ))}
                                    </>
                                ) : (
                                    <Container className={appStyles.Content}>
                                        <Asset spinner />
                                    </Container>
                                )}
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link>
                            <Button>
                                Share your journey with the world!
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Row>

            <Row>
                <Col>
                    <h3 className={appStyles.Headings}>Latest <span className={appStyles.BlogWordTitle}>blogs</span></h3>
                    <p>Blurb</p>
                    <CardDeck>
                        {hasLoaded ? (
                            <>
                                {blogs.results.slice(0, 3).map((blog) => (
                                    <BlogHomePageFeature key={blog.id} {...blog} setBlogs={setBlogs} />
                                ))}
                            </>
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </CardDeck>
                    <div className='text-center'>
                        <Link to="/blogs">
                            <Button className={`${appStyles.Button} ${blogStyles.BlogButton}`}>
                                View latest blogs
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3 className={appStyles.Headings}>Latest <span className={appStyles.NewsWordTitle}>news</span></h3>
                    <p>Blurb</p>
                    <CardDeck>
                        {hasLoaded ? (
                            <>
                                {newss.results.slice(0, 3).map((news) => (
                                    <NewsHomePageFeature key={news.id} {...news} setNewss={setNewss} />
                                ))}
                            </>
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </CardDeck>
                    <div className='text-center'>
                        <Link to="/news">
                            <Button className={`${appStyles.Button} ${newsStyles.NewsButton}`}>
                                View latest news
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>



        </div>
    )
}

export default HomePage;   