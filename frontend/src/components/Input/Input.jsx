import React from "react";
import {InputContainer} from "../InputContainer/InputContainer.jsx";
import classes from "./input.module.css";

function Input(
    { label, type, defaultValue, onChange, onBlur, name, required, errors, ...rest },
    ref
) {
    const getErrorMessage = () => {
        if (!errors) return;
        if (errors.message) return errors.message;
        switch (errors.type) {
            case "required":
                return "This field is required";
            case "minLength":
                return `This field must be at least ${errors.type.minLength} characters`;
            default:
                return "This field is invalid";
        }
    }

    return (
        <InputContainer label={label}>
            <input
                className={classes.input}
                type={type}
                defaultValue={defaultValue}
                placeholder={label}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                ref={ref}
                required={required}
                {...rest}
            />
            {errors && <div className={classes.error}>{getErrorMessage()}</div>}
        </InputContainer>
    );
}

export default React.forwardRef(Input);