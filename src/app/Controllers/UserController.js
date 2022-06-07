import User from "./../models/User";

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (userExists) {
            return res.status(400).json({ erros: "Usuário já cadastrado" });
        }
        const { id, name, email, provider } = await User.create(req.body);

        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        // Pegando as informações passadas pelo body da requisição
        const { email, oldPassword } = req.body;

        // Pegando as informações do usuario pelo id proveniente do JWT
        const user = await User.findByPk(req.userId);

        // Checando se o novo email ja esta cadastrado
        if (email && email !== user.email) {
            const userExists = await User.findOne({
                where: {
                    email,
                },
            });

            if (userExists) {
                return res.status(400).json({ erros: "Usuário já cadastrado" });
            }
        }

        // Checando se a senha confere
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({
                message: "Senha não confere",
            });
        }

        const { id, name, provider } = await user.update(req.body);
        return res.json({ id, name, email, provider});
    }
}

export default new UserController();
