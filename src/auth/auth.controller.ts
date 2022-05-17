import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login-user.dto';
import { UserRegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() userRegister: UserRegisterDto): Promise<User> {
    return this.authService.register(userRegister);
  }

  @Post('login')
  login(@Body() userLogin: UserLoginDto) {
    return this.authService.login(userLogin);
  }
}
