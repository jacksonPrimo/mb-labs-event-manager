import request from 'supertest';
import app from 'src/app';
import { EventDto } from 'src/dtos/event.dto';

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
export async function getEventId (token: string) {
  const eventMock: EventDto = {
    title: 'test',
    description: 'description test',
    beginEvent: new Date('2021-11-07T08:00:00Z'),
    endEvent: new Date('2021-11-07T12:00:00Z')
  };
  const resp =
  await request(app)
    .post('/events')
    .send({ ...eventMock })
    .set({ authorization: token });

  return resp.body.data.id;
}
