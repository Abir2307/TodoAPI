import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {

    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async create(createTodoDto: Partial<Todo>): Promise<Todo> {
        const createdTodo = new this.todoModel(createTodoDto);
        return createdTodo.save();
    }
    async findAll(status?: string): Promise<Todo[]> {
      if (status === 'completed') {
        return this.todoModel.find({ completed: true }).exec();
        }     
      else if (status === 'pending') {
        return this.todoModel.find({ completed: false }).exec();
    }
        return this.todoModel.find().exec(); // Return all
    }  
    async findOne(id: string): Promise<Todo> {
        const todo = await this.todoModel.findById(id).exec();
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async update(id: string, updateTodoDto: Partial<Todo>): Promise<Todo> {
        const todo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async remove(id: string): Promise<Todo> {
        const todo = await this.todoModel.findByIdAndDelete(id).exec();
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }    
}
