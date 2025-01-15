import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from './book.schema';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Invalid category' })
  category: Category;
}
