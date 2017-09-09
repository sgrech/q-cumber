import { expect } from 'chai'
import Queue from './queue'

describe('Testing Queue MongoDB Model', function () {
  it('should create a new queue with default values', function (done) {
    this.timeout(10000)
    let queue = Object.assign(new Queue(), {
      name: 'test',
      concurrent: 4,
      retry: 3,
      retryAfter: 30
    })
    queue.save((err, _queue) => {
      expect(err).to.be.a('null')
      expect(_queue).to.deep.equal(queue)
      expect(_queue).to.deep.include({ pending: 0, archived: 0, failed: 0 })
      done()
    })
  })
})
