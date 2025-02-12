const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];
    for (let index = 0; index <= this.length - 1; index++) {
        const resultado = callback(this[index], index);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
}

async function main() {
    try {
        const result = await service.obterPessoas('a');
        // const names = [];

        // results.results.forEach(function (item) {
        //     names.push(item.name);
        // });

        // const names = results.results.map(function (pessoa) {
        //     return pessoa.name;
        // });

        // const names = results.results.map((pessoa) => pessoa.name);
        const names = result.results.meuMap(function (pessoa, index) {
            `[${index}] ${pessoa.name}`
        });
    } catch (error) {
        console.error('error', error);
    }
}

main();