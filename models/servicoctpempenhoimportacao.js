import { Sequelize } from "sequelize"
import db from "../src/db.js"
//import contas from "./contas.js"

const servicoctpempenhoimportacao = db.define('servicoctpempenhoimportacao', {
        idplanodecontas: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cnpj: {
            type: Sequelize.STRING,
            allowNull: false,            
            validate: {
                len: {
                    args:[14,14],
                msg: 'Informe os 14 digitos do CNPJ'
            },
            isNumeric:{
                msg: 'Informe apenas numeros para o CNPJ'
            },
                notNull:{
                    msg: 'CNPJ não informado'
                }                
            }
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        exercicio: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len:{
                    args:[4,4],
                    msg: 'Informe o exercício com 4 caracteres'
                }
            }
        }
})
//pai.hasMany(filho, { as: "Filhos" })
//pai.hasMany(filho, { as: "filhos" })
//filho.belongsTo(pai, { foreignKey: 'paiid' })
//planodecontas.hasMany(contas, {foreignKey: 'uidpconta', allowNull: false} )
//planodecontas.belongsTo(contas, {as: 'pcontas'}) 
export {servicoctpempenhoimportacao as default}