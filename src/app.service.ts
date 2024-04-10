import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


const data = [{
  id: 'e6273c95-40a0-4bb2-adaf-203e504eea1a',
  'titulo': 'escovar_os_dentes',
  descricao: 'escovar os dentes'
},
{
  id: '38c4e213-b702-4324-962f-ee044a878066',
  titulo: 'lavar_louça',
  descricao: 'lavar toda louça do almoço'
},
{
  id: '7be75d52-668a-49f8-8b5f-c4baf0c261ce',
  titulo: 'tomar_banho',
  descricao: 'tomar banho'
}
]

export interface ITodo {
  id: string,
  titulo: string,
  descricao: string,

}

@Injectable()
export class AppService {

//READ
  getTodos(): ITodo[] {
    return data;
  }

//CREATE
  addTodos(todo: ITodo) {
    try {
      const todoKeys = Object.keys(todo);
      if (todoKeys.length > 2 || !todo.titulo || !todo.descricao) {
        throw new Error("O objeto de TODO fornecido deve ter exatamente os campos titulo e descricao apenas.");
      }
      const newTodo = { ...todo, id: uuidv4() as string }
      data.push(newTodo)
      return true

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }

//UPDATE
  updateTodos(id, todoUpdate) {
    try {
      const aux = data.findIndex(todo => todo.id === id)
      if (aux < 0) {
        throw new Error("todo não encontrado")
      }
      data[aux] = { ...data[aux], ...todoUpdate }

      return data[aux];

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
  }
  
//DELETE
  deleteTodos(id) {
    try{
      const aux = data.findIndex(todo => todo.id === id)
      if (aux < 0) {
        throw new Error("todo não encontrado");    
      }
      data.splice(aux, 1)
      return true

    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND,{
        cause: error
      })

    }

  }


}
