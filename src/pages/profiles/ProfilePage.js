import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Journey from "../journeys/Journey";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileJourneys, setProfileJourneys] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profileJourneys }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/journeys/?owner__profile=${id}`)
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfileJourneys(profileJourneys);
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
            <hr />
            <p className="text-center">{profile?.owner}'s journeys</p>
            <hr />
            {profileJourneys.results.length ? (
                <InfiniteScroll 
                    children={profileJourneys.results.map((journey) => (
                        <Journey key={journey.id} {...journey} setJourneys={setProfileJourneys} />
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

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfileJourneys}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;