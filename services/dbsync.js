import Filho from "../models/filho.js";
import Pai from "../models/pai.js";
import Pessoa from "../models/pessoa.js";


import db from "../src/db.js";

async function sicronizardb() {
    await db.sync({ alter: true });    
}

export default sicronizardb