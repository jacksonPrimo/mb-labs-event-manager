import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize';
import { ReserveDto } from 'src/dtos/reserve.dto';

interface ReserveCreationAttributes extends Optional<ReserveDto, 'id'> {}
interface ReserveInstance
  extends Model<ReserveDto, ReserveCreationAttributes>,
  ReserveDto {}

export const ReserveModel = (sequelize: Sequelize) => {
  const reserve = sequelize.define<ReserveInstance>('Reserves', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('waiting', 'paid', 'fail'),
      allowNull: false,
      defaultValue: 'waiting'
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
    tableName: 'Reserves'
  }) as ModelCtor<ReserveInstance> & { associate: any };
  reserve.associate = (models: any) => {
    reserve.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    reserve.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' });
  };
  return reserve;
};
