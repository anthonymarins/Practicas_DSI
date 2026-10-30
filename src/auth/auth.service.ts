import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(user: LoginDto) {
    // 1. Buscamos el usuario en la base de datos
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email }
    });

    if (!foundUser) return null;

    // 2. Comparamos las contraseñas
    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);

    // 3. Si es válida, generamos el JWT con sus datos
    if (isPasswordValid) {
      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      });
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}