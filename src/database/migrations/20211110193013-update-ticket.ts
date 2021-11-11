'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Tickets', 'value', {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Tickets', 'value');
  }
};
