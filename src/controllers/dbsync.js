import sicronizardb from "../../services/dbsync.js";



async function sincronizar(req, res){
    try
    {        
        await sicronizardb(req.body.force)
        res.status(200).send("Banco sincronizado")
    }catch(err){
        res.status(500).send(err.message)
    }
}

export default {sincronizar}