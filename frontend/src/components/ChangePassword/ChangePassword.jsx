import React from "react";
import {useForm} from "react-hook-form";
import classes from "./changePassword.module.css";
import {Title} from "../Title/Title.jsx";
import Input from "../Input/Input.jsx";
import {Button} from "../Button/Button.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";

export default function ChangePassword() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const {changePassword} = useAuth();
    const submit = passwords => {
        changePassword(passwords);
    }
    return (
        <div className={classes.container}>
            <Title title={"Change Password"} />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    type={"password"}
                    label={"Current Password"}
                    {
                        ...register("currentPassword", {
                            required: true,
                            minLength: 5,
                        })
                    }
                    error={errors.currentPassword}
                    />
                <Input
                    type={"password"}
                    label={"New Password"}
                    {
                        ...register("newPassword", {
                            required: true,
                            minLength: 5,
                        })
                    }
                    error={errors.newPassword}
                    />
                <Input
                    type={"password"}
                    label={"Confirm Password"}
                    {
                        ...register("confirmPassword", {
                            required: true,
                            validate: value =>
                                value !== getValues("newPassword")
                                    ? "The passwords do not match"
                                    : true,
                        })
                    }
                    error={errors.confirmPassword}
                />

                <Button type={"submit"} text={"Change Password"}/>
            </form>
        </div>
    );
}