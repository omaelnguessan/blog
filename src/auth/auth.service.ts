import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRegisterDto } from './dto/register-user.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLoginDto } from './dto/login-user.dto';
import { throws } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(userRegister: UserRegisterDto): Promise<User> {
    const { firstname, lastname, email, password } = userRegister;
    const hash = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: { firstname, lastname, email, password: hash },
    });

    delete user.password;

    return user;
  }

  async login(loginUser: UserLoginDto) {
    const { email, password } = loginUser;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatch = await argon.verify(user.password, password);
    if (!passwordMatch) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
