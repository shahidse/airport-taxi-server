import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';
import { IsUniqueConstraint } from 'src/decorators/isUnique.decorator';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    IsUniqueConstraint,
    createRepositoryProvider(Schemas.USERS),
    createRepositoryProvider(Schemas.ROLES),
  ],
})
export class UsersModule {}
