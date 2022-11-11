import repo from "../../models/planodecontas.js"
import { QueryTypes }  from "sequelize"

async function findPlanodeContas(req, res) {
    let id =  req.body.id || req.query.id
    if (id){        
         await repo.findByPk(id, {include: ["contas"]}).then(
            (result) => res.json(result))
    } else {
        await repo.findAll({include: ["contas"]}).then(
            (result) => res.json(result))
        // const result = await repo.sequelize.query("SELECT * FROM planodecontas p inner join contas c on c.uidpconta = p.idplanodecontas", 
        // {
        //     type: QueryTypes.SELECT, 
        //     plain: false, //True retorna so o primeiro registro
        //     raw: false, //True caso não exista o modelo
        //     nest: true //False sem aninhar exemplo de resultado {"foo.bar.baz": 1 } e True = {"foo":{"bar": {"baz": 1}}}
        //     //logging: console.log
        // })
        // res.json(result)            
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
