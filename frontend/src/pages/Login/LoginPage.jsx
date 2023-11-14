import React, {useEffect} from "react";
import classes from "./loginPage.module.css";
import {useForm} from "react-hook-form";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";
import {Title} from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import {Button} from "../../components/Button/Button.jsx";

export default function LoginPage() {
    const {
        handleSubmit ,
        register,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();
    const {user, login} = useAuth();
    const [params] = useSearchParams();
    const returnURL = params.get("returnUrl") || "";
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
                <Title title="Login" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type={"email"}
                        label={"Email"}
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        errors={
                            errors.email && {
                                type: errors.email.type,
                                message: errors.email.message,
                            }
                        }
                    />

                    <Input
                        type={"password"}
                        label={"Password"}
                        {...register("password", {
                            required: true,
                            minLength: 6,
                        })}
                        errors={errors.password
                            && {
                                type: errors.password.type,
                                minLength: errors.password.minLength,
                            }
                        }
                    />

                    <Button type={"submit"} text={"Login"} />

                    <div className={classes.register}>
                        New user? &nbsp;
                        <Link to={`/register${returnURL ? `?returnUrl=${returnURL}` : ""}`}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}