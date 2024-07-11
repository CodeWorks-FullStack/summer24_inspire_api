import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { todosService } from "../services/TodosService.js";

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      // NOTE you must be logged in to do anything in this controller
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTodo)
      .get('', this.getMyTodos)
      .get('/:todoId', this.getTodoById)
      .put('/:todoId', this.updateTodo)
  }
  async createTodo(request, response, next) {
    try {
      const todoData = request.body
      const user = request.userInfo
      todoData.creatorId = user.id
      const todo = await todosService.createTodo(todoData)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async getMyTodos(request, response, next) {
    try {
      const user = request.userInfo
      const todos = await todosService.getMyTodos(user.id)
      response.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async getTodoById(request, response, next) {
    try {
      const todoId = request.params.todoId
      const todo = await todosService.getTodoById(todoId)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async updateTodo(request, response, next) {
    try {
      const todoId = request.params.todoId
      const todoUpdateData = request.body
      const todo = await todosService.updateTodo(todoId, todoUpdateData)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }
}