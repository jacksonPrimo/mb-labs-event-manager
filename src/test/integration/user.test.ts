import supertest from 'supertest';
import app from 'src/app';
import { sequelize } from 'src/database/models';
import { getUserAuthenticated } from '../helpers';
import { UserDto } from 'src/dtos/user.dto';

const userMock = {
  name: 'user test',
  email: 'user-test@gmail.com'
};
let tokenMock: string = null;
beforeAll(async () => {
  await sequelize.sync({ force: true });
  tokenMock = await getUserAuthenticated(userMock.email, userMock.name);
});

afterAll(async () => {
  await sequelize.close();
});

describe('crud user', () => {
  test('should find user by id', async () => {
    const resp = await supertest(app).get('/users').set({ authorization: tokenMock });
    expect(resp.statusCode).toBe(200);
  });
  test('should update user data', async () => {
    const updateUser = { name: 'mudou' };
    const resp = await supertest(app).put('/users').send(updateUser).set({ authorization: tokenMock });
    expect(resp.statusCode).toBe(200);
  });
  test('should fail in update user data because email already in use', async () => {
    const user2: UserDto = {
      name: 'user 2',
      email: 'user-test2@gmail.com',
      password: '123456'
    };
    await supertest(app).post('/auth/signup').send(user2);
    const resp = await supertest(app).put('/users').send({ email: user2.email }).set({ authorization: tokenMock });
    expect(resp.statusCode).toBe(400);
    expect(resp.body.message).toBe('Erro ao atualizar usuário');
    expect(resp.body.data[0].message).toBe('Este email ja está em uso');
  });
});
