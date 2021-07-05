import pretty from './index.js'

console.log(
  pretty(JSON.stringify({ time: "0", name: 'schema', msg: 'Hello' }))
)
console.log(pretty(JSON.stringify({})))
console.log(pretty(JSON.stringify({ extra: 42 })))
