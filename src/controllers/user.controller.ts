import { Request, Response } from 'express';

import UserRepository from '@repository/UserRepository';
import { objectReturn } from '../helpers/functions';
import ErrorReturn from 'src/helpers/errorReturn';
import { tokenization } from 'src/helpers/tokenization';

class UserController {
  public async get (request: Request, response: Response): Promise<Response> {
    const { headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id: userId } = tokenization.decode(token);

    try {
      const user = await UserRepository.get(userId);
      return response.status(200).json(objectReturn('Usuário encontrado', user, false, 200));
    } catch (error) {
      console.log(error);
      if (error instanceof ErrorReturn) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao buscar usuário', error, true, 500));
      }
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { body, headers } = request;
    const authorization = headers.authorization;
    const [, token] = authorization.split(' ');
    const { id: userId } = tokenization.decode(token);
    try {
      await UserRepository.update(body, userId);
      return response.json(objectReturn('Usuário atualizado com sucesso!', {}, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ErrorReturn) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro interno do servidor', error, true, 500));
      }
    }
  }
}

export default new UserController();
