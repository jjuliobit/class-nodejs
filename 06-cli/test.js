const {
    deepEqual,
    ok
} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
};


describe('Suite de manipulação de Herois', () => {

    beforeEach(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });

    it('deve pesquisar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id);

        deepEqual(resultado, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(actual, expected);
    });

    it("deve remover um heroi por id", async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected);
    });

    it("deve atualizar um heroi pelo id", async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR, // Usar o item correto
            nome: 'Batman',
            poder: 'Dinheiro'
        };

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        };

        // Atualiza o herói com ID 2 (DEFAULT_ITEM_ATUALIZAR)
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);

        // Busca o herói atualizado
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

        // console.log('resultado', resultado);
        // console.log('expected', expected);

        // Compara o resultado correto
        deepEqual(resultado, expected);
    });

});

