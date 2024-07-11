import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TodosService {

  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMyTodos(userId) {
    // --------------------------------------{ userId: '65f87bc1e02f1ee243874743' }
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }

  async getTodoById(todoId) {
    const todo = await dbContext.Todos.findById(todoId)
    if (!todo) throw new BadRequest(`No Todo found with the id of ${todoId}`)
    return todo
  }

  async updateTodo(todoId, todoUpdateData) {
    const originalTodo = await dbContext.Todos.findById(todoId)
    originalTodo.description = todoUpdateData.description || originalTodo.description
    // ?? nullish coalescing operator, checks if the left-hand side is null or undefined, and defaults to left if that is so
    originalTodo.completed = todoUpdateData.completed ?? originalTodo.completed
    await originalTodo.save()
    return originalTodo
  }
  async destroyTodo(todoId) {
    const todoToDestroy = await dbContext.Todos.findById(todoId)
    await todoToDestroy.deleteOne()
    return `${todoToDestroy.description} has been deleted, big dawg!`
  }
}

export const todosService = new TodosService()