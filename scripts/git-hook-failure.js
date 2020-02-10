#!/usr/bin/env node

const chalk = require('chalk')
const ProgressBar = require('progress')

console.log(chalk.yellow('Git hook failed! Press Ctrl-C to cancel'))

const duration = 3000
const updateInterval = 100

const progressText = `[:bar] ${chalk.dim(':eta seconds until override')}`
const progressBar = new ProgressBar(progressText, {
  total: duration / updateInterval,
  incomplete: ' ',
  complete: '=',
  clear: true,
})

const progressBarTick = setInterval(() => {
  progressBar.tick()
  if (progressBar.complete) {
    clearInterval(progressBarTick)
  }
}, updateInterval)
