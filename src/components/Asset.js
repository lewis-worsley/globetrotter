import React from "react";
import { Spinner } from "react-bootstrap";
import assetStyles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
    return (
        <div className={`${assetStyles.Asset} p-4`}>
            {spinner && <Spinner animation="border" />}
            {src && <img src={src} alt={message} />}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Asset;