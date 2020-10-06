#!/usr/bin/env node

import split from 'split2'
import { pipeline } from 'stream'
import pretty from './index.js'

pipeline(
  process.stdin,
  split(),
  async function* (input) {
    for await (const line of input) yield pretty(line)
  },
  process.stdout,
  (err) => {
    throw err
  }
)
