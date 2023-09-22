import React from "react";
import avatarStyles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45 }) => {
    return (
        <span>
            <img
                className={avatarStyles.Avatar}
                src={src}
                height={height}
                width={height}
                alt='profile avatar'
            />
        </span>
    );
};

export default Avatar;