import { Sequelize } from "sequelize"
import db from "../src/db.js"


const contas = db.define('contas', {
        idconta: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        conta: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                name: 'conta',
                msg: 'Informe uma conta diferente'
            }
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        }
})

export {contas as default}
