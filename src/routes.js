import { Router } from "express";
import multer from "multer";

import multerConfig from "../src/config/multer";

import UserController from "./app/Controllers/UserController";
import SessionController from "./app/Controllers/SessionController";
import CollaboratorControler from "./app/Controllers/CollaboratorControler";
import AppointmentController from "./app/Controllers/AppointmentController";
import FileController from "./app/Controllers/FileController";

import Database from "./database/index";

import authMiddlewares from "./app/middlewares/auth";
import ScheduleController from "./app/Controllers/ScheduleController";

const routes = new Router();
const upload = new multer(multerConfig);

routes.post("/login", SessionController.store);
routes.post("/users", UserController.store);

//Rotas Autenticadas
routes.use(authMiddlewares);

routes.put("/users", UserController.update);

// Rota de Agendamento
routes.post("/appointments", AppointmentController.store);
routes.get("/appointments", AppointmentController.index);
// Listagem de agendamentos colaborador
routes.get("/schedule", ScheduleController.index);

// Lista Colaboradores
routes.get("/collaborators", CollaboratorControler.index);

// Upload de arquivos
routes.post("/files", upload.single("file"), FileController.store);

export default routes;
