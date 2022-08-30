import { Sequelize } from "sequelize"
import dotenv from "dotenv/config.js" // importar o dotenv para localizar as variáveis de ambiente

const dbName = process.env.DB_NAME_PG
const dbUser = process.env.DB_USER_PG
const dbHost = process.env.DB_HOST_PG
const dbPassword = process.env.DB_PASSWORD_PG

const conn = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`)

conn.authenticate()
  .then(() => {
    console.log(`Conectado em ${dbName}`)
   return true
  })
  .catch(err => {
    console.log(`Não foi possível conectar na fonte de dados ${err}`)
  });

export default conn