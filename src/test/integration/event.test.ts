import supertest from 'supertest';
import app from 'src/app';
import { getUserAuthenticated } from '../helpers';
import { sequelize } from 'src/database/models';
import { EventDto } from 'src/dtos/event.dto';

const userMock = {
  name: 'event test',
  email: 'event-test@gmail.com'
};
const eventMock: EventDto = {
  title: 'test',
  description: 'description test',
  beginEvent: new Date('2021-11-07T03:52:11Z'),
  endEvent: new Date('2021-11-07T03:52:11Z'),
  address: {
    state: 'MA',
    city: 'Carutapera',
    district: 'Centro',
    street: 'Avenida Padre Mario Racca',
    number: '783'
  }
};

let tokenMock: string = null;
let eventIdMock: string = null;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  tokenMock = await getUserAuthenticated(userMock.email, userMock.name);
});
afterAll(async () => {
  await sequelize.close();
});

describe('crud pack', () => {
  test('should create event', async () => {
    const resp =
      await supertest(app)
        .post('/events')
        .send({ ...eventMock })
        .set({ authorization: tokenMock });

    eventIdMock = resp.body.data.id;
    expect(resp.statusCode).toBe(201);
  });

  test('should fail in event create because field contain null value', async () => {
    const resp =
      await supertest(app)
        .post('/events')
        .send({ description: null })
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('Esta faltando este campo obrigatório');
    expect(resp.body.data[0].field).toBe('description');
    expect(resp.statusCode).toBe(400);
  });

  test('should update event', async () => {
    const resp =
      await supertest(app)
        .put(`/events/${eventIdMock}`)
        .send({ description: 'Evento de teste(mudou)' })
        .set({ authorization: tokenMock });
    expect(resp.statusCode).toBe(200);
  });

  test('should fail in event update because the value of field is null', async () => {
    const resp =
      await supertest(app)
        .put(`/events/${eventIdMock}`)
        .send({ description: null })
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('Este campo não pode possuir valor nulo');
    expect(resp.body.data[0].field).toBe('description');
    expect(resp.statusCode).toBe(400);
  });

  test('should list events by user id', async () => {
    const resp =
      await supertest(app)
        .get(`/events?status=${true}`)
        .set({ authorization: tokenMock });
    expect(resp.body.data.length).toBe(1);
    expect(resp.statusCode).toBe(200);
  });

  test('should delete event', async () => {
    const eventCreated =
      await supertest(app)
        .post('/events')
        .send({ ...eventMock })
        .set({ authorization: tokenMock });

    const resp = await supertest(app)
      .delete(`/events/${eventCreated.body.data.id}`)
      .set({ authorization: tokenMock });

    expect(resp.statusCode).toBe(200);
  });
});
