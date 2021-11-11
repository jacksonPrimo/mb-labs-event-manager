import request from 'supertest';
import app from 'src/app';
import { EventDto } from 'src/dtos/event.dto';
import { TicketDto } from 'src/dtos/ticket.dto';

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
export async function getTicketId (token: string, eventId: string) {
  const ticketMock: TicketDto = {
    title: 'bilhete de teste',
    description: 'descrição de um bilhete de teste',
    quantity: 100,
    value: 10
  };
  const resp =
  await request(app)
    .post('/tickets')
    .send({ ...ticketMock, eventId: eventId })
    .set({ authorization: token });

  return resp.body.data.id;
}
