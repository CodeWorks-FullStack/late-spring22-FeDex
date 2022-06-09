import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ShipSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ShipSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
