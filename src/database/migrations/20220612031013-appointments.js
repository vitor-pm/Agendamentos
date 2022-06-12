"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("appointments", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                allowNull: true,
            },
            collaborator_id: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                allowNull: true,
            },
            canceled_at: {
                type: Sequelize.DATE,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable("users");
    },
};