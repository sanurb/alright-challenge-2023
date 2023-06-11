import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { generateHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {
  /**
   * Registrar un usuario
   * @param userBody
   * @returns
   */
  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    const userParse = {
      ...user,
      password: await generateHash(password),
    };

    // const newUser = await this.userModel.create(userParse);

    // return newUser;
  }
}
