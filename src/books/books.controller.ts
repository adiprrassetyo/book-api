import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  // get All Books
  @Get()
  getBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('category') category: string,
  ) {
    return this.booksService.getBooks(title, author, category);
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  // create a Book n send text success
  @Post()
  createBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('category') category: string,
  ) {
    return this.booksService.createBook(title, author, category);
  }

  // update a Book
  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('category') category: string,
  ) {
    return this.booksService.updateBook(id, title, author, category);
  }

  // delete a Book
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
