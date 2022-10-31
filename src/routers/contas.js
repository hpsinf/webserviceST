import express from "express"
import authMid from "../../services/auth.js"
import controller from "../controllers/conta.js"

const router = express.Router()

router.get("/contas",  controller.findConta)
router.post("/contas", controller.addConta)
router.put("/contas",  controller.updateConta)
router.delete("/contas", authMid.autorizacaoEspecial, controller.deleteConta)

export default router