import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";

import UniqueNewsPage from "./UniqueNewsPage";
import NotFound from "../../components/NotFound";

function NewsPage() {
    const { id } = useParams();
    const [news, setNews] = useState({ results: [] });
    const [newsError, setNewsError] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: news }] = await Promise.all([
                    axiosReq.get(`/news/${id}`),
                ]);
                setNews({ results: [news] });
            } catch (err) {
                setNewsError(true);
                console.error(err);
            }
        };

        handleMount();
    }, [id]);

    if (newsError) {
        return <NotFound />
    }

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