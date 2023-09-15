import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Card, CardDeck, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Journey from "../journeys/Journey";
import Blog from "../blogs/Blog";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import Tabs from 'react-bootstrap/Tabs';
import Tab from "react-bootstrap/Tab";
import BlogProfilePageFeature from "../blogs/BlogProfilePageFeature";
import JourneyProfilePageFeature from "../journeys/JourneyProfilePageFeature";
import { useRedirect } from "../../hooks/useRedirect";



function ProfilePage() {
    useRedirect("loggedOut")

    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileJourneys, setProfileJourneys] = useState({ results: [] });
    const [profileBlogs, setProfileBlogs] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    // Controls the tab view
    const [key, setKey] = useState('journey')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profileJourneys }, { data: profileBlogs }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/journeys/?owner__profile=${id}`),
                        axiosReq.get(`/blogs/?owner__profile=${id}`)
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfileJourneys(profileJourneys);
                setProfileBlogs(profileBlogs);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.journeys_count}</div>
                            <div>Journeys</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>Followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Row className="justify-content-center no-gutters">
                        <Col className="my-2">
                            <div>{profile?.based}</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className="btn"
                                onClick={() => handleUnfollow(profile)}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                className="btn"
                                onClick={() => handleFollow(profile)}
                            >
                                Follow
                            </Button>
                        ))
                    }
                </Col>
                <Col xs={12} className="mt-4">{profile?.content}</Col>
            </Row>
        </>
    );

    const mainProfileJourneys = (
        <>
            {profileJourneys.results.length ? (
                <InfiniteScroll
                    children={profileJourneys.results.map((journey) => (
                        <JourneyProfilePageFeature key={journey.id} {...journey} setJourneys={setProfileJourneys} />
                    ))}
                    dataLength={profileJourneys.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileJourneys.next}
                    next={() => fetchMoreData(profileJourneys, setProfileJourneys)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted a journey yet`}
                />
            )}
        </>
    );

    const mainProfileBlogs = (
        <>
            <div>
                {profileBlogs.results.length ? (
                    <InfiniteScroll
                        children={profileBlogs.results.map((blog) => (
                            <BlogProfilePageFeature key={blog.id} {...blog} setBlogs={setProfileBlogs} />
                        ))}
                        dataLength={profileBlogs.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!profileBlogs.next}
                        next={() => fetchMoreData(profileBlogs, setProfileBlogs)}
                    />
                ) : (
                    <Asset
                        src={NoResults}
                        message={`No results found, ${profile?.owner} hasn't posted a blog yet`}
                    />
                )}
            </div>
        </>
    );

    function ControlledTabs() {
        return (
            <Row>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="journey" title="Journeys">
                        {mainProfileJourneys}
                    </Tab>
                    <Tab eventKey="blog" title="Blogs">
                        {mainProfileBlogs}
                    </Tab>
                </Tabs>
            </Row>
        );
    }

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={12}>
                <Container>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            <ControlledTabs />
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default ProfilePage;