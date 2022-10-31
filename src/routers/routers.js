import express from "express"
import dbsync from "../controllers/dbsync.js"
import auth from "../controllers/auth.js"
import authMid from "../../services/auth.js"
import routerpais from "./pais.js"
import routerfilhos from "./filho.js"
import routercontas from "./contas.js"
import routerplanodecontas from "./planodecontas.js"
import path from "path"

const __dirname = path.resolve();


//import filhocontroller from "../controllers/filho.js"
//import paicontroller from "../controllers/pai.js"

const routers = express.Router()

routers.get('/', (req, res) =>
    res.sendFile(path.join(__dirname+'/index.html'))
)
routers.get('/sobre', (req, res) =>
    res.json ({"sobre": "Sobre"})
)

routers.get("/sincronizar", authMid.autorizacaoEspecial ,dbsync.sincronizar)

routers.get("/gerarserial", authMid.autorizacaoEspecial ,auth.pegarSerial)
routers.get("/verificarserial", /*authMid.autorizar,*/ auth.verificarSerial)


//v01 
routers.get("/siafic/v01/", (req, res) =>{
    res.sendFile(path.join(__dirname+'/index.html'))    
})
routers.use("/siafic/v01/", /*authMid.autorizar,*/ routerpais)
routers.use("/siafic/v01/", /*authMid.autorizar,*/ routerfilhos)

routers.use("/siafic/v01/", /*authMid.autorizar,*/ routercontas)
routers.use("/siafic/v01/", /*authMid.autorizar,*/ routerplanodecontas)


export {routers as default}