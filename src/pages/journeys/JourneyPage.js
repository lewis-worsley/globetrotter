import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import Asset from "../../components/Asset";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";

import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import JourneyCommentCreateForm
    from "../comments/journey_comments/JourneyCommentCreateForm";
import JourneyComment from "../comments/journey_comments/JourneyComment";
import UniqueJourneyPage from "./UniqueJourneyPage";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { fetchMoreData } from "../../utils/utils";

function JourneyPage() {
    const { id } = useParams();
    const [journey, setJourney] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [journeyComments, setJourneyComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: journey }, { data: journeyComments }] = await Promise.all([
                    axiosReq.get(`/journeys/${id}`),
                    axiosReq.get(`/journeys/comments/?journey=${id}`),
                ]);
                setJourney({ results: [journey] });
                setJourneyComments(journeyComments);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <UniqueJourneyPage
                    {...journey.results[0]}
                    setJourney={setJourney}
                    journeyPage
                />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <JourneyCommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            journey={id}
                            setJourney={setJourney}
                            setJourneyComments={setJourneyComments}
                        />
                    ) : journeyComments.results.length ? (
                        "Comments"
                    ) : null}
                    {journeyComments.results.length ? (
                        <InfiniteScroll
                            children={journeyComments.results.map((journeyComment) => (
                                <JourneyComment
                                    key={journeyComment.id}
                                    {...journeyComment}
                                    setJourney={setJourney}
                                    setJourneyComments={setJourneyComments}
                                />
                            ))}
                            dataLength={journeyComments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!journeyComments.next}
                            next={() => fetchMoreData(journeyComments, setJourneyComments)}
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