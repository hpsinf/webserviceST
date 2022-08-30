
import { Sequelize } from "sequelize"
import db from "../src/db.js"
//import filho from "./filho.js"

const pai = db.define('paiteste', {
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
        dtnascimento: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
})

export {pai as default}
