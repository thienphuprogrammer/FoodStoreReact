import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {trackOrderById} from "../../services/orderService.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../components/DateTime/DateTime.jsx";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import {Title} from "../../components/Title/Title.jsx";
import Map from "../../components/Map/Map.jsx";

export default function OrderTrackPage() {
    const {orderId} = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        orderId &&
            trackOrderById(orderId)
                .then((order) => {
                    setOrder(order);
                })
                .catch((error) => {
                    console.log(error);
                });
    }, []);

    if (!orderId) {
        return <NotFound message={"Order not found"} linkText={"Go to Home Page"} />;
    }

    return (
        order && (
            <div className={classes.container}>
                <div className={classes.content}>
                    <h1>Order ${order.id}</h1>
                    <div className={classes.header}>
                    <div>
                        <strong>Date</strong>
                        <DateTime date={order.createdAt} />
                    </div>
                    <div>
                        <strong>Name</strong>
                        {order.name}
                    </div>
                    <div>
                        <strong>Address</strong>
                        {order.address}
                    </div>
                    <div>
                        <strong>State</strong>
                        {order.status}
                    </div>
                    {order.paymentId && (
                        <div>
                            <strong>Payment ID</strong>
                            {order.paymentId}
                        </div>
                    )}
                </div>

                    <OrderItemsList order={order} />
                </div>

                <div>
                    <Title title={"Your Location"} fonsSize={"1.5rem"} />
                    <Map location={order.addressLatLng} readonly={true} />
                </div>

                {
                    order.status === 'NEW' && (
                        <div className={classes.payment}>
                            <Link to={'/payment'}>
                                Go to Payment
                            </Link>
                        </div>
                    )
                }
            </div>
        )
    );
}