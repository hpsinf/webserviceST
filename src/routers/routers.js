import express from "express"
import dbsync from "../controllers/dbsync.js"
import auth from "../controllers/auth.js"
import authMid from "../../services/auth.js"
import path from "path"
//rotas
import routerpais from "./pais.js"
import routerfilhos from "./filho.js"
import routercontas from "./contas.js"
import routerplanodecontas from "./planodecontas.js"
import routerdownloads from "./downloads.js"
import routerparcerias from "./parcerias.js"


const __dirname = path.resolve();

const siafic_v00 = "/siafic/v00/"
const siafic_v01 = "/siafic/v01/"

//import filhocontroller from "../controllers/filho.js"
//import paicontroller from "../controllers/pai.js"

const routers = express.Router()

// routers.get('/', (req, res) =>
//     res.sendFile(path.join(__dirname + '/index.html'))
// )

routers.get('/', (req, res) =>
res.json({"WebService": "Ativo"})
)
routers.get('/sobre', (req, res) =>
    res.json({ "sobre": "Sobre" })
)

routers.get("/sincronizar", authMid.autorizacaoEspecial, dbsync.sincronizar)

routers.get("/gerarserial", authMid.autorizacaoEspecial, auth.pegarSerial)
routers.get("/verificarserial", /*authMid.autorizar,*/ auth.verificarSerial)

//downloads
routers.use("/downloads", routerdownloads)

//v01 
routers.get(siafic_v00, (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})


//v00
routers.use(siafic_v00, authMid.autorizar, routerpais)
routers.use(siafic_v00, authMid.autorizar, routerfilhos)
routers.use(siafic_v00, authMid.autorizar, routercontas)
routers.use(siafic_v00, authMid.autorizar, routerplanodecontas)
routers.use(siafic_v00, authMid.autorizar, routerparcerias)

//v01

export { routers as default }