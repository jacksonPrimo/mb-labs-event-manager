import supertest from 'supertest';
import app from 'src/app';
import { getUserAuthenticated, getEventId } from '../helpers';
import { sequelize } from 'src/database/models';
import { TicketDto } from 'src/dtos/ticket.dto';

const userMock = {
  name: 'ticket test',
  email: 'ticket-test@gmail.com'
};
const ticketMock: TicketDto = {
  title: 'bilhete de teste',
  description: 'descrição de um bilhete de teste',
  quantity: 100,
  value: 10
};

let tokenMock: string = null;
let eventIdMock: string = null;
let ticketIdMock: string = null;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  tokenMock = await getUserAuthenticated(userMock.email, userMock.name);
  eventIdMock = await getEventId(tokenMock);
});
afterAll(async () => {
  await sequelize.close();
});

describe('crud pack', () => {
  test('should create ticket', async () => {
    const resp =
      await supertest(app)
        .post('/tickets')
        .send({ ...ticketMock, eventId: eventIdMock })
        .set({ authorization: tokenMock });

    ticketIdMock = resp.body.data.id;
    expect(resp.statusCode).toBe(201);
  });

  test('should fail in ticket create because field contain null value', async () => {
    const resp =
      await supertest(app)
        .post('/tickets')
        .send({ description: null })
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('Esta faltando este campo obrigatório');
    expect(resp.body.data[0].field).toBe('description');
    expect(resp.statusCode).toBe(400);
  });

  test('should update ticket', async () => {
    const resp =
      await supertest(app)
        .put(`/tickets/${ticketIdMock}`)
        .send({ description: 'bilhete de teste(mudou)' })
        .set({ authorization: tokenMock });
    expect(resp.statusCode).toBe(200);
  });

  test('should fail in ticket update because the value of field is null', async () => {
    const resp =
      await supertest(app)
        .put(`/tickets/${ticketIdMock}`)
        .send({ description: null })
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('Este campo não pode possuir valor nulo');
    expect(resp.body.data[0].field).toBe('description');
    expect(resp.statusCode).toBe(400);
  });

  test('should delete ticket', async () => {
    const ticketCreated =
      await supertest(app)
        .post('/tickets')
        .send({ ...ticketMock, eventId: eventIdMock })
        .set({ authorization: tokenMock });

    const resp = await supertest(app)
      .delete(`/tickets/${ticketCreated.body.data.id}`)
      .set({ authorization: tokenMock });

    expect(resp.statusCode).toBe(200);
  });
});
