import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

import Asset from "../../components/Asset";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";

import LatestBlogs from "../blogs/LatestBlogs";
import LatestJourneys from "../journeys/LatestJourneys";
import News from "./News";
import PopularProfiles from "../profiles/PopularProfiles";

import NoResults from "../../assets/no-results.png";

import { axiosReq } from "../../api/axiosDefaults";

import { fetchMoreData } from "../../utils/utils";

function NewssPage({ message }) {
    const [newss, setNewss] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await axiosReq.get(`/news/?search=${query}`);
                setNewss(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchNews();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname]);

    return (
        <Container>
            <Row className="h-100 mt-4 align-items-center">
                <Col xs={12} lg={8}>
                    <Form
                        className="py-2 p-0 p-lg-2"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            placeholder="Search news"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {hasLoaded ? (
                        <>
                            {newss.results.length ? (
                                <InfiniteScroll
                                    children={newss.results.map((news) => (
                                        <News key={news.id} {...news} setNewss={setNewss} />
                                    ))}
                                    dataLength={newss.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!newss.next}
                                    next={() => fetchMoreData(newss, setNewss)}
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
                    <LatestJourneys />
                    <LatestBlogs />
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default NewssPage;