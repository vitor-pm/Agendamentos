import { Router } from "express";
import UserController from "./app/Controllers/UserController";
import Database from "./database/index";

const routes = new Router();

routes.post("/users", UserController.store);

export default routes;
