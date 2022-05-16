import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Article } from './article.model';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  createArticle(@Body() article: CreateArticleDto): Article {
    return this.articleService.createArticle(article);
  }

  @Get()
  getArticles(): Article[] {
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): Article {
    return this.articleService.getArticleById(id);
  }

  @Patch(':id')
  updateArticleById(
    @Param('id') id: string,
    @Body() updateArticle: UpdateArticleDto,
  ): Article {
    return this.articleService.updateArticle(id, updateArticle);
  }

  @Delete(':id')
  deleteArticleById(@Param('id') id: string): void {
    return this.articleService.deleteArticleById(id);
  }
}
