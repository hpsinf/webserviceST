import pairepo from "../../models/pai.js"
import {Sequelize} from "sequelize"


async function findPai(req, res) {
    let id = req.body.id || req.query.id
    if (id){
        await pairepo.findByPk(id).then(
            (result) => res.json(result))
    } else {
        await pairepo.findAll().then(
            (result) => res.json(result))
    }
}

async function findByName(req, res) {
    let nome =  req.body.nome || req.query.nome || req.params.nome
    await pairepo.findAll(
        {
            where: {
                nome: {[Sequelize.Op.like]: `%${nome}%`}
            }
        }
        ).then(
        (result) => res.json(result))
}

async function addPai(req, res) {
    await pairepo.create({
        nome: req.body.nome,
        dtnascimento: req.body.dtnascimento
     }).then((result) => res.json(result))
}

async function updatePai(req, res) {
    let id =  req.body.id || req.query.id || req.params.id
    await pairepo.update(
    {
        nome: req.body.nome
        },
        {
            where: {
                id: id
            }
        }
    )
    await pairepo.findByPk(id).then(
        (result) => res.json(result))
}

async function deletePai(req, res) {
    let id = req.body.id 
    await pairepo.destroy(
        {
            where: {
                id: id
            }
        }
    )
    await pairepo.findByPk(id).then(
        (result) => res.json(result)
    )
}


export default {findPai, addPai, findPai, updatePai, deletePai, findByName}