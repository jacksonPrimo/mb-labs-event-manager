let config;
switch (process.env.NODE_ENV) {
  case 'test':
    config = {
      host: 'localhost',
      username: 'pguser',
      password: 'pgpassword',
      database: 'test',
      dialect: 'postgres',
      define: {
        timestamps: true
      }
    };
    break;
  case 'production':
    config = {
      host: process.env.DBHOST,
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      dialect: process.env.DBPASSWORD || 'postgres',
      define: {
        timestamps: true
      }
    };
    break;
  default:
    config = {
      host: 'localhost',
      username: 'pguser',
      password: 'pgpassword',
      database: 'development',
      dialect: 'postgres',
      define: {
        timestamps: true
      }
    };
}
module.exports = config;
