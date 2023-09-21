import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import profileStyles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Card, CardColumns, CardDeck, Image } from "react-bootstrap";
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
import JourneyHomePageFeature from "../journeys/JourneyHomePageFeature";


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
            <Row noGutters className="mb-5 align-items-center text-lg-left text-center">
                <Col lg={3}>
                    <Image
                        className={profileStyles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={9} className="px-4">
                    <div className="align-items-center">
                        <h3 className={`${appStyles.Headings} ${appStyles.GreenHeading} my-3`}>{profile?.owner}</h3>
                        {currentUser &&
                            !is_owner &&
                            (profile?.following_id ? (
                                <Button
                                    className={`${appStyles.FollowButton} ${appStyles.InverseButton} ml-5 pt-3`}
                                    onClick={() => handleUnfollow(profile)}
                                >
                                    Unfollow
                                </Button>
                            ) : (
                                <Button
                                    className={`${appStyles.Button} ${appStyles.FollowButton} ml-5`}
                                    onClick={() => handleFollow(profile)}
                                >
                                    Follow
                                </Button>
                            ))
                        }
                        {profile?.content}
                        <div className="my-2 "><span className={`${appStyles.Headings} mr-1`}>Country: </span>{profile?.based}</div>

                        <Row className="no-gutters">
                            <Col xs={6} lg={4} className="my-2">
                                <span className={appStyles.Headings}>Journeys: </span><strong className="ml-1">{profile?.journeys_count}</strong>
                            </Col>
                            <Col xs={6} lg={4} className="my-2">
                                <span className={appStyles.Headings}>Blogs: </span><strong className="ml-1">{profile?.blogs_count}</strong>
                            </Col>
                        </Row>
                        <Row className="no-gutters">
                            <Col xs={6} lg={4} className="my-2">
                                <span className={appStyles.Headings}>Followers: </span><strong className="ml-1">{profile?.followers_count}</strong>
                            </Col>
                            <Col xs={6} lg={4} className="my-2">
                                <span className={appStyles.Headings}>Following: </span><strong className="ml-1">{profile?.following_count}</strong>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );

    const mainProfileJourneys = (
        <>
            <CardDeck className={appStyles.TabBackgroundColor}>
                {hasLoaded ? (
                    <>
                        {profileJourneys.results.map((journey) => (
                            <JourneyProfilePageFeature key={journey.id} {...journey} setProfileJourneys={setProfileJourneys} />
                        ))}                        
                    </>
                ) : (
                        <Asset 
                            spinner
                            src={NoResults}
                            message={`No results found, ${profile?.owner} hasn't posted a journey yet`}
                            />
                )}
            </CardDeck>
        </>
    );

    const mainProfileBlogs = (
        <>
            <CardDeck className={appStyles.TabBackgroundColor}>
                {hasLoaded ? (
                    <>
                        {profileBlogs.results.map((blog) => (
                            <BlogProfilePageFeature key={blog.id} {...blog} setProfileBlogs={setProfileBlogs} />
                        ))}
                        
                    </>
                ) : (
                        <Asset 
                            spinner
                            src={NoResults}
                            message={`No results found, ${profile?.owner} hasn't posted a blog yet`}
                            />
                )}
            </CardDeck>
        </>
    );

    function ControlledTabs() {
        return (
            <Row className="justify-content-center justify-content-lg-start">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className={`${appStyles.Headings} ${appStyles.TabsNavBar}`}
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
        <Row className="mt-4">
            <Col className="p-0 mt-4 mt-md-3">
                <Container>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            <Container>
                                <ControlledTabs />
                            </Container>
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