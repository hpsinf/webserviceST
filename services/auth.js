import jwt from "jsonwebtoken"
import dotenv from "dotenv/config.js"

const senhaEspecial = process.env.CHAVE

const chave = process.env.CHAVE


async function gerarSerial (dados) {
    return jwt.sign(dados, chave, { expiresIn: dados.dias })
}


async function verificarSerial (serial) {
    try {
        var dados = await jwt.verify(serial, chave)
    } catch (err) {
        return err.message;
    }
    return dados;
}
async function autorizar (req, res, next) {
    try {
        const serial = req.body.serial || req.headers['x-access-serial', 'serial']
        if (!serial) {
            return res.status(401).json([{
                mensagem: "Serial de acesso não encontrada"
            }])
        }
        jwt.verify(serial, chave, (error, decoded) => {
            if (error) {
                return res.status(401).json([{
                    mensagem: `Serial inválida, ${error.message}`
                }])
            }
            next()
        })
    } catch (err){
        return res.status(500).json(err.mensagem)
    }

}

async function autorizacaoEspecial (req, res, next) {
    let senha = req.body.senha
    if (senha){
        if (senha !== senhaEspecial){
            return res.status(401).json([
                {mensagem: "Acesso negado"}
            ])
        } else next()
    } else
        return res.status(401).json([
            {mensagem: "Acesso negado"}
        ])
}

export default {gerarSerial, verificarSerial, autorizar, autorizacaoEspecial}
