import { dbContext } from "../db/DbContext.js"

class QuotesService {

  async getRandomQuote() {
    // NOTE counts all of the documents in the database (similar to length of an array)
    const quotesCount = await dbContext.Quotes.countDocuments()
    // NOTE random number between -1 and the amount of documents in the database (0-74)
    const randomSkipAmount = Math.floor(Math.random() * quotesCount)
    // NOTE findOne returns one document, and can take in a filter object. If no filter object is provided, findOne returns the first document from the database. If a skip is provided, findOne will ignore however many documents are provided and then return a document
    const quote = await dbContext.Quotes.findOne().skip(randomSkipAmount).populate('author', 'name picture')
    return quote
  }

  async createQuote(quoteData) {
    const quote = await dbContext.Quotes.create(quoteData)
    await quote.populate('author', 'name picture')
    return quote
  }
}

export const quotesService = new QuotesService()