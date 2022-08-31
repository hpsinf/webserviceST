import express from "express"
import authMid from "../../services/auth.js"
import controllerpai from "../controllers/pai.js"

const routerpai = express.Router()

routerpai.get("/pais", controllerpai.findPai)
routerpai.get("/pais/nome", controllerpai.findByName)
routerpai.post("/pais", controllerpai.addPai)
routerpai.put("/pais", controllerpai.updatePai)
routerpai.delete("/pais", authMid.autorizacaoEspecial, controllerpai.deletePai)

export default routerpai