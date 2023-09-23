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
import InfiniteScroll from "react-infinite-scroll-component";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import blogStyles from "../../styles/BlogPages.module.css";

import Blog from "./Blog";
import PopularProfiles from "../profiles/PopularProfiles";
import LatestJourneys from "../journeys/LatestJourneys";
import LatestNews from "../news/LatestNews";

import NoResults from "../../assets/no-results.png";

import { axiosReq } from "../../api/axiosDefaults";

import { fetchMoreData } from "../../utils/utils";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

function BlogsPage({ message }) {
    const [blogs, setBlogs] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const currentUser = useCurrentUser();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axiosReq.get(`/blogs/?search=${query}`);
                setBlogs(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname]);

    return (
        <Container>
            <Row className="h-100 mt-4 align-items-center">
                {currentUser &&
                    <Col className="py-2 p-0 p-lg-2 text-center" xs={12} lg={8}>
                        <>
                            <Link to="/blogs/create">
                                <Button
                                    className={`${blogStyles.BlogFormButton} ${appStyles.Button}`}
                                >
                                    Create blog <i className="fa-solid fa-blog"></i>
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
                            placeholder="Search blogs"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {hasLoaded ? (
                        <>
                            {blogs.results.length ? (
                                <InfiniteScroll
                                    children={blogs.results.map((blog) => (
                                        <Blog key={blog.id} {...blog} setBlogs={setBlogs} />
                                    ))}
                                    dataLength={blogs.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!blogs.next}
                                    next={() => fetchMoreData(blogs, setBlogs)}
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
                    <LatestNews />
                    <PopularProfiles />
                </Col>
            </Row>
        </Container>
    );
};

export default BlogsPage;