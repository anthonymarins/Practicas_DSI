import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport'; // <- Agrega esto
import { JwtStrategy } from './strategies/jwt.strategy'; // <- Agrega esto

@Module({
  imports: [
    PassportModule, // <- Agrega esto
    PrismaModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // <- Agrega JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}