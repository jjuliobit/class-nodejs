const { obterPessoas } = require('./service');


/*

const item = {
    name: 'Erick',
    age: 12
}

const { name, age } = item
console.log(name, age)

*/


Array.prototype.meuFilter = function (callback) {
    const lista = [];
    for (index in this) {
        const item = this[index];
        const result = callback(item, index, this);
        // 0, "", null, undefined === false
        if (!result) continue;
        lista.push(item);
    }
    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas('a');
        // por padrão precisa retornar um booleano
        // para informar se deve manter ou remover da lista
        // false > remove da lista
        // true > mantém
        // não encontrou = -1
        // encontrou = posicaoNoArray
        const familiaLars = results.filter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length);
            return item.name.toLowerCase().indexOf('lars') !== -1;
        });
        const names = familiaLars.map((pessoa) => pessoa.name);
        console.log(names);
    } catch (error) {
        console.error('error', error);
    }
}

main();