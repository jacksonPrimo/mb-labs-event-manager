import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserDto } from 'src/dtos/user.dto';

interface UserCreationAttributes extends Optional<UserDto, 'id'> {}
interface UserInstance
  extends Model<UserDto, UserCreationAttributes>,
  UserDto {}

const User = (sequelize: Sequelize) => {
  const user = sequelize.define<UserInstance>('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Users'
  });
  return user;
};

module.exports = User;