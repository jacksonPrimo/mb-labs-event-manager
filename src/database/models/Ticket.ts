import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize';
import { TicketDto } from 'src/dtos/ticket.dto';

interface TicketCreationAttributes extends Optional<TicketDto, 'id'> {}
interface TicketInstance
  extends Model<TicketDto, TicketCreationAttributes>,
  TicketDto {}

export const TicketModel = (sequelize: Sequelize) => {
  const ticket = sequelize.define<TicketInstance>('Tickets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Tickets'
  }) as ModelCtor<TicketInstance> & { associate: any };
  ticket.associate = (models: any) => {
    ticket.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
    ticket.hasMany(models.Reserve, { foreignKey: 'ticketId', as: 'reserves' });
  };
  return ticket;
};
