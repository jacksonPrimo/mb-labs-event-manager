import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize';
import { EventDto } from 'src/dtos/event.dto';

interface EventCreationAttributes extends Optional<EventDto, 'id'> {}
interface EventInstance
  extends Model<EventDto, EventCreationAttributes>,
  EventDto {}

export const EventModel = (sequelize: Sequelize) => {
  const event = sequelize.define<EventInstance>('Events', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    beginEvent: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endEvent: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'Events'
  }) as ModelCtor<EventInstance> & { associate: any };
  event.associate = (models: any) => {
    event.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    event.hasMany(models.Ticket, { foreignKey: 'eventId', as: 'tickets' });
  };
  return event;
};
