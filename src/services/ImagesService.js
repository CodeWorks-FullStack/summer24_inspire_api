import { dbContext } from "../db/DbContext.js"

class ImagesService {
  async getRandomImage() {
    const imagesCount = await dbContext.Images.countDocuments()
    const randomSkip = Math.floor(Math.random() * imagesCount)
    // NOTE I am not selecting properties on my populate because the virtual has options on what to select
    const randomImage = await dbContext.Images.findOne().skip(randomSkip).populate('author')
    return randomImage
  }
  async createImage(imageData) {
    const image = await dbContext.Images.create(imageData)
    // NOTE I am not selecting properties on my populate because the virtual has options on what to select
    await image.populate('author')
    return image
  }
}

export const imagesService = new ImagesService()