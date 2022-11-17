import repo from "../../models/parcerias.js"
import { QueryTypes }  from "sequelize"

async function findParcerias(req, res) {
    console.time()
    let sql = req.body.sql
    let id =  req.body.id

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
        if (id){
            await repo.findByPk(id).then(
                (result) => {
                    res.json(result)
                    console.timeEnd()
                })               
        } else {
             await repo.findAll().then(
                (result) => {
                    res.json(result)
                    console.timeEnd()
                })            
        }
    }        
}

async function addParcerias(req, res) {
    await repo.create({
        cnpj: req.body.cnpj,
        descricao: req.body.descricao,
        sistema: req.body.sistema         
     }).then((result) => res.status(201).json(result))
}

async function updateParcerias(req, res) {
    let req_id = req.body.id 
    let cnpj = req.body.cnpj
    let descricao = req.body.descricao    
    let sistema = req.body.sistema
    if (id){
      await repo.update(
            {
                cnpj: cnpj,
                descricao: descricao,
                sistema: sistema                          
            },
            {   
                where: { idparceria: req_id }
            }
        )
        await repo.findByPk(req_id).then(
            (result) => res.status(200).json(result))        
    } else {
        res.status(412).send([{
            mensagem: "id não informado"
        }])
    }       
}

async function deleteParcerias(req, res) {
    let req_id = req.body.id     
    await repo.destroy(
        {
            where: {
                 idparceria: req_id                
            }            
        }
    )
    await repo.findByPk(req_id).then(
        (result) => res.status(200).json(result)
    )
}

export default { findParcerias, addParcerias, updateParcerias, deleteParcerias }
