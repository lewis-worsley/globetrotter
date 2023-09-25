import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

import Asset from "../../components/Asset";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";

import Journey from "./Journey";
import appStyles from "../../App.module.css";
import journeyStyles from "../../styles/JourneyPages.module.css";

import NoResults from "../../assets/no-results.png";

import { axiosReq } from "../../api/axiosDefaults";

import { fetchMoreData } from "../../utils/utils";

import PopularProfiles from "../profiles/PopularProfiles";
import LatestBlogs from "../blogs/LatestBlogs";
import LatestNews from "../news/LatestNews";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

function JourneysPage({ message }) {
    const [journeys, setJourneys] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const currentUser = useCurrentUser();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const { data } = await axiosReq.get(`/journeys/?search=${query}`);
                setJourneys(data);
                setHasLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchJourneys();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname, currentUser]);

    return (
        <Container>
            <Row className="h-100 mt-4 align-items-center">
                {currentUser &&
                    <Col className="py-2 p-0 p-lg-2 text-center" xs={12} lg={8}>
                        <>
                            <Link to="/journeys/create">
                                <Button
                                    className={
                                        `${journeyStyles.JourneyFormButton} ${appStyles.Button}`
                                    }
                                >
                                    Create journey <i className="fa-solid fa-globe"></i>
                                </Button>
                            </Link>
                        </>
                    </Col>
                }
                <Col xs={12} lg={8}>
                    <Form
                        className="py-2 p-0 p-lg-2 mt-3"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            placeholder="Search journeys"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {hasLoaded ? (
                        <>
                            {journeys.results.length ? (
                                <InfiniteScroll
                                    children={journeys.results.map((journey) => (
                                        <Journey
                                            key={journey.id}
                                            {...journey}
                                            setJourneys={setJourneys}
                                        />
                                    ))}
                                    dataLength={journeys.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!journeys.next}
                                    next={() => fetchMoreData(journeys, setJourneys)}
                                />
                            ) : (
                                <Container>
                                    <Asset src={NoResults} message={message} />
                                </Container>
                            )}
                        </>
                    ) : (
                        <Container>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <LatestBlogs />
                    <LatestNews />
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default JourneysPage;