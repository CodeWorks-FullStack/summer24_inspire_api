import { dbContext } from "../db/DbContext.js"

class ImagesService {
  async getRandomImage() {
    const imagesCount = await dbContext.Images.countDocuments()
    const randomSkip = Math.floor(Math.random() * imagesCount)
    const randomImage = await dbContext.Images.findOne().skip(randomSkip).populate('author', 'name picture')
    return randomImage
  }
}

export const imagesService = new ImagesService()