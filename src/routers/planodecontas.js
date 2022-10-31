import express from "express"
import authMid from "../../services/auth.js"
import controller from "../controllers/planodecontas.js"

const router = express.Router()

router.get("/planodecontas",  controller.findPlanodeContas)
router.post("/planodecontas", controller.addPlanodeContas)
router.put("/planodecontas",  controller.updatePlanodeContas)
router.delete("/planodecontas", authMid.autorizacaoEspecial, controller.deletePlanodeContas)

export default router