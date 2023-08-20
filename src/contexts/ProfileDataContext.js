import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";

const ProfileDataContext = createContext();

export const useProfileData = useContext(ProfileDataContext);
export const useSetProfileData = useContext(setProfileDataContext);

export const ProfileDataContext = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
    });

    const currentUser = useCurrentUser();

    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        }
    } catch (err) {
        console.log(err);
    }

    return (
        <ProfileDataContext.Provider value={profileData} >
            <setProfileDataContext.Provider value={setProfileData}>
                {children}
            </setProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    )
}