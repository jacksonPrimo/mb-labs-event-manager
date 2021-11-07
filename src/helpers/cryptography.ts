import bcrypt from 'bcryptjs';
class Cryptography {
  private salt: number = 8;
  encryptPassword (password: string) {
    return bcrypt.hashSync(password, this.salt);
  }

  comparePassword (password: string, storedPassword: string) {
    return bcrypt.compareSync(password, storedPassword);
  }
}
export const cryptography = new Cryptography();
