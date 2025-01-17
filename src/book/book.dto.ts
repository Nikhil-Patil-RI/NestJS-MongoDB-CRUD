import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from './book.schema';
import { Auth } from 'src/auth/auth.schema';

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

  @IsEmpty({ message: 'you cannot pass user id' })
  user: Auth;
}
