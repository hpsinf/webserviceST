import { Sequelize } from "sequelize"
import db from "../src/db.js"


const parcerias = db.define('parcerias', {
        idparceria: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sistema: {
            type: Sequelize.STRING,
            allowNull: false
        },        
        cnpj: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                name:'cnpj',
                msg:'Informa um CNPJ diferente'
            },            
            validate: {
                len: {
                    args:[14,14],
                    msg: 'Informe os 14 dígitos do CNPJ'
                },
                isNumeric:{
                    msg: 'Informe apenas números para o CNPJ'
                },
                notNull:{
                    msg: 'CNPJ não informado'
                }                
            }
        }                      
})

export {parcerias as default}