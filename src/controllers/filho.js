import filhorepo from "../../models/filho.js";
import auth from "../../services/auth.js"


async function findFilho(req, res) {
    let id = req.body.id
    let dadoscliente = await auth.verificarSerial(req.headers['x-access-serial', 'serial'])
    let dados = {        
        cliente: dadoscliente.cliente
    }
    if (id){
        await filhorepo.findByPk(id, {include: ["paiteste"]}).then(
            (result) => res.json(result))
    } else {
        await filhorepo.findAll({include: ["paiteste"]}).then(
            (result) => res.json([result.concat(dados)]))
            
    }
    console.log({dados})
    
}

async function addFilho(req, res) {    
    await filhorepo.create({
        nomefilho: req.body.nome,
        idadefilho: req.body.idade,
        paitesteId: req.body.idpai        
     }).then((result) => res.status(201).json(result))
}

async function updateFilho(req, res) {
    let id = req.body.id 
    let idpai = req.body.idpai
    let nome = req.body.nome
    let idade = req.body.idade
    if (id){
      await filhorepo.update(
            {
                nomefilho: nome,
                idadefilho: idade,
                paitesteId: idpai
            },
            {   
                where: { idfilho: id }
            }
        )
        await filhorepo.findByPk(id, {include: ["paiteste"]} ).then(
            (result) => res.status(200).json(result))        
    } else {
        res.status(202).send([{
            mensagem: "id não informado"
        }])
    }       
}

async function deleteFilho(req, res) {
    let id = req.body.id 
    await filhorepo.destroy(
        {
            where: {
                idfilho: id
            }
        }
    )
    await filhorepo.findByPk(id, {include: ["paiteste"]}).then(
        (result) => res.status(200).json(result)
    )
}

export default { findFilho, addFilho, updateFilho, deleteFilho }
