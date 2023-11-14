import {model, Schema} from "mongoose";
import {OrderStatus} from "../constants/orderStatus.js";
import {FoodModel} from "./food.model.js";

export const LatLngSchema = new Schema(
    {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
    },
    {
        _id: false,
    }
);

export const OrderItemSchema = new Schema(
    {
        food: {type: FoodModel.schema, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    {
        _id: false,
    }
);

OrderItemSchema.pre('validate', function (next) {
    this.price = this.food.price * this.quantity;
    next();
});

const OrderSchema = new Schema(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        addressLatLng: {type: LatLngSchema, required: true},
        paymentId: {type: String},
        totalPrice: {type: Number, required: true},
        items: {type: [OrderItemSchema], required: true},
        status: {type: String, default: OrderStatus.NEW},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        }
    }
);

export const OrderModel = model('order', OrderSchema);