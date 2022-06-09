import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const PackageSchema = new Schema(
  {
    address: { type: String, required: true },
    recipient: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    shipId: { type: ObjectId, ref: 'Ship' },
    creatorId: { type: ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PackageSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
