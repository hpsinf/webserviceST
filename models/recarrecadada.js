import { DataTypes, Sequelize } from "sequelize"
import db from "../src/db.js"


const recarrecadadas = db.define('recarrecadadas', {
    idrecarrecadada: {
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
    conta_parce: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [14, 14],
                msg: 'Necessário 14 dígitos'
            },
            isNumeric: {
                msg: 'Apenas números'
            },
            notEmpty: true
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
    rar_tipodoc: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true,
            len: [1,1]
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

export {recarrecadadas as default}