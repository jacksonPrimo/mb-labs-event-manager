import { UserDto } from 'src/dtos/user.dto';
import { cryptography } from 'src/helpers/cryptography';
import ErrorReturn from 'src/helpers/errorReturn';
import { tokenization } from 'src/helpers/tokenization';
import UserRepository from 'src/repositories/UserRepository';

class AuthService {
  public async signup (user: UserDto) {
    const errorMessage = 'Erro ao cadastrar usuário';
    try {
      UserRepository.verifyRequiredFields({
        name: user.name,
        email: user.email,
        password: user.password
      }, errorMessage);
      await UserRepository.validateIfEmailAlreadyInUse(user.email, errorMessage);

      return await UserRepository.create(user);
    } catch (error: any) {
      if (error.constructor.name === 'StripeInvalidRequestError') {
        throw new ErrorReturn(error.statusCode, 'Erro ao cadastrar usuário', [{
          field: error.raw.param,
          message: error.raw.message
        }]);
      } else throw error;
    }
  };

  async signin (email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email, 'Erro ao logar');
    const passwordIsValid = cryptography.comparePassword(password, user.password);
    if (!passwordIsValid) {
      throw new ErrorReturn(400, 'Erro ao logar', [
        {
          field: 'password',
          message: 'Senha inválida!'
        }
      ]);
    }
    const { id } = user;
    return { token: tokenization.generate({ id, email }) };
  }
}
export default new AuthService();
