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
import { BookService } from './book.service';
import { Book } from './book.schema';
import { BookDto } from './book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/findAllBooks')
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post('/addBook')
  async addBook(@Body() book: BookDto): Promise<Book> {
    return this.bookService.insertBook(book);
  }

  @Get('/findBookById/:id')
  async findBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Put('/updateBook/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: BookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, book);
  }

  @Delete('/deleteBook/:id')
  async deleteBookById(@Param('id') id: string): Promise<string> {
    return this.bookService.deleteBookById(id);
  }
}
