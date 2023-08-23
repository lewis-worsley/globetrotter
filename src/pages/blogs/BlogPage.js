import { useEffect } from "react";
import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Blog from "./Blog";

import BlogCommentCreateForm from "../comments/blog_comments/BlogCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import BlogComment from "../comments/blog_comments/BlogComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [blogComments, setBlogComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: blog }, { data: blogComments }] = await Promise.all([
                    axiosReq.get(`/blogs/${id}`),
                    axiosReq.get(`/blogs/comments/?blogs=${id}`),
                ]);
                setBlog({ results: [blog] });
                setBlogComments(blogComments);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <Blog {...blog.results[0]} setBlog={setBlog} blogPage />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <BlogCommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            blog={id}
                            setBlog={setBlog}
                            setBlogComments={setBlogComments}
                        />
                    ) : blogComments.results.length ? (
                        "Comments"
                    ) : null}
                    {blogComments.results.length ? (
                        <InfiniteScroll
                            children={blogComments.results.map((blogComment) => (
                                <BlogComment
                                    key={blogComment.id}
                                    {...blogComment}
                                    setBlog={setBlog}
                                    setBlogComments={setBlogComments}
                                />
                            ))}
                            dataLength={blogComments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!blogComments.next}
                            next={() => fetchMoreData(blogComments, setBlogComments)}
                        />
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