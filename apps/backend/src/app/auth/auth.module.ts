import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../users/model/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtHandle } from './utils/jwt-handle';
import { IsEmailAlreadyExistConstraint } from './utils/validators/is-email-already-exist.constraint';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtHandle,
    UsersService,
    IsEmailAlreadyExistConstraint,
  ],
  exports: [JwtHandle],
})
export class AuthModule {}
