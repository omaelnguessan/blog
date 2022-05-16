import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    PrismaModule,
  ],
})
export class AppModule {}
