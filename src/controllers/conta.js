import contarepo from "../../models/contas.js";
import {Sequelize} from "sequelize"
import auth from "../../services/auth.js"


async function findConta(req, res) {  
    let id = req.body.id
    let dadoscliente = await auth.verificarSerial(req.headers['x-access-serial', 'serial'])
    let dados = {
        cliente: dadoscliente.cliente        
    }
    if (id){
        await contarepo.findByPk(id).then(
            (result) => {
                let retorno = new Array()
                retorno.push(result)
                retorno.push(dados)
                res.status(200).json(retorno)
            })
    } else {
        await contarepo.findAll().then(
            (result) => res.status(200).json(result.concat(dados)))
    }
    console.log(dados)
}

async function findByName(req, res) {
    let descricao = req.body.descricao 
    await contarepo.findAll(
        {
            where: {
                descricao: {
                    [Sequelize.Op.like]: `%${descricao}%`
                }
            }
        }
    ).then(
        (result) => res.status(200).json(result))
}

async function addConta(req, res) {
    let dadoscliente = await auth.verificarSerial(req.headers['x-access-serial', 'serial'])
    let dados = {
        cliente: dadoscliente.cliente
    }
    await contarepo.create({
        conta: req.body.conta,
        descricao: req.body.descricao,
        uidpconta: req.body.idpconta
     }).then((result) => res.status(201).json(result))            
    
     console.log(dados)
}

async function updateConta(req, res) {
    let req_id = req.body.id
    await contarepo.update(
    {
        conta: req.body.conta,
        uidpconta: req.body.idpconta,        
        descricao: req.body.descricao                
        },
        {
          where: {
              idconta: req_id                
          }
        }
    )
    await contarepo.findByPk(req_id).then(
        (result) => res.status(200).json(result))
}

async function deleteConta(req, res) {
    let req_id = req.body.id 
    await contarepo.destroy(
        {
            where: {
                idconta: req_id
            }
        }
    )
    res.status(204)    
}


export default {findConta, addConta, findConta, updateConta, deleteConta, findByName}