import { DataTypes, INTEGER, Sequelize } from "sequelize"
import db from "../src/db.js"


const almoxarifado = db.define('almoxarifado', {
    idalmoxarifado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movimentacao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: 'Informe apenas números'
            }     
        }
    },
    mov_fornecedor: {
        type: DataTypes.INTEGER
    },
    nome_fornecedor: {
        type: DataTypes.STRING
    },
    mov_secrataria: {
        type: DataTypes.INTEGER
    },
    datamovimentacao: {
        type: DataTypes.DATEONLY
    },
    mov_data: {
        type: DataTypes.DATE
    },
    mov_nota: {
        type: DataTypes.STRING
    },
    mov_almoxarifado_origem: {
        type: DataTypes.STRING
    },
    descricao_almoxarifado_origem: {
        type: DataTypes.STRING            
    },    
    mov_almoxarifado: {
        type: DataTypes.INTEGER
    },    
    descricao_almoxarifado_destino: {
        type: DataTypes.STRING
    },
    mov_item_interno: {
        type: DataTypes.INTEGER
    },
    cad_descricao_resumida: {
        type: DataTypes.STRING        
    },
    cad_descricao_detalhada: {
        type: DataTypes.STRING        
    },    
    unidade: {
        type: DataTypes.STRING                
    },
    mov_numero_lote: {
        type: DataTypes.INTEGER
    },
    mov_data_validade: { 
        type: DataTypes.DATE
    },    
    mov_quantidade: {
        type: DataTypes.INTEGER
    },
    mov_valor: {
        type: DataTypes.DOUBLE
    },
    descricao_grupo: {
        type: DataTypes.STRING                
    },
    descricao_tipo: {
        type: DataTypes.STRING                        
    },
    valor_total: {
        type: DataTypes.DOUBLE
    },
    estoque_minimo: {
        type: DataTypes.INTEGER
    },
    estoque_atual: {
        type: DataTypes.INTEGER        
    },
    historico: {
        type: DataTypes.STRING
    },
    situacao_movimentacao: {
        type: DataTypes.STRING
    },
    tipo_entrada_material: {
        type: DataTypes.STRING
    }    
})

export { almoxarifado as default }