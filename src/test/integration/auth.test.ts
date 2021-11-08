import { UserDto } from 'src/dtos/user.dto';
import supertest from 'supertest';
import app from 'src/app';
import { sequelize } from 'src/database/models';

const userMock: UserDto = {
  name: 'auth test',
  email: 'auth-test@gmail.com',
  password: 'teste'
};
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
describe('Authentication', () => {
  test('it should add new user', async () => {
    const response = await supertest(app).post('/auth/signup').send(userMock);
    expect(response.statusCode).toBe(200);
  });
  test('it should authenticated with valid credential', async () => {
    const user = {
      email: userMock.email,
      password: userMock.password
    };
    const { statusCode } = await supertest(app).post('/auth/signin').send(user);
    expect(statusCode).toBe(201);
  });
  test('should fail because user with email not found', async () => {
    const user = {
      email: 'aauthtest@gmail.com',
      password: 'authtest'
    };
    const response = await supertest(app).post('/auth/signin').send(user);
    expect(response.statusCode).toBe(404);
  });
  test('should fail because password its wrong', async () => {
    const user = {
      email: userMock.email,
      password: 'wrong password'
    };
    const response = await supertest(app).post('/auth/signin').send(user);
    expect(response.statusCode).toBe(400);
  });
});
