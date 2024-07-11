import { dbContext } from "../db/DbContext.js"

class TodosService {
  async getMyTodos(userId) {
    // --------------------------------------{ userId: '65f87bc1e02f1ee243874743' }
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }
  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }
}

export const todosService = new TodosService()