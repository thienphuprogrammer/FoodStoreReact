import React, {useEffect} from "react";
import classes from "./LoginPage.module.css";
import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";
import {Title} from "../../components/Title/Title.jsx";

export default function LoginPage() {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();
    const {user, login} = useAuth();
    const {params} = useSearchParams();
    const returnURL = params.get("returnURL") || "/";

    useEffect(() => {
        if (!user) return;
        returnURL ? navigate(returnURL) : navigate("/");
    }, [user]);

    const submit = async ({email, password}) => {
        try {
            await login(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title>Login</Title>
            </div>
        </div>
    )
}