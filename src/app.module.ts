import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
