import supertest from 'supertest';
import app from 'src/app';
import { getUserAuthenticated, getEventId, getTicketId } from '../helpers';
import { sequelize } from 'src/database/models';

const userMock = {
  name: 'reserve test',
  email: 'reserve-test@gmail.com'
};
const reserveMock = {
  reserve: {
    quantity: 5,
    ticketId: ''
  },
  cardToken: '123456789'
};

let tokenMock: string = null;
let eventIdMock: string = null;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  tokenMock = await getUserAuthenticated(userMock.email, userMock.name);
  eventIdMock = await getEventId(tokenMock);
  reserveMock.reserve.ticketId = await getTicketId(tokenMock, eventIdMock);
});
afterAll(async () => {
  await sequelize.close();
});

describe('crud pack', () => {
  test('should create reserve', async () => {
    const resp =
      await supertest(app)
        .post('/reserves')
        .send({ ...reserveMock })
        .set({ authorization: tokenMock });

    expect(resp.statusCode).toBe(201);
  });

  test('should fail in reserve create because field contain null value', async () => {
    const reserve = reserveMock;
    reserve.reserve.quantity = null;
    const resp =
      await supertest(app)
        .post('/reserves')
        .send(reserve)
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('Esta faltando este campo obrigatório');
    expect(resp.body.data[0].field).toBe('quantity');
    expect(resp.statusCode).toBe(400);
  });
  test('should fail in reserve create because quantity is negative', async () => {
    const reserve = reserveMock;
    reserve.reserve.quantity = -15;
    const resp =
      await supertest(app)
        .post('/reserves')
        .send(reserve)
        .set({ authorization: tokenMock });
    expect(resp.body.data[0].message).toBe('A quantidade de bilhetes não pode ser negativo ou zero');
    expect(resp.body.data[0].field).toBe('quantity');
    expect(resp.statusCode).toBe(400);
  });
  test('should list reserves by ticket id', async () => {
    const resp =
      await supertest(app)
        .get(`/reserves?ticket=${reserveMock.reserve.ticketId}`)
        .set({ authorization: tokenMock });
    expect(resp.body.data.length).toBe(1);
    expect(resp.statusCode).toBe(200);
  });
  test('should list reserves by user id', async () => {
    const resp =
      await supertest(app)
        .get('/reserves')
        .set({ authorization: tokenMock });
    expect(resp.body.data.length).toBe(1);
    expect(resp.statusCode).toBe(200);
  });
});
