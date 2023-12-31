import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";

import { axiosReq } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Asset from "../../components/Asset";

import { fetchMoreData } from "../../utils/utils";

import BlogComment from "../comments/blog_comments/BlogComment";
import BlogCommentCreateForm 
    from "../comments/blog_comments/BlogCommentCreateForm";
import UniqueBlogPage from "./UniqueBlogPage";

import NotFound from "../../components/NotFound";

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState({ results: [] });
    const [blogError, setBlogError] = useState(false);

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: blog }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/blogs/${id}`),
                    axiosReq.get(`/blogs/comments/?blog=${id}`),
                ]);
                setBlog({ results: [blog] });
                setComments(comments);
            } catch (err) {
                setBlogError(true);
                console.error(err);
            }
        };

        handleMount();
    }, [id]);

    if (blogError) {
        return <NotFound />
    }

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <UniqueBlogPage {...blog.results[0]} setBlog={setBlog} blogPage />
                <Container>
                    {currentUser ? (
                        <BlogCommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            blog={id}
                            setBlog={setBlog}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={comments.results.map((comment) => (
                                <BlogComment
                                    key={comment.id}
                                    {...comment}
                                    setBlog={setBlog}
                                    setComments={setComments}
                                />
                            ))}
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
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