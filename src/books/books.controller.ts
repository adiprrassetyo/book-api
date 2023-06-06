import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';
import { UUIDValidationPipe } from 'src/pipes/uuid.validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  // get Books
  @Get()
  async getBooks(@Query() filter: FilterBookDto): Promise<Book[]> {
    return this.booksService.getBooks(filter);
  }

  // get Book by id
  @Get('/:id')
  async getBookById(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  // create Book
  @Post()
  async CreateBook(@Body() payload: CreateBookDto): Promise<void> {
    return this.booksService.createBook(payload);
  }

  // update Book
  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(id, payload);
  }

  // delete Book
  @Delete('/:id')
  async deleteBook(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
