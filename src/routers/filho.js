import express from "express"
import auth from "../controllers/auth.js"
import controller from "../controllers/filho.js"

const router = express.Router()

router.get("/filhos", controller.findFilho)
router.post("/filhos", controller.addFilho)
router.put("/filhos", controller.updateFilho)
router.delete("/filhos", controller.deleteFilho)

export default router