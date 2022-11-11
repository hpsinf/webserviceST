import express from "express"

const router = express.Router()


router.get("/efdreinf",  (req, res)=>{
    const file = "./downloads/STEfdReinf.zip"
    res.download(file)
})

export default router