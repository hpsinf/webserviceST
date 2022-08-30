import express from "express"
import auth from "../controllers/auth.js"
import controllerpai from "../controllers/pai.js"

const routerpai = express.Router()

routerpai.get("/pais", controllerpai.findPai)
routerpai.get("/pais/nome", controllerpai.findByName)
routerpai.post("/pais", controllerpai.addPai)
routerpai.put("/pais", controllerpai.updatePai)
routerpai.delete("/pais/:id", controllerpai.deletePai)

export default routerpai