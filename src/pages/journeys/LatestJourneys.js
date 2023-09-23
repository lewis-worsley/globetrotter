import { useEffect } from 'react';
import { useState } from 'react';

import Asset from '../../components/Asset';

import Container from 'react-bootstrap/Container';

import appStyles from "../../App.module.css";

import JourneyFeature from './JourneyFeature';

import { axiosReq } from '../../api/axiosDefaults';

const LatestJourneys = () => {
    const [journeys, setJourneys] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/journeys/?ordering=-created_at"
                );
                setJourneys(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchJourneys();
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
                        Latest <span className={appStyles.GreenHeading}>journeys</span>
                    </h3>
                    {journeys.results.slice(0, 3).map((journey) => (
                        <JourneyFeature
                            key={journey.id}
                            {...journey}
                            setJourneys={setJourneys}
                        />
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

export default LatestJourneys;