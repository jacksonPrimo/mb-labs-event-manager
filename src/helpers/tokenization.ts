import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  email: string;
}
class Tokenization {
  private secret: string = process.env.JWT_SECRET || '54b0c244319dc19951ffd6da2c95fdeb';
  private expiresIn: string = '4d'

  public generate (payload: TokenPayload) {
    const token = jwt.sign({ ...payload }, this.secret, { expiresIn: this.expiresIn });
    return token;
  }

  public async validation (token: string) {
    return jwt.verify(token, this.secret);
  };

  public decode (token: string): TokenPayload {
    const decoded = jwt.decode(token);
    return decoded as TokenPayload;
  };
}
export const tokenization = new Tokenization();
