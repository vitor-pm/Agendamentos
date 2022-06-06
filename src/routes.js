import { Router } from "express";
import User from "./app/models/User";
import Database from './database/index';

const routes = new Router();

routes.get("/", async (req, res) => {
    // return res.json({
    //     message: "Okay",
    // });
    const user = await User.create({
        name: "Vitor andrade",
        email: "vitor@email.com",
        password_hash: "12345679",
    });

    return res.json(user);
});

export default routes;
