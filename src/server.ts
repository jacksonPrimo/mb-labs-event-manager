import app from './app';
import { sequelize } from './database/models';
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`server runing in port: ${PORT}`);
});
