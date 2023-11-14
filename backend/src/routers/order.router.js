import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";
import {BAD_REQUEST, UNAUTHORIZED} from "../constants/httpStatus.js";
import {OrderModel} from "../models/order.model.js";
import {OrderStatus} from "../constants/orderStatus.js";
import {UserModel} from "../models/user.model.js";

const router = Router();
router.use(auth);

router.post(
    '/create',
    handler(async (req, res) => {
        const order = req.body;
        if (order.items.length <= 0) {
            res.status(BAD_REQUEST).send({message: "No items in order"})
        }

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW,
        });

        const newOrder = new OrderModel({
            ...order,
            user: req.user.id,
        });
        await newOrder.save();
        res.send(newOrder);
    })
);

router.put(
    '/pay',
    handler(async (req, res) => {
        const {paymentId} = req.body;
        const order = await getNewOrderForCurrentUser(req);
        if (!order) {
            res.status(BAD_REQUEST).send({message: "No new order for current user"})
        }

        order.status = OrderStatus.PAYED;
        order.paymentId = paymentId;
        await order.save();
        res.send(order._id);
    })
);

router.get(
    '/track/:orderId',
    handler(async (req, res) => {
        const {orderId} = req.params;
        const user = await UserModel.findById(req.user.id);

        const filter = {
            _id: orderId,
        }
        if (!user.isAdmin) {
            filter.user = user._id;
        }

        const order = await OrderModel.findOne(filter);

        if (!order) {
            return res.send(UNAUTHORIZED);
        }

        return res.send(order);
    })
);

router.get(
    '/newOrderForCurrentUser',
    handler(async (req, res) => {
        const order = await getNewOrderForCurrentUser(req);
        if (!order) {
            res.status(BAD_REQUEST).send({message: "No new order for current user"})
        }
        else {
            res.send(order);
        }
    })
);

router.get(
    '/all-status',
    handler(async (req, res) => {
        const allStatus = Object.values(OrderStatus);
        res.send(allStatus);
    })
)

router.get(
    '/:status?',
    handler(async (req, res) => {
        const status = req.params.status;
        const user = await UserModel.findById(req.user.id);
        const filter = {};

        if (!user.isAdmin) {
            filter.user = user._id;
        }
        if (status) {
            filter.status = status;
        }

        const orders = await OrderModel.find(filter).sort('-createdAt');
        res.send(orders);
    })
);

const getNewOrderForCurrentUser = async (req) =>
    await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW,})

export default router;