import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { v4 as uuid } from 'uuid';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  private articleList = [];

  getArticles(): Article[] {
    return this.articleList;
  }

  getArticleById(id: string): Article {
    const article = this.articleList.find((article) => article.id === id);
    if (!article) throw new NotFoundException();
    return article;
  }

  createArticle(article: CreateArticleDto): Article {
    const newArticle: Article = {
      id: uuid(),
      title: article.title,
      content: article.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.articleList.push(newArticle);

    return newArticle;
  }

  updateArticle(id: string, articleDto: UpdateArticleDto): Article {
    const { title, content } = articleDto;
    const index: number = this.articleList.findIndex(
      (article) => article.id === id,
    );

    this.articleList[index] = {
      id,
      title,
      content,
      created_at: this.articleList[index].created_at,
      updated_at: new Date().toISOString(),
    };

    return this.articleList[index];
  }

  deleteArticleById(id: string): void {
    this.articleList = this.articleList.filter(
      (article: Article) => article.id !== id,
    );
  }
}
