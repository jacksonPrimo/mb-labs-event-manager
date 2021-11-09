import { Request, Response } from 'express';
import eventRepository from 'src/repositories/event.repository';
import { objectReturn } from 'src/helpers/functions';
import { ReturnError } from 'src/helpers/returnError';
import { tokenization } from 'src/helpers/tokenization';

class EventController {
  async create (request: Request, response: Response): Promise<Response> {
    const { body, headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id } = tokenization.decode(token);
    body.userId = id;
    try {
      const eventCreated = await eventRepository.create(body);
      return response.status(201).json(objectReturn('Evento cadastrada com sucesso', eventCreated, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao cadastrar a evento', error, true, 500));
      }
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { body, params } = request;
    try {
      await eventRepository.update(body, params.eventId);
      return response.status(200).json(objectReturn('Evento atualizada com sucesso', [], false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao atualizar evento', error, true, 500));
      }
    }
  }

  public async list (request: Request, response: Response): Promise<Response> {
    const { headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id: userId } = tokenization.decode(token);
    try {
      const events = await eventRepository.list(userId);
      return response.status(200).json(objectReturn('Eventos encontradas', events, false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao listar eventos', error, true, 500));
      }
    }
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { params, headers } = request;

    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id: userId } = tokenization.decode(token);

    try {
      await eventRepository.delete(params.eventId, userId);
      return response.status(200).json(objectReturn('Evento deletada com sucesso', [], false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao deletar evento', error, true, 500));
      }
    }
  }
}

export default new EventController();
