/**
 *
 * @param {*} dataouhora
 * @returns
 */
function dataHoraAtualFormatada(dataouhora) {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear(),
        hora = data.getHours(),
        minutos = data.getMinutes()
    if (dataouhora == 'd')
        return diaF + '/' + mesF + '/' + anoF

    if (dataouhora == 'h')
        return hora + ':' + minutos

    return diaF + '/' + mesF + '/' + anoF + ' - '+ hora + ':' + minutos
}


/**
 *
 * @param {*} object
 * @param  {...any} keys
 * @returns
 */
//retorna obj com chave e valores de um json
function pluck (object, ...keys) {

    const newObject = {};
    keys.forEach(key => newObject[key] = object[key])
    return newObject;
};
//exemplo de uso
/*app.put('/products/:id', (req, res, next) => {

    const product = pluck(req.body, 'title', 'price', 'description');

    new ProductDao()
    .update(product)
    .then(() => res.status(204).end())
    .catch(next);
});*/


/**
 *
 * @param {*} obj
 * @returns
 */
//Copiar um obj
function copiarObj (obj) {
    var copiado = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function (name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        Object.defineProperty(copiado, name, desc);
    });

    return copiado;
}

export default {dataHoraAtualFormatada, copiarObj, pluck}