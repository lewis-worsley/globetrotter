import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/MoreDropdown.module.css';
import { useHistory } from "react-router-dom";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className={`${styles.ThreeDotsColour} fas fa-ellipsis`}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropdownFollow = ({ handleFollow, handleUnfollow }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleFollow}
                    aria-label="follow"
                >
                    <i className={`${styles.IconColour} fas fa-edit`} />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleUnfollow}
                    aria-label="unfollow"
                >
                    <i className={`${styles.IconColour} fas fa-trash-alt`} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className={`${styles.IconColour} fas fa-edit`} />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className={`${styles.IconColour} fas fa-trash-alt`} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const ProfileEditDropdown = ({ id }) => {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className={`${styles.IconColour} fas fa-edit`} /> Edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className={`${styles.IconColour} far fa-id-card`} />
                    Change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className={`${styles.IconColour} fas fa-key`} />
                    Change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};