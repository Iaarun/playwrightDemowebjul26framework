const { spawnSync } = require('node:child_process')

const args = process.argv.slice(2)
let environment
const playwrightArgs = []

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index]
  if (arg === '--env') {
    environment = args[index + 1]
    index += 1
  } else if (arg.startsWith('--env=')) {
    environment = arg.slice('--env='.length)
  } else {
    playwrightArgs.push(arg)
  }
}

if (!environment || !['qa', 'stg'].includes(environment.toLowerCase())) {
  console.error('Usage: npm test -- --env <qa|stg> [Playwright options]')
  process.exit(1)
}

process.env.TEST_ENV = environment.toLowerCase()

const cliPath = require.resolve('@playwright/test/cli')
const result = spawnSync(
  process.execPath,
  [cliPath, 'test', ...playwrightArgs],
  { stdio: 'inherit', env: process.env }
)

if (result.error) {
  console.error(`Failed to start Playwright: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status ?? 1)
