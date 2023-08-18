import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Journey from "./Journey";

function JourneyPage() {
    const {id} = useParams();
    const [journey, setJourney] = useState({results: []});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: journey }] = await Promise.all([
                    axiosReq.get(`/journeys/${id}`),
                ])
                setJourney({results: [journey]})
                console.log(journey)
            } catch(err) {
                console.log(err)
            }
        };
        handleMount();
    }, [id])

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Journey {...journey.results[0]} setJourney={setJourney} />
                <Container className={appStyles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <h3>Latest blogs</h3>
            </Col>
        </Row>
    );
}

export default JourneyPage;