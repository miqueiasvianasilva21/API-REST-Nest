import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService, ITodo } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getHello(): ITodo[] {
    const todos = this.appService.getTodos();
    return todos;
  }
  
  @Post('/todos')
  postTodo(@Body() todo): boolean{
    console.log(todo)
    return this.appService.addTodos(todo);
    
  }
  @Put('/todos/:id')
  putTodo(@Body() todo, @Param('id') id : String): ITodo | Error{
    // console.log(todo)
    return this.appService.updateTodos(id,todo);
    
  }

  @Delete('todos/:id')
  deleteTodo(@Param('id') id : String): boolean{
    // console.log(todo)
    return this.appService.deleteTodos(id);
    
  }



}
