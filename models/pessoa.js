 import { Sequelize } from "sequelize"
 import db from "../src/db.js"

 export default db.define('pessoateste', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contato: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        descricao: Sequelize.STRING
 })


