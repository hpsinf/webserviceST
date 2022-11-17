import repo from "../../models/planodecontas.js"
import { QueryTypes }  from "sequelize"

async function findPlanodeContas(req, res) {
    console.time()
    let sql = req.body.sql
    let id = req.body.id
    let cc = req.body.cc

    if (sql){
        const result = await repo.sequelize.query(sql,/*"SELECT * FROM planodecontas p inner join contas c on c.uidpconta = p.idplanodecontas",*/         
        {
            type: QueryTypes.SELECT, 
            plain: false, //true retorna so o primeiro registro
            raw: false, //true caso não exista o modelo
            nest: false //false sem aninhar exemplo de resultado {"foo.bar.baz": 1 } e true = {"foo":{"bar": {"baz": 1}}}
            //logging: console.log
        })
        res.json(result)            
        console.timeEnd()        
    } else {
        if (cc){
            cc = {include: ["contas"]}
        } else {
            cc = {include: []}
        }
    
        if (id){
            await repo.findByPk(id, cc).then(
                (result) => {
                    res.json(result)
                    console.timeEnd()                    
                })               
        } else {
             await repo.findAll(cc).then(
                (result) => {
                    res.json(result)
                    console.timeEnd()
                })            
        }
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
    let req_id = req.body.id 
    let cnpj = req.body.cnpj
    let nome = req.body.nome    
    let exercicio = req.body.exercicio
    if (id){
      await repo.update(
            {
                cnpj: cnpj,
                nome: nome,            
                exercicio: exercicio                                
            },
            {   
                where: { idplanodecontas: req_id }
            }
        )
        await repo.findByPk(req_id, {include: ["contas"]} ).then(
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
    await repo.findByPk(req_id, {include: ["contas"]}).then(
        (result) => res.status(200).json(result)
    )
}

export default { findPlanodeContas, addPlanodeContas, updatePlanodeContas, deletePlanodeContas }
