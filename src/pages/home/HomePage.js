import React, { useEffect, useState } from 'react'
import { Button, Card, CardDeck, Col, Container, Image, Media, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import homePageStyles from "../../styles/HomePage.module.css"
import blogStyles from "../../styles/BlogPages.module.css"
import newsStyles from "../../styles/NewsPages.module.css"
import journeyStyles from "../../styles/JourneyPages.module.css"
import BlogHomePageFeature from '../blogs/BlogHomePageFeature';
import NewsHomePageFeature from '../news/NewsHomePageFeature';
import JourneyHomePageFeature from '../journeys/JourneyHomePageFeature';
import companyLogo from "../../assets/globetrotters-logo.png"
import globetrotter from "../../assets/pexels-yogendra-singh-3930029.jpg"

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
            <div className={`${homePageStyles.HeroImage} ${homePageStyles.Hero} text-center`}>
                <div className={homePageStyles.Centered}>
                    <h1 className={`${appStyles.Headings}`}>
                        Welcome to the Globetrotter lifestyle
                    </h1>
                </div>
            </div>


            <Row className={`${homePageStyles.FullBleed} ${homePageStyles.Intro} align-items-center`}>
                <Col md={6} className={`text-center d-none d-md-block`}>
                    <Image src={companyLogo} className={homePageStyles.ImageLogo}/>
                </Col>

                <Col xs={12} md={6} className='text-md-left text-center'>
                    <h2 className={appStyles.Headings}>About Globetrotters</h2>
                    <p>
                        We bring you closer to the people and places you love
                        (or wish to visit) from around the world. Globetrotters provides
                        travellers a platform to share and inspire global travellers. It
                        covers all aspects, from cities to airports, cruise ports to ski
                        and beach resorts, attractions to events, and it also includes
                        weekly travel news, guides and blogs.
                    </p>
                </Col>
            </Row>

            <div>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} className='text-md-left text-center'>
                        <h2 className={`${appStyles.Headings} ${appStyles.GreenHeading}`}>Why be a Globetrotter?</h2>
                        <p>
                            Love travel? Discover and plan your perfect trip with expert
                            advice, travel guides, destination information and inspiration
                            from fellow Globetrotters.
                        </p>
                        <Link to="/signup">
                            <Button className={`${appStyles.Button} ${homePageStyles.SignUpButton} mr-2`}>Sign up</Button>
                        </Link>
                        <Link to="/signin">
                            <Button className={`${appStyles.Button} ${homePageStyles.SignInButton} ml-2`}>Sign in</Button>
                        </Link>
                    </Col>
                    <Col xs={12} md={6} className='d-none d-md-block text-center'>
                        <Image src={globetrotter} className={`${homePageStyles.Globetrotter}`} rounded/>
                    </Col>
                </Row>

                <Row className={`mt-5`}>
                    <Col>
                        <div className='text-center'>
                            <h3 className={appStyles.Headings}>Fellow <span className={appStyles.GreenHeading}>Globetrotters</span></h3>
                            <p>Discover where our Globetrotters have travelled, we are sure you'll find their content inspiring, engaging and informative.</p>
                        </div>

                        {/* 3 journeys are displayed in extra larger devices (1200px) and less than 576px */}
                        <div className='d-block d-sm-none d-md-none d-lg-none d-xl-block'>
                            <CardDeck>
                                {hasLoaded ? (
                                    <>
                                        {journeys.results.slice(0, 3).map((journey) => (
                                            <JourneyHomePageFeature key={journey.id} {...journey} setJourneys={setJourneys} />
                                        ))}
                                    </>
                                ) : (
                                    <Container className={appStyles.Content}>
                                        <Asset spinner />
                                    </Container>
                                )}
                            </CardDeck>
                        </div>

                        {/* 2 journeys are displayed in medium devices (768px>) */}
                        <div className='d-none d-sm-none d-md-block d-lg-block d-xl-none'>
                            <CardDeck>
                                {hasLoaded ? (
                                    <>
                                        {journeys.results.slice(0, 2).map((journey) => (
                                            <JourneyHomePageFeature key={journey.id} {...journey} setJourneys={setJourneys} />
                                        ))}
                                    </>
                                ) : (
                                    <Container className={appStyles.Content}>
                                        <Asset spinner />
                                    </Container>
                                )}
                            </CardDeck>
                        </div>

                        {/* 1 journey is displayed in small devices (576px>) */}
                        <div className='d-none d-sm-block d-md-none'>
                            <CardDeck>
                                {hasLoaded ? (
                                    <>
                                        {journeys.results.slice(0, 1).map((journey) => (
                                            <JourneyHomePageFeature key={journey.id} {...journey} setJourneys={setJourneys} />
                                        ))}
                                    </>
                                ) : (
                                    <Container className={appStyles.Content}>
                                        <Asset spinner />
                                    </Container>
                                )}
                            </CardDeck>
                        </div>

                        <div className='text-center'>
                            <Link to="/signin">
                                <Button className={`${appStyles.Button} ${journeyStyles.JourneyFormButton}`}>
                                    Share your journey
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className='mt-5'>
                <Col>
                    <div className='text-center'>
                        <h3 className={appStyles.Headings}>Latest <span className={appStyles.BlueHeading}>blogs</span></h3>
                        <p>Check out the most recent travel blogs that offer informative and interactive travel storytelling, taking your wanderlust to new destinations.</p>
                    </div>


                    {/* 3 blogs are displayed in extra larger devices (1200px) and less than 576px */}
                    <div className='d-block d-sm-none d-md-none d-lg-none d-xl-block'>
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
                    </div>

                    {/* 2 blogs are displayed in medium devices (768px>) */}
                    <div className='d-none d-sm-none d-md-block d-lg-block d-xl-none'>
                        <CardDeck>
                            {hasLoaded ? (
                                <>
                                    {blogs.results.slice(0, 2).map((blog) => (
                                        <BlogHomePageFeature key={blog.id} {...blog} setBlogs={setBlogs} />
                                    ))}
                                </>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset spinner />
                                </Container>
                            )}
                        </CardDeck>
                    </div>

                    {/* 1 blog is displayed in small devices (576px>) */}
                    <div className='d-none d-sm-block d-md-none'>
                        <CardDeck>
                            {hasLoaded ? (
                                <>
                                    {blogs.results.slice(0, 1).map((blog) => (
                                        <BlogHomePageFeature key={blog.id} {...blog} setBlogs={setBlogs} />
                                    ))}
                                </>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset spinner />
                                </Container>
                            )}
                        </CardDeck>
                    </div>

                    <div className='text-center'>
                        <Link to="/blogs">
                            <Button className={`${appStyles.Button} ${blogStyles.BlogFormButton}`}>
                                View latest blogs
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row className={`mt-5`}>
                <Col>
                <div className='text-center'>
                <h3 className={appStyles.Headings}>Latest <span className={appStyles.GreyBlueHeading}>news</span></h3>
                        <p>Latest travel news and reviews around the globe, travel guides to global destinations, city breaks, hotels and more.</p>
                    </div>


                    {/* 3 news are displayed in extra larger devices (1200px) and less than 576px */}
                    <div className='d-block d-sm-none d-md-none d-lg-none d-xl-block'>
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
                    </div>

                    {/* 2 news are displayed in medium devices (768px>) */}
                    <div className='d-none d-sm-none d-md-block d-lg-block d-xl-none'>
                        <CardDeck>
                            {hasLoaded ? (
                                <>
                                {newss.results.slice(0, 2).map((news) => (
                                    <NewsHomePageFeature key={news.id} {...news} setNewss={setNewss} />
                                ))}
                                </>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset spinner />
                                </Container>
                            )}
                        </CardDeck>
                    </div>

                    {/* 1 news is displayed in small devices (576px>) */}
                    <div className='d-none d-sm-block d-md-none'>
                        <CardDeck>
                            {hasLoaded ? (
                                <>
                                {newss.results.slice(0, 1).map((news) => (
                                    <NewsHomePageFeature key={news.id} {...news} setNewss={setNewss} />
                                ))}
                                </>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset spinner />
                                </Container>
                            )}
                        </CardDeck>
                    </div>
                    <div className='text-center mt-4'>
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