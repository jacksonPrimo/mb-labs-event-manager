import request from 'supertest';
import app from 'src/app';

export async function getUserAuthenticated (email: string, name: string) {
  const userMock = {
    email,
    name,
    password: 'teste'
  };
  await request(app).post('/auth/signup').send(userMock);
  const userAuthenticated = await request(app).post('/auth/signin').send({ email, password: userMock.password });
  return `Bearer ${userAuthenticated.body.data.token}`;
}
