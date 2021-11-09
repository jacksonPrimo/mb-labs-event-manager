import { UserDto } from 'src/dtos/user.dto';
import { cryptography } from 'src/helpers/cryptography';
import { ReturnError } from 'src/helpers/returnError';
import { tokenization } from 'src/helpers/tokenization';
import UserRepository from 'src/repositories/user.repository';

class AuthService {
  public async signup (user: UserDto) {
    const errorMessage = 'Erro ao cadastrar usuário';
    UserRepository.verifyRequiredFields({
      name: user.name,
      email: user.email,
      password: user.password
    }, errorMessage);
    await UserRepository.validateIfEmailAlreadyInUse(user.email, errorMessage);

    return await UserRepository.create(user);
  };

  async signin (email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email, 'Erro ao logar');
    const passwordIsValid = cryptography.comparePassword(password, user.password);
    if (!passwordIsValid) {
      throw new ReturnError(400, 'Erro ao logar', [
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
