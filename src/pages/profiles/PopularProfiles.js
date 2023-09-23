import React from 'react';

import Asset from '../../components/Asset';

import Container from 'react-bootstrap/Container';

import appStyles from "../../App.module.css";

import Profile from './Profile';

import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfiles = () => {
    const { popularProfiles } = useProfileData();

    return (
        <Container>
            {popularProfiles.results.length ? (
                <>
                    <h3 className={`${appStyles.Headings} mb-4`}>
                        Suggestions to <span className={appStyles.TealHeading}>follow</span>
                    </h3>
                    {popularProfiles.results.slice(0, 5).map((profile) => (
                        <Profile key={profile.id} profile={profile} />
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;