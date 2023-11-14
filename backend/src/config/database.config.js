import {connect, set} from "mongoose";
import {UserModel} from "../models/user.model.js";
import {sample_foods, sample_user} from "../data.js";
import bcrypt from 'bcryptjs';
import {FoodModel} from "../models/food.model.js";

const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUser();
        await seedFood();
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.log(error);
    }
};

async function seedUser() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log('Users seed is already done');
        return;
    }

    for (let user of sample_user) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('Users seed SUCCESS');
}

async function seedFood() {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
        console.log('Foods seed is already done');
        return;
    }

    for (let food of sample_foods) {
        await FoodModel.create(food);
    }

    console.log('Foods seed SUCCESS');
}