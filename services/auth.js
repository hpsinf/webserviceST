import jwt from "jsonwebtoken"
import dotenv from "dotenv/config.js"

const senhaEspecial = process.env.CHAVE

const chave = process.env.CHAVE


async function gerarSerial(dados) {
    let periodo = dados.dias
    if (!periodo) {
        periodo = '30d'
    }
    return jwt.sign(dados, chave, { expiresIn: periodo })
}


async function verificarSerial(serial) {
    try {
        var dados = await jwt.verify(serial, chave)
    } catch (err) {
        return err.message;
    }
    return dados;
}

async function autorizar(req, res, next) {
    try {
        const sXAccessSerial = 'x-access-serial'
        const sSerial = 'serial'
        const serial = req.headers[sXAccessSerial, sSerial]
        if (!serial) {
            return res.status(401).json([{
                mensagem: "Serial de acesso não encontrado, serial deve ser informado entre os headers da requisição"
            }])
        }
        jwt.verify(serial, chave, (error, decoded) => {
            if (error) {
                return res.status(401).json([{
                    mensagem: 'Serial inválido'
                    //mensagem: `Serial inválido ou não informado:  ${error.message}`
                }])
            }
            next()
        })

    } catch (err) {
        return res.status(500).json(err.mensagem)
    }

}

async function autorizacaoEspecial(req, res, next) {
    let senha = req.headers['x-access-senha', 'senha']
    if (senha) {
        if (senha !== senhaEspecial) {
            return res.status(401).json([
                { mensagem: "Acesso negado" }
            ])
        } else next()
    } else
        return res.status(403).json([
            { mensagem: "Acesso negado" }
        ])
}

export default { gerarSerial, verificarSerial, autorizar, autorizacaoEspecial }
