import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  // get Books
  async getBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(user, filter);
  }

  // get Book by id
  async getBookById(user: User, id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id, { where: { user } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // create Book
  async createBook(user: User, createBookDto: CreateBookDto): Promise<void> {
    return await this.bookRepository.createBook(user, createBookDto);
  }

  // update Book
  async updateBook(
    id: string,
    user: User,
    updateBookDto: UpdateBookDto,
  ): Promise<void> {
    const { title, author, category, year } = updateBookDto;
    const book = await this.getBookById(user, id);
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    await book.save();
  }

  // delete Book
  async deleteBook(user: User, id: string): Promise<void> {
    const result = await this.bookRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }
}
