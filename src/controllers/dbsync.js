import sicronizardb from "../../services/dbsync.js";



async function sincronizar(req, res){
    try
    {
        sicronizardb()
        res.status(200).send("Banco sincronizado")
    }catch(err){
        res.status(401).send(err.message)
    }
}

export default {sincronizar}