import { ReturnError } from 'src/helpers/returnError';
import { cryptography } from 'src/helpers/cryptography';
import { RepositoryValidators } from 'src/helpers/repositoryValidators';

import Models from 'src/database/models';
import { UserDto } from 'src/dtos/user.dto';

class UserRespository extends RepositoryValidators {
  public async findUserById (id: number): Promise<UserDto> {
    const user = await Models.User.findByPk(id);
    if (!user) {
      throw new ReturnError(404, 'Erro ao buscar usuário', [
        {
          field: 'id',
          message: 'Não existe um usuário com este id'
        }
      ]);
    }
    return user;
  }

  public async findUserByEmail (email: string, message: string): Promise<UserDto> {
    const user = await Models.User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'name']
    });
    if (!user) {
      throw new ReturnError(404, message, [
        {
          field: 'email',
          message: 'Não existe um usuário com este email'
        }
      ]);
    }
    return user;
  }

  public async validateIfEmailAlreadyInUse (email: string, message: string): Promise<void> {
    const emailAlreadyInUse = await Models.User.findOne({
      where: {
        email: email.trim()
      },
      attributes: ['id']
    });
    if (emailAlreadyInUse) {
      throw new ReturnError(400, message, [
        {
          message: 'Este email ja está em uso',
          field: 'email'
        }
      ]);
    }
  }

  public async get (id: number): Promise<UserDto> {
    const user = await Models.User.findByPk(id);
    if (!user) {
      throw new ReturnError(404, 'Erro ao buscar usuário', [
        {
          field: 'id',
          message: 'Não existe um usuário com este id'
        }
      ]);
    }
    return user;
  }

  public async create (user: UserDto): Promise<UserDto> {
    const { password } = user;
    user.password = cryptography.encryptPassword(password);
    return await Models.User.create(user);
  };

  public async update (user: UserDto, userId: number) {
    const errorMessage = 'Erro ao atualizar usuário';
    const { email, password } = user;
    const userFound = await this.findUserById(userId);
    if (email && email !== userFound.email) {
      await this.validateIfEmailAlreadyInUse(email, errorMessage);
    }
    if (password) {
      user.password = cryptography.encryptPassword(password);
    }
    this.verifyNullFields(user, errorMessage);
    return await Models.User.update(user, { where: { id: userId } });
  };
}

export default new UserRespository(Models.User);
