import { Sequelize } from 'sequelize';
import { UserModel } from './User';
import { EventModel } from './Event';
import { TicketModel } from './Ticket';
const config = require('../config');
export const sequelize = new Sequelize(config);
const Models: any = {};

Models.User = UserModel(sequelize);
Models.Event = EventModel(sequelize);
Models.Ticket = TicketModel(sequelize);

for (const key in Models) {
  if (Models[key].associate) {
    Models[key].associate(Models);
  }
}
export default Models;
