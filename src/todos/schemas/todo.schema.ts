import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;
    @Prop({ default: false })
    completed: boolean;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
