import fs from 'fs';
import path from 'path';
import { Options, Sequelize } from 'sequelize';
const config = require('../config');
const sequelize = new Sequelize(config as Options);
const basename = path.basename(__filename);
const db: any = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ('.js' || '.ts'));
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
