import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <- Agrega esto

@Module({
  imports: [PrismaModule], // <- Agrega esto
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}