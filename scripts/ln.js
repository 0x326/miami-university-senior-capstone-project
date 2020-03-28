#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

if (process.argv.length !== 4) {
  console.error('Usage: TARGET PATH')
  process.exit(1)
}

const [
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  node,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  scriptPath,
  target,
  linkName,
] = process.argv

const absoluteTarget = path.resolve(target)
const absoluteLinkName = path.resolve(linkName)

try {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.symlinkSync(absoluteTarget, absoluteLinkName, 'junction')
} catch (error) {
  console.error(`${error.name}: ${error.message}`)
}
