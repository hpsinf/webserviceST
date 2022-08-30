import express from "express"
import dbsync from "../controllers/dbsync.js"
import auth from "../controllers/auth.js"
import authMid from "../../services/auth.js"
import routerpai from "./pais.js"
import routerfilho from "./filho.js"
//import filhocontroller from "../controllers/filho.js"
//import paicontroller from "../controllers/pai.js"

const routers = express.Router()

routers.get('/', (req, res) =>
    res.send('<h1 style="color: blue">WebService St</h1>')
)
routers.get('/sobre', (req, res) =>
    res.json ({sobre: "Sobre"})
)

routers.get("/sincronizar", authMid.autorizacaoEspecial ,dbsync.sincronizar)

routers.get("/gerarserial", authMid.autorizacaoEspecial ,auth.pegarSerial)
routers.get("/verificarserial", authMid.autorizar, auth.verificarSerial)


//v01 
routers.use("/v01/", routerpai)
routers.use("/v01/", routerfilho)

export {routers as default};