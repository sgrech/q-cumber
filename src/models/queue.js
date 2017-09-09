import mongoose from 'mongoose'
const Schema = mongoose.Schema

const QueueSchema = new Schema({
  name: String,
  concurrent: Number,
  retry: Number,
  retryAfter: Number,
  pending: { type: Number, default: 0 },
  archived: { type: Number, default: 0 },
  failed: { type: Number, default: 0 }
})

export default mongoose.model('Queue', QueueSchema)
