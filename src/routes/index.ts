import fs from 'fs';
import path from 'path';
import { Router } from 'express';
const basename = path.basename(__filename);
const router = Router();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ('.js' || '.ts'));
  })
  .forEach(file => {
    const routeName = file.split('.')[0];
    router.use(routeName, require(`./${routeName}`));
  });
export default router;
