import React from "react";
import classes from "./starRating.module.css";
const StarRating = ({ stars, size }) => {
    const styles = {
        fontSize: size + "px",
        height: size + "px",
        marginRight: size / 6 + "px",
    };

    function Star ({number}) {
        const halfStar = number - 0.5;

        return stars >= number ? (
            <img src="/star-full.svg" alt={number} style={styles} />
        ) : stars >= halfStar ? (
            <img src="/star-half.svg" alt={number} style={styles} />
        ) : (
            <img src="/star-empty.svg" alt={number} style={styles} />
        );
    }

    return (
        <div className={classes.rating}>
            {
                [1, 2, 3, 4, 5].map((number) => {
                    return <Star key={number} number={number} />;
                })
            }
        </div>
    );
}

StarRating.defaultProps = {
    size: 10,
}

export default StarRating;