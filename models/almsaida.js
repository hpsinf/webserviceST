import { DataTypes, Sequelize } from "sequelize"
import db from "../src/db.js"


const almsaida = db.define('almsaidas', {
    idalmsaida: {
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
    pes_codigo: {
        type: DataTypes.STRING
    },
    item_cod:{
        type: DataTypes.STRING
    },
    ent_valor: {
        type: DataTypes.DOUBLE
    },
    ent_doc: {
        type: DataTypes.STRING
    },
    ent_data: {
        type: DataTypes.DATEONLY
    }
    
})

export { almsaida as default }