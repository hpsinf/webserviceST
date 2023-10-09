import { DataTypes, Sequelize } from "sequelize"
import db from "../src/db.js"


const cred_tributarios = db.define('cred_tributarios', {
    idcred_tributario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rec_parce: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: {
        //     name: 'descrição',
        //     msg: 'Informa uma descrição diferente'
        // },
        validate: {
            len: [12,12],
            notEmpty: true
        }
    },
    rar_valor: {
        type: DataTypes.STRING,
        allowNull: false,        
        validate: {
            notEmpty: true,
            isDecimal: true
        }
    },    
    rar_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,14],
            notEmpty: true
        }        
    },    
    rar_data: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
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
                args: [14, 14],
                msg: 'Informe os 14 dígitos do CNPJ'
            },
            isNumeric: {
                msg: 'Informe apenas números para o CNPJ'
            },
            notNull: {
                msg: 'CNPJ não informado'
            },
            notEmpty: true
        }
    }
})

export {cred_tributarios as default}