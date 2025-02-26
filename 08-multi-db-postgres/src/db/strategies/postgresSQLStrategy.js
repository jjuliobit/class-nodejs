const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends IDb {
  constructor() {
    super();
    this._herois = null;
    this._sequelize = null;
  }

  async connect() {
    this._sequelize = new Sequelize(
      'heroes', // database
      'juliorocha', // user
      'minhasenhasecreta', // senha
      {
        host: 'localhost',  // Nome do container PostgreSQL
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
      },
    );

    try {
      await this._sequelize.authenticate();
      console.log('Conexão com o PostgreSQL realizada com sucesso!');
      this.defineModel();
      await this._sequelize.sync();  // Adiciona a sincronização do modelo
    } catch (error) {
      console.error('Falha na conexão com o PostgreSQL:', error);
    }
  }

  defineModel() {
    this._herois = this._sequelize.define(
      'herois',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
      },
    );
  }

  async isConnected() {
    try {
      await this._sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('Erro ao verificar a conexão:', error);
      return false;
    }
  }

  async create(item) {
    const { dataValues } = await this._herois.create(item);
    return dataValues;
  }

  async read(item = {}) {
    return await this._herois.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._herois.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return await this._herois.destroy({ where: query });
  }
}


module.exports = PostgreSQLStrategy;
