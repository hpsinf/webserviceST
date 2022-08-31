import filhorepo from "../../models/filho.js";

// function All(req, res) {
//     filhorepo.findAll().then(
//         (result) => res.json(result)
//     )
// }

async function findFilho(req, res) {
    let id =  req.body.id || req.query.id
    if (id){
        await filhorepo.findByPk(id, {include: ["paiteste"]}).then(
            (result) => res.json(result))
    } else {
        await filhorepo.findAll({include: ["paiteste"]}).then(
            (result) => res.json(result))
    }
}

// async function findFilho(req, res) {
//     let id = req.body.id || req.query.id || req.params.id
//     await filhorepo.findByPk(id).then(
//         (result) => res.json(result))
// }

async function addFilho(req, res) {
    await filhorepo.create({
        nomefilho: req.body.nome,
        idadefilho: req.body.idade,
        paitesteId: req.body.idpai
     }).then((result) => res.status(201).json(result))
}

async function updateFilho(req, res) {
    let id = req.body.id || req.query.id || req.params.id
    let idpai = req.body.idpai || req.query.idpai
    await filhorepo.update(
    {
        nomefilho: req.body.nome,
        idadefilho: req.body.idade,
        paitesteId: idpai
        },
        {
            where: {
                idfilho: id
            }
        }
    )
    await filhorepo.findByPk(id, {include: ["paiteste"]} ).then(
        (result) => res.status(200).json(result))
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
