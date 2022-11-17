import express from "express"
import authMid from "../../services/auth.js"
import controller from "../controllers/parcerias.js"

const parcerias = "/parcerias"
const router = express.Router()

router.get(parcerias, controller.findParcerias)
router.post(parcerias, controller.addParcerias)
router.put(parcerias, controller.updateParcerias)
router.delete(parcerias, /*authMid.autorizacaoEspecial,*/ controller.deleteParcerias)

export default router