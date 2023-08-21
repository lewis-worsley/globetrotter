import { useEffect } from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css"
import Asset from '../../components/Asset';
import Profile from './Profile';
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfiles = () => {
    const [profileData, setProfileData] = useState({
        popularProfiles: { results: [] },
    });
    const { popularProfiles } = useProfileData();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }))
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [currentUser]);

    return (
        <Container className={`${appStyles.Content}`}>
            {popularProfiles.results.length ? (
                <>
                    <h3>Suggestions to follow</h3>
                    {popularProfiles.results.slice(0, 5).map((profile) => (
                        <Profile key={profile.id} profile={profile} />
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    )
}

export default PopularProfiles;