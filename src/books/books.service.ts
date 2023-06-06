import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  // get Books
  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(filter);
  }

  // get Book by id
  async getBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // create Book
  async createBook(createBookDto: CreateBookDto): Promise<void> {
    return await this.bookRepository.createBook(createBookDto);
  }

  // update Book
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    const { title, author, category, year } = updateBookDto;
    const book = await this.getBookById(id);
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    await book.save();
  }

  // delete Book
  async deleteBook(id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }
}
