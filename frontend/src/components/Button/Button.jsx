import classes from "./button.module.css";

export const Button = ({
    type,
    text,
    onClick,
    color,
    backgroundColor,
    fontSize,
    width,
    height,
}) => {
    return (
        <div className={classes.container}>
            <button
                type={type}
                onClick={onClick}
                style={{
                    color: color,
                    backgroundColor: backgroundColor,
                    fontSize: fontSize,
                    width: width,
                    height: height,
                }}
            >
                {text}
            </button>
        </div>
    );
}

Button.defaultProps = {
    type: "button",
    text: "Submit",
    color: "white",
    backgroundColor: "#e72929",
    fontSize: "1.3rem",
    width: "12rem",
    height: "3.5rem",
}