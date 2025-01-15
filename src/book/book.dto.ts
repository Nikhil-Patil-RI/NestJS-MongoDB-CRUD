import { Category } from './book.schema';

export class BookDto {
  title: string;
  description: string;
  author: string;
  price: number;
  category: Category;
}
