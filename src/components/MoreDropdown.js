import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import dropdownStyles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router-dom";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className={`${dropdownStyles.ThreeDotsColour} fas fa-ellipsis`}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={dropdownStyles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className={`${dropdownStyles.IconColour} fas fa-edit`} />
                </Dropdown.Item>
                <Dropdown.Item
                    className={dropdownStyles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className={`${dropdownStyles.IconColour} fas fa-trash-alt`} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const ProfileEditDropdown = ({ id }) => {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${dropdownStyles.Absolute}`} drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className={`${dropdownStyles.IconColour} fas fa-edit`} /> Edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className={`${dropdownStyles.IconColour} far fa-id-card`} />
                    Change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className={`${dropdownStyles.IconColour} fas fa-key`} />
                    Change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};