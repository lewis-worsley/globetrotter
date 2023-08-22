import { useEffect } from "react";
import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Blog from "./Blog";

import { useCurrentUser } from "../../contexts/CurrentUserContext";


function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [blogComments, setBlogComment] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: blog }, { data: blogComments }] = await Promise.all([
                    axiosReq.get(`/blogs/${id}`),
                    axiosReq.get(`/blogs/comments/?blog=${id}`),
                ]);
                setBlog({ results: [blog] });
                setBlogComment(blogComments);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <Blog {...blog.results[0]} setBlog={setBlog} BlogPage />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        "blog comments goes here"
                    ) : blogComments.results.length ? (
                        "Comments"
                    ) : null}
                    {blogComments.results.length ? (
                        "hello"
                    ) : currentUser ? (
                        <p>No comments yet, be the first to comment!</p>
                    ) : (
                        <p>No comments yet....</p>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default BlogPage;