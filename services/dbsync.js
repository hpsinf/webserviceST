//Modelos a ser sincronizados
import Filho from "../models/filho.js";
import Pai from "../models/pai.js";
// import Pessoa from "../models/pessoa.js";


import db from "../src/db.js";

async function sicronizardb(bforce = false) {
    await db.sync({alter: true, force: bforce });    
}

export {sicronizardb as default}