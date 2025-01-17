import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth } from 'src/auth/auth.schema';
import * as mongoose from 'mongoose';

export enum Category {
  ADVENTURE = 'adventure',
  FANTASY = 'fantasy',
  CRIME = 'crime',
  CLASSIC = 'classic',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: Auth;
}

export const BookSchema = SchemaFactory.createForClass(Book);
