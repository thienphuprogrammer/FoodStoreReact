import React from "react";
import classes from "./tags.module.css";
import {Link} from "react-router-dom";

const Tags = ({ tags, forFoodPage }) => {
    return (
        <div className={classes.container}
             style={{
                 justifyContent: forFoodPage ? "start" : "center",
             }}
        >
            {tags.map((tag) => (
                <Link to={`/tag/${tag.name}`} key={tag.name}>
                    {tag.name}
                    {!forFoodPage && <span className={classes.count}>{tag.count}</span>}
                </Link>
            ))}
        </div>
    );
}

export default Tags;