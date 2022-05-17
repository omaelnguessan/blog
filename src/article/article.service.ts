import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticles(): Promise<Article[]> {
    return await this.prisma.article.findMany({});
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) throw new NotFoundException();

    return article;
  }

  async createArticle(
    userId: number,
    article: CreateArticleDto,
  ): Promise<Article> {
    const newArticle: Article = await this.prisma.article.create({
      data: { title: article.title, content: article.content, userId: userId },
    });

    return newArticle;
  }

  async getArticleByIdAndAuthorId(
    id: number,
    userId: number,
  ): Promise<Article> {
    const article = await this.prisma.article.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!article) throw new NotFoundException();

    return article;
  }

  async getArticleByAuthorId(userId: number): Promise<Article[]> {
    return await this.prisma.article.findMany({ where: { userId: userId } });
  }

  async updateArticle(
    userId: number,
    id: number,
    articleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.prisma.article.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!article) throw new NotFoundException();

    return await this.prisma.article.update({
      where: { id },
      data: { ...articleDto },
    });
  }

  async deleteArticleById(userId: number, id: number): Promise<Article> {
    const article = this.getArticleByIdAndAuthorId(id, userId);
    return await this.prisma.article.delete({
      where: { id: id },
    });
  }
}
