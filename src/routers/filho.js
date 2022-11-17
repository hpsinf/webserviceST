import express from "express"
import authMid from "../../services/auth.js"
import controller from "../controllers/filho.js"

const router = express.Router()

router.get("/filhos", controller.findFilho)
router.post("/filhos", controller.addFilho)
router.put("/filhos", controller.updateFilho)
router.delete("/filhos", authMid.autorizacaoEspecial, controller.deleteFilho)

export default router