import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '../users/model/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>
  ) {}

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

    const newUser = await this.userModel.create(userParse);

    return newUser;
  }

  /**
   * Iniciar sesion
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({
      email: userLoginBody.email,
    });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userFlat,
    };

    return data;
  }
}
