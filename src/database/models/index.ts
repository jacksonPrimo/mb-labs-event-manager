import { Sequelize } from 'sequelize';
import { UserModel } from './User';
const config = require('../config');
export const sequelize = new Sequelize(config);
const Models: any = {};

Models.User = UserModel(sequelize);
for (const key in Models) {
  if (Models[key].associate) {
    Models[key].associate(Models);
  }
}
export default Models;
