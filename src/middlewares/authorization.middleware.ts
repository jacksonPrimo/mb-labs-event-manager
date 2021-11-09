import { NextFunction, Request, Response } from 'express';
import { tokenization } from 'src/helpers/tokenization';
import { objectReturn } from 'src/helpers/functions';

export const logged = async (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    return response
      .status(401)
      .json(objectReturn('Necessário token', {}, true, 401));
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response
      .status(401)
      .json(objectReturn('Necessário token', {}, true, 401));
  }

  let checkedToken;
  try {
    checkedToken = await tokenization.validation(token);
  } catch (error) {
    console.log('Error in check token', error);
    return response
      .status(401)
      .json(objectReturn('Token inválido!', {}, true, 401));
  }

  if (!checkedToken) {
    return response
      .status(401)
      .json(objectReturn('Token inválido!', {}, true, 401));
  }

  next();
};
