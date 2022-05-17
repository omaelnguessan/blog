import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, editUser: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...editUser },
    });

    delete user.password;

    return user;
  }
}
