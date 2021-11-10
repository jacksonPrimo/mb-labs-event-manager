import { Request, Response } from 'express';
import ticketRepository from 'src/repositories/ticket.repository';
import { objectReturn } from 'src/helpers/functions';
import { ReturnError } from 'src/helpers/returnError';
import { tokenization } from 'src/helpers/tokenization';

class TicketController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { body, headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id } = tokenization.decode(token);
    body.userId = id;
    try {
      const TicketCreated = await ticketRepository.create(body);
      return response.status(201).json(objectReturn('Bilhete cadastrada com sucesso', TicketCreated, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao cadastrar a bilhete', error, true, 500));
      }
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { body, params } = request;
    try {
      await ticketRepository.update(body, params.ticketId);
      return response.status(200).json(objectReturn('Bilhete atualizada com sucesso', [], false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao atualizar bilhete', error, true, 500));
      }
    }
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { params } = request;

    try {
      await ticketRepository.delete(params.ticketId);
      return response.status(200).json(objectReturn('Bilhete deletada com sucesso', [], false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao deletar bilhete', error, true, 500));
      }
    }
  }
}

export default new TicketController();
