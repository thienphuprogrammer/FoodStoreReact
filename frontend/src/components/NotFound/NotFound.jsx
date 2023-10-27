import React from "react";
import classes from "./notFound.module.css";
import {Link} from "react-router-dom";

const NotFound = ({message, linkRoute, linkText}) => {
    return (
        <div className={classes.container}>
            {message && <span className={classes.message}>{message}</span>}
            <Link to={linkRoute} className={classes.link}>{linkText}</Link>
        </div>
    );
}

NotFound.defaultProps = {
    message: "Nothing found",
    linkRoute: "/",
    linkText: "Go to home page"
}

export default NotFound;