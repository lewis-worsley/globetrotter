import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Journey from "./Journey";
import appStyles from "../../App.module.css";
import journeyStyles from "../../styles/JourneyPages.module.css"


import NoResults from "../../assets/no-results.png";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import JourneyCreateForm from "./JourneyCreateForm"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function JourneysPage({ message }) {
    const [journeys, setJourneys] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    // handle modal appearance
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const { data } = await axiosReq.get(`/journeys/?search=${query}`);
                setJourneys(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchJourneys();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [query, pathname])

    function CreateJourneyModal(props) {

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
                        Create journey
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JourneyCreateForm />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div>
            <Row className="h-100 mt-4">
                <Col className="py-2 p-0 p-lg-2 text-center" xs={12} sm={8}>
                    <>
                        <Button 
                        onClick={handleShow}
                        className={`${journeyStyles.JourneyFormButton} ${appStyles.Button}`}
                        >
                            Create journey <i className="fa-solid fa-globe"></i>
                        </Button>

                        <CreateJourneyModal
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
                            placeholder="Search journeys"
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {hasLoaded ? (
                        <>
                            {journeys.results.length ? (
                                <InfiniteScroll
                                    children={journeys.results.map((journey) => (
                                        <Journey key={journey.id} {...journey} setJourneys={setJourneys} />
                                    ))}
                                    dataLength={journeys.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!journeys.next}
                                    next={() => fetchMoreData(journeys, setJourneys)}
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

export default JourneysPage;