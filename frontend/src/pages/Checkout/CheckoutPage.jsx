import React from "react";
import {useCart} from "../../hooks/useCart.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {createOrder} from "../../services/orderService.jsx";
import classes from "./CheckoutPage.module.css";
import {Title} from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import {Button} from "../../components/Button/Button.jsx";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import Map from "../../components/Map/Map.jsx";
export default function CheckoutPage() {
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = React.useState({...cart});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        if (!order.addressLatLng) {
            toast('Please choose your address on the map');
            return;
        }

        await createOrder({
            ...order,
            name: data.name,
            address: data.address,
        });
        navigate('/payment');
    }

    return (
        <>
            <form
                className={classes.container}
                onSubmit={handleSubmit(submit)}
            >
                <div className={classes.content}>
                    <Title title="Order From" fonsSize="1.5rem" />
                    <div className={classes.inputs}>
                        <Input
                            defaultValue={user.name}
                            label="Name"
                            {
                                ...register('name', {
                                    required: 'Name is required',
                                })
                            }
                            error={errors.name}
                        />
                        <Input
                            defaultValue={user.address}
                            label="Address"
                            {
                                ...register('address', {
                                    required: 'Address is required',
                                })
                            }
                            error={errors.address}
                        />
                    </div>
                    <OrderItemsList order={order} />
                </div>
                <div>
                    <Title title="Choose Your Location" fonsSize="1.5rem" />
                    <Map
                        location={order.addressLatLng}
                        onChange={latlng => {
                            setOrder({
                                ...order,
                                addressLatLng: latlng,
                            })
                        }}
                    />
                </div>
                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            text="Go to Payment"
                            Width="100%"
                            Height="3rem"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}