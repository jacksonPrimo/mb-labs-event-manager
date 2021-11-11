import { Request, Response } from 'express';
import reserveRepository from 'src/repositories/reserve.repository';
import { objectReturn } from 'src/helpers/functions';
import { ReturnError } from 'src/helpers/returnError';
import { tokenization } from 'src/helpers/tokenization';
import { pay } from 'src/helpers/gatewayMock';
import ticketRepository from 'src/repositories/ticket.repository';

class ReserveController {
  async create (request: Request, response: Response): Promise<Response> {
    const { body, headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id } = tokenization.decode(token);
    body.reserve.userId = id;
    body.reserve.id = new Date().getTime();
    try {
      const errorMessage = 'Erro ao cadastrar bilhete';
      reserveRepository.verifyRequiredFields({
        quantity: body.reserve.quantity,
        userId: body.reserve.userId,
        ticketId: body.reserve.ticketId
      }, errorMessage);
      const ticketFound = await ticketRepository.getTicket(body.reserve.ticketId, errorMessage);
      const currentTicketQuantity = ticketFound.quantity - body.reserve.quantity;
      if (currentTicketQuantity < 0) {
        throw new ReturnError(400, errorMessage, [
          {
            field: 'quantity',
            message: 'A quantidade excede a disponivel'
          }
        ]);
      }
      const amount = ticketFound.value * body.reserve.quantity;
      await pay({ amount, cardToken: body.cardToken, metadata: { reserveId: body.reserve.id } });
      const reserveCreated = await reserveRepository.create(body.reserve);
      await ticketRepository.update({ quantity: currentTicketQuantity } as any, body.reserve.ticketId);
      return response.status(201).json(objectReturn('reserva cadastrada com sucesso', reserveCreated, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao cadastrar a reserva', error, true, 500));
      }
    }
  }

  public async list (request: Request, response: Response): Promise<Response> {
    const { headers, query } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id: userId } = tokenization.decode(token);
    try {
      const reserves = await reserveRepository.list(userId, +query.ticketId);
      return response.status(200).json(objectReturn('Reservas encontradas', reserves, false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao listar reservas', error, true, 500));
      }
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      await reserveRepository.update(body);
      if (body.status === 'fail') {
        const reserve = await reserveRepository.get(`${body.id}`);
        const currentTicketQuantity = reserve.ticket.quantity + reserve.quantity;
        await ticketRepository.update({ quantity: currentTicketQuantity } as any, reserve.ticket.id);
      }
      return response.status(200).json(objectReturn('reserva atualizada com sucesso', [], false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao atualizar reserva', error, true, 500));
      }
    }
  }
}

export default new ReserveController();
