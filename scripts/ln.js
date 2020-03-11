#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

if (process.argv.length !== 4) {
  console.error('Usage: TARGET PATH')
  process.exit(1)
}

const [
  node,
  scriptPath,
  target,
  linkName,
] = process.argv

const absoluteTarget = path.resolve(target)
const absoluteLinkName = path.resolve(linkName)

try {
  fs.symlinkSync(absoluteTarget, absoluteLinkName, 'junction')
} catch (error) {
  console.error(`${error.name}: ${error.message}`)
}
