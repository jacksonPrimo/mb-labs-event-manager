import { Request, Response } from 'express';

import { ReturnError } from '../helpers/returnError';
import { objectReturn } from '../helpers/functions';
import authService from 'src/services/auth.service';

class AuthController {
  public async signup (request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      await authService.signup(body);
      return response.json(objectReturn('Usuário criado com sucesso', {}, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao cadastrar usuário', error, true, 500));
      }
    }
  }

  public async signin (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const { token } = await authService.signin(email, password);
      return response.status(201).json(objectReturn('Login efetuado com sucesso', { token }, false, 201));
    } catch (error) {
      console.log(error);
      if (error instanceof ReturnError) {
        return response.status(error.code).json(objectReturn(error.message, error.fields, true, error.code));
      } else {
        return response.status(500).json(objectReturn('Erro ao fazer login', error, true, 500));
      }
    }
  }
}

export default new AuthController();
