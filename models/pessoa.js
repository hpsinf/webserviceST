import { DataTypes, Sequelize } from "sequelize"
import db from "../src/db.js"


const pessoa = db.define('pessoas', {
    idpessoa: {
        type: DataTypes.INTEGER,
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
    },
    nome_enteprinc: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    nome_ung: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

export { pessoa as default }