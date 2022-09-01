import express from "express"
import routes from "./src/routers/routers.js"
import bodyParser from "body-parser"
import db from "./src/db.js"
//import sicronizardb from "./services/dbsync.js"

//sicronizardb()

const app = express()
app.use(bodyParser.json()) //Validação das requisições (req.body)
app.use(bodyParser.urlencoded({ extended: true })) //Validação para todos os tipos de dados na requisições (req.body)

app.disable('x-powered-by') //Remoção de infomações desnecessarias no responde.header

app.disable('etag') //Remoção de informações desnecessarias no responde.header

app.use(express.json())


// Permissões de headers
app.use((req, res, next) => {

    //Website que serão permitidos conectar a api
    // res.setHeader('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Origin', "*")    

    // Request metodos aceitos
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

    // Request headers aceitos
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, serial')
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, content-type, serial')

    // true se precisar que o site inclua cookies na requisição recebida
    // (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', false)
    res.set('Access-Control-Allow-Credentials', false)    

    //Cache
    res.set('Cache-Control', 'public, max-age=300')

    next()
})

app.use((req, res, next) => {
     res.removeHeader('Access-Control-Allow-Origin')
     res.removeHeader('Access-Control-Allow-Methods')
     res.removeHeader('Access-Control-Allow-Headers')
     res.removeHeader('Access-Control-Allow-Credentials')
     res.removeHeader('Cache-Control')  
     //res.removeHeader("Server")       
     next()
 })

app.use(routes)

const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log(`Servidor iniciado na porta ${port}`)
)



