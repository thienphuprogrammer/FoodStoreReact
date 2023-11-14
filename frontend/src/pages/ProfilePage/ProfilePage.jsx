import React from "react";
import {useForm} from "react-hook-form";
import {useAuth} from "../../hooks/useAuth.jsx";
import classes from "./profilePage.module.css";
import {Title} from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import {Button} from "../../components/Button/Button.jsx";
import ChangePassword from "../../components/ChangePassword/ChangePassword.jsx";
export default function ProfilePage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const {user, updateProfile} = useAuth();

    const submit = user => {
        updateProfile(user);
    }

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title={"Update Profile"} />
                <form onSubmit={handleSubmit(submit)}>
                <Input
                    defaultValue={user.name}
                    label={"Name"}
                    type={"text"}
                    {
                        ...register("name", {
                            required: true,
                            minLength: 5,
                        })
                    }
                    error={errors.name}
                    />
                <Input
                    defaultValue={user.address}
                    label={"Address"}
                    type={"text"}
                    {
                        ...register("address", {
                            required: true,
                            minLength: 5,
                        })
                    }
                    error={errors.address}
                    />

                <Button type={"submit"} text={"Update"} backgroundColor={"#009e84"}/>
            </form>

                <ChangePassword />
            </div>
        </div>
    );
}