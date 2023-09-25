import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import Asset from "../../components/Asset";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";

import { axiosReq } from "../../api/axiosDefaults";

import JourneyComment from "../comments/journey_comments/JourneyComment";
import JourneyCommentCreateForm
    from "../comments/journey_comments/JourneyCommentCreateForm";
import UniqueJourneyPage from "./UniqueJourneyPage";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { fetchMoreData } from "../../utils/utils";

import NotFound from "../../components/NotFound";

function JourneyPage() {
    const { id } = useParams();
    const [journey, setJourney] = useState({ results: [] });
    const [journeyError, setJourneyError] = useState(false);

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: journey }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/journeys/${id}`),
                    axiosReq.get(`/journeys/comments/?journey=${id}`),
                ]);
                setJourney({ results: [journey] });
                setComments(comments);
            } catch (err) {
                setJourneyError(true);
                console.error(err)
            }
        };

        handleMount();
    }, [id]);

    if (journeyError) {
        return <NotFound />
    }

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <UniqueJourneyPage
                    {...journey.results[0]}
                    setJourney={setJourney}
                    journeyPage
                />
                <Container>
                    {currentUser ? (
                        <JourneyCommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            journey={id}
                            setJourney={setJourney}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={comments.results.map((comment) => (
                                <JourneyComment
                                    key={comment.id}
                                    {...comment}
                                    setJourney={setJourney}
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
};

export default JourneyPage;