import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // @Post()
  // createArticle(@Body() article: CreateArticleDto): Promise<Article> {
  //   return this.articleService.createArticle(article);
  // }

  // @Get()
  // getArticles(): Promise<Article[]> {
  //   return this.articleService.getArticles();
  // }

  // @Get(':id')
  // getArticleById(@Param('id') id: number): Promise<Article> {
  //   return this.articleService.getArticleById(id);
  // }

  // @Patch(':id')
  // updateArticleById(
  //   @Param('id') id: number,
  //   @Body() updateArticle: UpdateArticleDto,
  // ): Promise<Article> {
  //   return this.articleService.updateArticle(id, updateArticle);
  // }

  // @Delete(':id')
  // deleteArticleById(@Param('id') id: number): Promise<Article> {
  //   return this.articleService.deleteArticleById(id);
  // }
}
