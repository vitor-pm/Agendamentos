import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
    // Pega as informações do header
    const authHeaders = req.headers.authorization;

    // Verifica se esta vazio
    if (!authHeaders) {
        return res.status(401).json({
            message: "Para acessar esse serviço é preciso estar logado",
        });
    }

    // Desestrutura o conteudo do authorization
    const [_, token] = authHeaders.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        // Passa o id do usuario que esta logando pela requisicao
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }
};
