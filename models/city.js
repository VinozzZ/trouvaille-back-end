import mongoose from 'mongoose'

const Schema = mongoose.Schema

const citySchema = new Schema({
  desc: { type: String, required: true },
  city: { type: String, required: true, lowercase: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  population: { type: Number, required: true },
  state: { type: String, required: true, lowercase: true, unique: true },
  walkable: { type: Boolean, required: true, default: true },
  zip: { type: [String] },
  photo: { type: [String] },
}, {
  timestamps: true
})

const City = mongoose.model('City', citySchema)

export {
  City
}