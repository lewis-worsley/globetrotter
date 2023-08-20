import { useEffect } from "react";
import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Journey from "./Journey";

import JourneyCommentCreateForm from "../../comments/journey_comments/JourneyCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import JourneyComment from "../../comments/journey_comments/JourneyComment";

function JourneyPage() {
    const { id } = useParams();
    const [journey, setJourney] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [journeyComments, setJourneyComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: journey }, {data: journeyComments}] = await Promise.all([
                    axiosReq.get(`/journeys/${id}`),
                    axiosReq.get(`/journeys/comments/?journey=${id}`),
                ])
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
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Journey {...journey.results[0]} setJourney={setJourney} journeyPage />
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
                        journeyComments.results.map((journeyComments) => (
                            <JourneyComment key={journeyComments} {...journeyComments} />
                        ))
                    ) : currentUser ? (
                        <p>Here we go</p>
                    ) : (
                        <p>No comments yet</p>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <h3>Latest blogs</h3>
            </Col>
        </Row>
    );
};

export default JourneyPage;