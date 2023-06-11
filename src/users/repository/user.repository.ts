/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './../entity/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(`Email ${email} already exists`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }
}
