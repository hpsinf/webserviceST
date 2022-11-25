import repo from "../../models/planodecontas.js"
import { QueryTypes } from "sequelize"
import fn from "../../services/funcoes.js"
import auth from "../../services/auth.js"


async function findPlanodeContas(req, res) {
    try {
        console.time()
        let dadoscliente = await auth.verificarSerial(req.headers['x-access-serial', 'serial'])
        let dados = {
            cliente: dadoscliente.cliente
        }
        let sql = req.body.sql
        sql = sql.toLowerCase().trim()
        let id = req.body.id
        let cc = req.body.cc

        if (sql) {
            let sInsert = sql.indexOf('insert')
            let sUpdate = sql.indexOf('update')
            let sDelete = sql.indexOf('delete')                        
            
            if ((sInsert > -1) || (sDelete > -1) || (sUpdate > -1)){
                res.send({err: "sql não permitido"})    
            } else
            if (sql.indexOf('select') == 0){
                const result = await repo.sequelize.query(sql,
                    {
                        type: QueryTypes.SELECT,
                        plain: false, //true retorna so o primeiro registro
                        raw: false, //true caso não exista o modelo
                        nest: false //false sem aninhar exemplo de resultado {"foo.bar.baz": 1 } e true = {"foo":{"bar": {"baz": 1}}}
                        //logging: console.log
                    })
                res.json(result.concat(dados))
            } else
            res.send({err: "sql não permitido"})    
            
        } else {
            if (cc) {
                cc = { include: ["contas"] }
            } else {
                cc = { include: [] }
            }

            if (id) {
                await repo.findByPk(id, cc).then(
                    (result) => {
                        retorno = new Array()
                        retorno.push(result)
                        retorno.push(dados)
                        res.json(retorno)
                    })
            } else {
                await repo.findAll(cc).then(
                    (result) => {
                        res.json(result.concat(dados))
                    })
            }
        }
    }
    finally {
        console.timeEnd()
        console.log(fn.dataHoraAtualFormatada())
    }
}

async function addPlanodeContas(req, res) {
    await repo.create({
        cnpj: req.body.cnpj,
        nome: req.body.nome,
        exercicio: req.body.exercicio
    }).then((result) => res.status(201).json(result))
}

async function updatePlanodeContas(req, res) {
    let id = req.body.id
    let cnpj = req.body.cnpj
    let nome = req.body.nome
    let exercicio = req.body.exercicio
    if (id) {
        await repo.update(
            {
                cnpj: cnpj,
                nome: nome,
                exercicio: exercicio
            },
            {
                where: { idplanodecontas: id }
            }
        )
        await repo.findByPk(id, { include: ["contas"] }).then(
            (result) => res.status(200).json(result))
    } else {
        res.status(412).send([{
            mensagem: "id não informado"
        }])
    }
}

async function deletePlanodeContas(req, res) {
    let req_id = req.body.id
    await repo.destroy(
        {
            where: {
                idplanodecontas: req_id
            }
        }
    )
    await repo.findByPk(req_id, { include: ["contas"] }).then(
        (result) => res.status(200).json(result)
    )
}

export default { findPlanodeContas, addPlanodeContas, updatePlanodeContas, deletePlanodeContas }
