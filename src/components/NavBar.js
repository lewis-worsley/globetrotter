import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import logo from "../assets/globetrotters-logo.png";
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch(err) {
            console.log(err);
        }
    };

    const loggedInIcons = (
        <>
            <NavLink
                to="/"
            >
                <i className="fas fa-stream"></i>Feed
            </NavLink>

            <NavLink
                to="/news"
            >
                <i className="fa-solid fa-newspaper"></i>News
            </NavLink>

            <NavLink
                to="/blogs"
            >
                <i className="fa-solid fa-blog"></i>Blogs
            </NavLink>

            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar src={currentUser?.profile_image} text="Profile" height={40} /> Profile
            </NavLink>

            <NavLink
                to="/home"
                onClick={handleSignOut}
            >
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink
                to="/home"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
                to="/signin"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
                to="signup"
                activeClassName={styles.Active}
            >
                <Button>
                    <i className="fas fa-user-plus"></i>Sign up
                </Button>
            </NavLink>
        </>
    );

    return (
        <Navbar
            expanded={expanded}
            variant="dark"
            expand="md"
            fixed="top"
            className={styles.NavBar}
        >
            <Container>
                <NavLink to="/home">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    onClick={() => setExpanded(!expanded)}
                    ref={ref} 
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-center">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;