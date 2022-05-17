import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Article, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Get()
  getArticles(): Promise<Article[]> {
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticleById(@Param('id') id: number): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  createArticle(
    @GetUser() user: User,
    @Body() article: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.createArticle(user.id, article);
  }

  @Get('/auth/user')
  getArticlesByAuthUser(@GetUser() user: User): Promise<Article[]> {
    return this.articleService.getArticleByAuthorId(user.id);
  }

  @Get(':id/auth/user')
  getArticlesByIdAndAuthor(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<Article> {
    return this.articleService.getArticleByIdAndAuthorId(user.id, id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateArticleById(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateArticle: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(user.id, id, updateArticle);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteArticleById(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<Article> {
    return this.articleService.deleteArticleById(user.id, id);
  }
}
