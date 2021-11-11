'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Reserves', {
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
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Reserves');
  }
};
