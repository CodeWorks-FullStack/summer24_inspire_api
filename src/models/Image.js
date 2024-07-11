import { Schema } from "mongoose";

export const ImageSchema = new Schema(
  {
    image: { type: String, required: true, minlength: 8, maxlength: 2000 },
    authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

ImageSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})