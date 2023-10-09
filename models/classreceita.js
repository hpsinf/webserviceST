import { Sequelize } from "sequelize"
import db from "../src/db.js"


const classreceitas = db.define('classreceitas', {
        idclassreceita: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cnpj_enteprinc: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: {
            //     name:'cnpj',
            //     msg:'Informa um CNPJ diferente'
            // },            
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
                },
                notEmpty: true                
            }
        },        
        rec_codigo: {
            type: Sequelize.STRING,
            allowNull: false,            
            validate: {
                len: [12,12],
                notEmpty: true,
                isNumeric: true
            }
        },        
        rec_descricao:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }            
        }        
})

export {classreceitas as default}