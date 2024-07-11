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
}