import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TodosService {

  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMyTodos(userId) {
    // --------------------------------------{ creatorId: '65f87bc1e02f1ee243874743' }
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }

  async getTodoById(todoId) {
    const todo = await dbContext.Todos.findById(todoId)
    if (!todo) throw new BadRequest(`No Todo found with the id of ${todoId}`)
    return todo
  }

  async updateTodo(todoId, userId, todoUpdateData) {
    const originalTodo = await this.getTodoById(todoId)

    if (userId != originalTodo.creatorId)
      throw new Forbidden(`YOU CAN NOT UPDATE A TODO YOU DID NOT CREATE, BUD`)

    originalTodo.description = todoUpdateData.description || originalTodo.description
    // ?? nullish coalescing operator, checks if the left-hand side is null or undefined, and defaults to left if that is so
    originalTodo.completed = todoUpdateData.completed ?? originalTodo.completed

    await originalTodo.save()
    return originalTodo
  }
  async destroyTodo(todoId, userId) {
    const todoToDestroy = await this.getTodoById(todoId)

    // NOTE check to see if the user making the request created the piece of data
    if (userId != todoToDestroy.creatorId)
      throw new Forbidden("YOU CAN NOT DELETE A TODO THAT YOU DID NOT CREATE, PAL")

    // REVIEW do this AFTER passing the check above
    await todoToDestroy.deleteOne()
    return `${todoToDestroy.description} has been deleted, big dawg!`
  }
}

export const todosService = new TodosService()