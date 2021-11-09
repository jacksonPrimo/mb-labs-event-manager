import { ModelCtor } from 'sequelize';
import { ReturnError } from './returnError';

export class RepositoryValidators {
  constructor (private model: ModelCtor<any>) {
    this.model = model;
  }

  public verifyRequiredFields (entity: any, message: string) {
    const invalidFields = [];
    for (const field in entity) {
      if (entity[field] === null || entity[field] === '') {
        invalidFields.push({ message: 'Esta faltando este campo obrigatório', field });
      }
    };
    if (invalidFields.length) {
      throw new ReturnError(400, message, invalidFields);
    }
  }

  public verifyNullFields (entity: any, message: string) {
    const fields = this.model.rawAttributes;
    const invalidFields = [];
    for (const field in entity) {
      if (
        entity[field] === null &&
        !!fields[field] &&
        fields[field].allowNull === false
      ) {
        invalidFields.push({ message: 'Este campo não pode possuir valor nulo', field });
      }
    };
    if (invalidFields.length) {
      throw new ReturnError(400, message, invalidFields);
    }
  }

  public verifyEnunFields (entity: any, message: string) {
    const fields = this.model.rawAttributes;
    const invalidFields = [];
    for (const field in entity) {
      if (!fields[field].values.includes(entity[field])) {
        invalidFields.push({ message: 'Este campo possui um valor incorreto', field });
      }
    };
    if (invalidFields.length) {
      throw new ReturnError(400, message, invalidFields);
    }
  }
}
