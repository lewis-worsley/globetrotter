import React, { useEffect, useState } from 'react'
import { Button, Card, CardDeck, Col, Container, Image, Media, Row } from 'react-bootstrap';
import hero from '../../assets/homepage-hero.jpg'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Journey from "../journeys/Journey";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import Blog from '../blogs/Blog';
import News from '../news/News';




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
            <div>
                <Image src={hero} />
                <h1>Wow</h1>
            </div>


            <Row>
                <Col>
                    <Card>
                        <Card.Img src={hero} />
                        <Card.Body>
                            <Card.Title className='mt-1'>Hello</Card.Title>
                        </Card.Body>
                    </Card>
                    <Image />
                </Col>

                <Col>
                    <h2>About Globetrotters</h2>
                    <p>Blurb</p>

                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Become a Globetrotter</h2>
                    <p>Blurb</p>
                    <Link to="/signup">
                        <Button>Sign up</Button>
                    </Link>
                    <Link to="/signin">
                        <Button variant='secondary'>Sign in</Button>
                    </Link>
                </Col>
                <Col>
                    Image goes here
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Fellow Globetrotters</h3>
                    <p>Blurb</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CardDeck>

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
            
            <Row>
                <Col>
                <h3>Latest blogs</h3>
                <p>Blurb</p>
                    <CardDeck>
                        {hasLoaded ? (
                            <>
                                {blogs.results.slice(0, 3).map((blog) => (
                                    <Blog key={blog.id} {...blog} setBlogs={setBlogs} />
                                ))}
                            </>
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </CardDeck>
                    <Link to="/blogs">
                        <Button>
                            View latest blogs
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col>
                <h3>Latest news</h3>
                <p>Blurb</p>
                    <CardDeck>
                        {hasLoaded ? (
                            <>
                                {newss.results.slice(0, 3).map((news) => (
                                    <News key={news.id} {...news} setNewss={setNewss} />
                                ))}
                            </>
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset spinner />
                            </Container>
                        )}
                    </CardDeck>
                    <Link to="/news">
                        <Button>
                            View latest news
                        </Button>
                    </Link>
                </Col>
            </Row>



        </div>
    )
}

export default HomePage;   