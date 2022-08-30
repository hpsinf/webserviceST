import Filho from "../models/filho.js";
import Pai from "../models/pai.js";
import Pessoa from "../models/pessoa.js";


import db from "../src/db.js";

const sicronizardb = async () =>{
    await db.sync({alter : true})
}

export default sicronizardb