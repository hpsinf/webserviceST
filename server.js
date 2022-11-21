import express from "express"
import routes from "./src/routers/routers.js"
import bodyParser from "body-parser"
import db from "./src/db.js"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//import sicronizardb from "./services/dbsync.js"

//sicronizardb()

const app = express()
app.use(bodyParser.json()) //Validação das requisições (req.body)
app.use(bodyParser.urlencoded({ extended: true })) //Validação para todos os tipos de dados na requisições (req.body)

//Remoção de informações desnecessarias no responde.header quando possível
app.disable('x-powered-by') 
app.disable('etag') 
app.disable('server')
app.disable('via')



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
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, content-type, serial, senha')

    // true se precisar que o site inclua cookies na requisição recebida
    // (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', false)
    res.set('Access-Control-Allow-Credentials', false)    

    //Cache
    res.set('Cache-Control', 'public, max-age=300')

    next()
})

app.use((req, res, next) => {
     //res.removeHeader('Access-Control-Allow-Origin')
     res.removeHeader('Access-Control-Allow-Methods')
     res.removeHeader('Access-Control-Allow-Headers')
     res.removeHeader('Access-Control-Allow-Credentials')
     res.removeHeader('Cache-Control')  
     //res.removeHeader("Server")       
     next()
 })

app.use(routes)

const port = process.env.PORT || 21115

app.listen(port, () =>
    console.log(`Servidor iniciado na porta ${port}`)
)

app.use((req, res, next) => {
    var err = new Error('Url não existe');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).sendFile('error.html', {root: path.join(__dirname, './')});
});




