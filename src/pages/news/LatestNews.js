import { useEffect } from 'react';
import { useState } from 'react';

import Asset from '../../components/Asset';

import Container from 'react-bootstrap/Container';

import appStyles from "../../App.module.css";

import { axiosReq } from '../../api/axiosDefaults';

import NewsFeature from './NewsFeature';

const LatestNews = () => {
    const [newss, setNewss] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/news/?ordering=-created_at"
                );
                setNewss(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchNews();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, []);

    return (
        <Container>
            {hasLoaded ? (
                <>
                    <h3
                        className={`${appStyles.Headings} mb-4 mt-3`}
                    >
                        Latest <span className={appStyles.GreyBlueHeading}>news</span>
                    </h3>
                    {newss.results.slice(0, 3).map((news) => (
                        <NewsFeature key={news.id} {...news} setNewss={setNewss} />
                    ))}
                </>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </Container>
    );
};

export default LatestNews;