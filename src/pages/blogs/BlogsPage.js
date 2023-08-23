import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Blog from "./Blog";
import appStyles from "../../App.module.css";

import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import BlogCreateForm from "./BlogCreateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function BlogsPage({ message }) {
    const [blogs, setBlogs] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    // handle modal appearance
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axiosReq.get(`/blogs/?search=${query}`);
                setBlogs(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname])

    function CreateBlogModal(props) {

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BlogCreateForm />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div>
            <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" xs={8}>
                    <>
                        <Button variant="primary" onClick={handleShow}>
                            Create blog <i className="fa-solid fa-globe"></i>
                        </Button>

                        <CreateBlogModal
                            show={setShow}
                            onHide={() => setShow(false)}
                        />
                    </>
                </Col>
                <Col xs={4}>
                    <Form className="py-2 p-0 p-lg-2" onSubmit={(event) => event.preventDefault()}>
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

export default BlogsPage;