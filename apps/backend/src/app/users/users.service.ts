import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, UserModel } from './model/user.schema';
import { UserOutputDto } from './dto/user-output.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .orFail(new NotFoundException(`User with id ${id} not found`));
    return user;
  }

  async update(id: string, dto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .orFail(new NotFoundException(`User with id ${id} not found`));
    return user;
  }

  async delete(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndRemove(id)
      .orFail(new NotFoundException(`User with id ${id} not found`));
    return user;
  }
}
