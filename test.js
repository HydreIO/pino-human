import pretty from './index.js'

console.log(
  pretty(JSON.stringify({ timestamp: 0, name: 'schema', msg: 'Hello' }))
)
