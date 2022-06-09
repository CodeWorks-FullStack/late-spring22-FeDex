import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PackageSchema = new Schema(
  {
    // TODO write the Schema
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
