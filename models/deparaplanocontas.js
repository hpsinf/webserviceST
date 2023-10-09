import { Sequelize } from "sequelize"
import db from "../src/db.js"


const deparaplanocontas = db.define('deparaplanocontas', {
        idplanoconta: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        conta_descricao: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                name: 'descrição',
                msg: 'Informa uma descrição diferente'                
            },
            validate: {
                notEmpty: true
            }
        },        
        conta_banco:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'N',
            validate: {
                notEmpty: true
            }        
        },
        conta_codigo: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [15,15],
                    msg: 'Necessário 15 dígitos'
                },
                isNumeric:{
                    msg: 'Apenas números'
                },
                notEmpty: true
            }
        },    
        conta_parce:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [21,21],
                    msg: 'Necessário 21 dígitos'
                },
                isNumeric:{
                    msg: 'Apenas números'
                },
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
        }
        
})

export {deparaplanocontas as default}