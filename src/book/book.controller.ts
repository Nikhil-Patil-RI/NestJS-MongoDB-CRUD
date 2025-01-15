import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { BookDto } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/findAllBooks')
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
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
