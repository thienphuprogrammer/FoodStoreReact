import { Router } from 'express';
import { sample_user } from "../data.js";
import jwt from 'jsonwebtoken';
import {BAD_REQUEST} from "../constants/httpStatus.js";
const router = Router();

router.get('/login', (req, res) => {
    const { username, password } = req.body;
    const user = sample_user.find(user => user.username === username && user.password === password);

    if (user) {
        res.send(generateTokenResponse(user));
        return;
    }

    res.status(BAD_REQUEST).send({ message: 'Invalid username or password' });
});

const generateTokenResponse = (user) => {
    const token = jwt.sign({
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        'SomeRandomText',
        {
            expiresIn: '30d'
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    }
}

export default router;