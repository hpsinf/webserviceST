import util from "../../services/funcoes.js"
import auth from "../../services/auth.js"



async function pegarSerial (req, res) {
    const diasPermissao = req.body.dias
    const clientePermissao = req.body.cliente

    const dados = {
            dias: diasPermissao + 'd',
            cliente: clientePermissao,
            datageracao: util.dataHoraAtualFormatada('d'),
            hora: util.dataHoraAtualFormatada('h')
    }
    const serial = await auth.gerarSerial(dados)

    if (!serial)
        res.status(500).send([{Erro: "Falha na geração do serial"}])
    res.status(201).send([{serial: serial}])
}

async function verificarSerial(req, res){
    try {
        const serial = req.body.serial || req.query.serial
        if (!serial)
            res.status(500).send([{Erro: "Serial não encontrardo"}])

        const serial_verificado = await auth.verificarSerial(serial)
        if (!serial_verificado)
            res.status(500).send([{Erro: "Falha ao verificar a serial"}])

        res.status(200).send(serial_verificado)

    } catch (err){
        return res.status(500).json(err.mensagem)
    }
}
export default {pegarSerial, verificarSerial}