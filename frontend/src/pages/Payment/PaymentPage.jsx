import React, {useEffect, useState} from "react";
import classes from "./paymentPage.module.css";
import {getNewOrderForCurrentUser} from "../../services/orderService.jsx";
import {Title} from "../../components/Title/Title.jsx";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import Map from "../../components/Map/Map.jsx";
import PaypalButtons from "../../components/PaypalButtons/PaypalButtons.jsx";

export default function PaymentPage() {
    const [order, setOrder] = useState();

    useEffect(() => {
        getNewOrderForCurrentUser()
            .then(data => {
                setOrder(data);
            });
    }, []);

    if (!order) {
        return;
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={"Order form"} fonsSize={"1.5rem"}/>
                <div className={classes.summary}>
                    <div>
                        <h3>Name:</h3>
                        <span>{order.name}</span>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <span>{order.address}</span>
                    </div>
                </div>
                <OrderItemsList order={order}/>
            </div>
            <div className={classes.map}>
                <Title title={"Your Location"} fonsSize={"1.5rem"}/>
                <Map readonly={true} location={order.addressLatLng}/>
            </div>

            <div className={classes.buttons_container}>
                <div className={classes.buttons}>
                    <PaypalButtons order={order}/>
                </div>
            </div>
        </div>
    );
}