import { Router } from "express";
import UserController from "./app/Controllers/UserController";
import SessionController from "./app/Controllers/SessionController";
import Database from "./database/index";

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/login", SessionController.store);

export default routes;
