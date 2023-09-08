import { useEffect } from "react";
import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import News from "./News";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import JourneyComment from "../comments/journey_comments/JourneyComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import { Button } from "react-bootstrap";

function NewsPage() {
    const { id } = useParams();
    const [news, setNews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: news }] = await Promise.all([
                    axiosReq.get(`/news/${id}`),
                ]);
                setNews({ results: [news] });
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2">
                <News {...news.results[0]} setNews={setNews} NewsPage />
            </Col>
        </Row>
    );
}

export default NewsPage;