import { Sequelize } from "sequelize"
import db from "../src/db.js"
import pai from "./pai.js"

const filho = db.define('filhoteste', {
        idfilho: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nomefilho: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idadefilho: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
})
//pai.hasMany(filho, { as: "Filhos" })
//pai.hasMany(filho, { as: "filhos" })
//filho.belongsTo(pai, { foreignKey: 'paiid' })
filho.belongsTo(pai) //id de pai em filho (paitesteId)
export {filho as default}





