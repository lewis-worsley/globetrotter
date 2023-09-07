import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import News from "./News";
import appStyles from "../../App.module.css";

import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

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
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchNews();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname])

    return (
        <div>
            <Row className="h-100">
                <Col xs={12}>
                    <Form className="py-2 p-0 p-lg-2" onSubmit={(event) => event.preventDefault()}>
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
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                            )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset spinner />
                        </Container>
                    )}
                </Col>
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <PopularProfiles />
                </Col>
            </Row>
        </div>
    );
}

export default NewssPage;