import { expect } from 'chai'
import QueueItem from './queueItem'
import Queue from './queue'
import colors from 'colors' // eslint-disable-line no-unused-vars
import { QUEUE_PENDING } from '../constants'

describe('Testing Queue MongoDB Model', function () {
  let scopeVars = {}

  before(function (done) {
    this.timeout(10000)
    let queue = Object.assign(new Queue(), {
      name: 'test',
      concurrent: 4,
      retry: 3,
      retryAfter: 30
    })
    queue.save((err, queueItem) => {
      if (err) console.log(err.red)
      else {
        scopeVars.queueId = queueItem._id
        done()
      }
    })
  })

  it('should create a new queue item with default pending status', function (done) {
    this.timeout(10000)
    let queueItem = Object.assign(new QueueItem(), {
      started: Date.now(),
      finished: Date.now(),
      message: 'queue item test',
      _queue: scopeVars.queueId
    })
    queueItem.save((err, _queueItem) => {
      expect(err).to.be.a('null')
      expect(_queueItem).to.deep.equal(queueItem)
      expect(_queueItem).to.deep.include({ status: QUEUE_PENDING })
      expect(_queueItem).to.deep.include({ _queue: scopeVars.queueId })
      done()
    })
  })
})
