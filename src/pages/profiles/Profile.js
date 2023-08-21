import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";

const Profile = (props) => {
    const { profile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div
            className={"my-3 d-flex align-items-center"}
        >
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>{owner}</strong>
            </div>
            <div className={"text-right ml-auto"}>
                {currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            onClick={() => { }}
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            onClick={() => { }}
                        >
                            Follow
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default Profile;