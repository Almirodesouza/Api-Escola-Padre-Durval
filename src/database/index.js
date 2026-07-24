import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs';

import User from '../app/models/user.js';
import Turmas from '../app/models/Turmas.js';

const models = [User, Turmas];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
