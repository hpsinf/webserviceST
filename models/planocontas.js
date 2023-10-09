import { Sequelize } from "sequelize"
import db from "../src/db.js"


const planocontas = db.define('planocontas', {
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
                len: [1,1],
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

export {planocontas as default}