import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { BookDto } from './book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @UseGuards(AuthGuard())
  @Get('/findAllBooks')
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post('/addBook')
  @UseGuards(AuthGuard())
  async addBook(@Body() book: BookDto , @Req() req): Promise<Book> {
    // console.log(req.user);

    return this.bookService.insertBook(book, req.user);
  }

  @Get('/findBookById/:id')
  @UseGuards(AuthGuard())
  async findBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Put('/updateBook/:id')
  @UseGuards(AuthGuard())
  async updateBook(
    @Param('id') id: string,
    @Body() book: BookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, book);
  }

  @Delete('/deleteBook/:id')
  @UseGuards(AuthGuard())
  async deleteBookById(@Param('id') id: string): Promise<string> {
    return this.bookService.deleteBookById(id);
  }
}
