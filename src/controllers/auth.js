import util from "../../services/funcoes.js"
import auth from "../../services/auth.js"



async function pegarSerial (req, res) {
    const diasPermissao = req.body.dias
    const clientePermissao = req.body.cliente
    const idc = req.body.idc
    const sistema = req.body.sistema
    const cnpj = req.body.cnpj    

    const dados = {
            dias: diasPermissao,
            cliente: clientePermissao,
            cnpj: cnpj,
            idc: idc,
            sistema: sistema,            
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
        const serial = req.headers['x-access-serial', 'serial']
        if (!serial)
            return res.status(500).send([{Erro: "Serial não encontrado"}])

        const serial_verificado = await auth.verificarSerial(serial)
        if (!serial_verificado)
            return res.status(500).send([{Erro: "Falha ao verificar a serial"}])

        if ((serial_verificado == 'jwt expired') || (serial_verificado == 'invalid token'))    
        return res.status(200).send('Serial inválido')
       
        return res.status(200).send(serial_verificado)

    } catch (err){
        return res.status(500).json(err.mensagem)
    }
}
export default {pegarSerial, verificarSerial}