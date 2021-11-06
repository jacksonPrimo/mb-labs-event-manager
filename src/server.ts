import app from './app';
import db from './database/models';
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`server runing in port: ${PORT}`);
});
