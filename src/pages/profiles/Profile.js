import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";

import Button from "react-bootstrap/Button";

import appStyles from "../../App.module.css";
import profileStyles from "../../styles/Profile.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
    const { profile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className="my-3 d-flex align-items-center">
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${profileStyles.WordBreak}`}>
                <strong>{owner}</strong>
            </div>
            <div className="text-right ml-auto">
                {currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            onClick={() => handleUnfollow(profile)}
                            className={
                                `${appStyles.FollowButton} ${appStyles.InverseButton} px-3 pt-4`
                            }
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleFollow(profile)}
                            className={`${appStyles.FollowButton} ${appStyles.Button} px-3`}
                        >
                            Follow
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default Profile;