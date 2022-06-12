import User from "../models/User";
import Notifications from "../Schema/Notifications";

class NotificationsController {
    async index(req, res) {
        const checkIsColaborator = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        if (!checkIsColaborator) {
            return res.status(401).json({
                message: "Notificação disponível apenas para colaboradores",
            });
        }

        const notifications = await Notifications.find({
            user: req.userId,
        })
            .sort({
                createdAt: "desc",
            })
            .limit(20);

        return res.status(200).json(notifications);
    }

    async update(req, res) {
        const notifications = await Notifications.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json(notifications);
    }
}

export default new NotificationsController();
