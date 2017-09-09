import mongoose from 'mongoose'
import { QUEUE_PENDING } from '../constants'
const Schema = mongoose.Schema

const QueueItemSchema = new Schema({
  enqueued: { type: Date, default: Date.now },
  started: Date,
  finished: Date,
  status: { type: String, default: QUEUE_PENDING },
  visible: { type: Date, default: Date.now, index: true },
  message: String,
  _queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue' },
  attemptCount: { type: Number, default: 0 }
})

export default mongoose.model('QueueItem', QueueItemSchema)
