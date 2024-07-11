import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { QuoteSchema } from '../models/Quote.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Quotes = mongoose.model('Quote', QuoteSchema);
}

export const dbContext = new DbContext()
