import { useEffect } from 'react';
import { useState } from 'react';

import Asset from '../../components/Asset';

import Container from 'react-bootstrap/Container';

import appStyles from "../../App.module.css";

import BlogFeature from './BlogFeature,';

import { axiosReq } from '../../api/axiosDefaults';

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/blogs/?ordering=-created_at"
                );
                setBlogs(data);
                setHasLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [])

    return (
        <Container>
            {hasLoaded ? (
                <>
                    <h3
                        className={`${appStyles.Headings} mb-4 mt-3`}
                    >
                        Latest <span className={appStyles.BlueHeading}>blogs</span>
                    </h3>
                    {blogs.results.slice(0, 3).map((blog) => (
                        <BlogFeature key={blog.id} {...blog} setBlogs={setBlogs} />
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

export default LatestBlogs;