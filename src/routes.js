import { Router } from "express";
import UserController from "./app/Controllers/UserController";
import SessionController from "./app/Controllers/SessionController";
import Database from "./database/index";

import authMiddlewares from "./app/middlewares/auth";

const routes = new Router();

routes.post("/login", SessionController.store);
routes.post("/users", UserController.store);

//Rotas Autenticadas
routes.use(authMiddlewares);

routes.put("/users", UserController.update);

export default routes;
