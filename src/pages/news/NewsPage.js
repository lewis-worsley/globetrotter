import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";

import UniqueNewsPage from "./UniqueNewsPage";

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
                <UniqueNewsPage
                    {...news.results[0]}
                    setNews={setNews}
                    NewsPage
                />
            </Col>
        </Row>
    );
};

export default NewsPage;