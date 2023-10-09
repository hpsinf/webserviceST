import { Sequelize } from "sequelize"
import db from "../src/db.js"


const credenciamentos = db.define('credenciamentos', {
        idcredenciamento: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome_enteprinc: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                name: 'descricão',
                msg: 'Informa uma descrição diferente'                
            },
            validate: {
                notEmpty: true
            }
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
        nome_ung: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                name: 'nome unidade gestora',
                msg: 'Informa um nome ung diferente'                
            },
            validate: {
                notEmpty: true
            }
        },        
        cnpj_ung: {
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
        dias: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
        
})

export {credenciamentos as default}