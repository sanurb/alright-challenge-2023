import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './model/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: CreateUserDto
  ): Promise<UserDocument> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.delete(id);
  }
}
