const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')

const { targets: allTragets, fuzzyMatchTarget, getArgv, binRun } = require('./utils')

let buildTypes = true

let distDir = ''
let rollupWatch = false

run()

async function run() {
  const argv = getArgv()
  const paramTarget = argv._
  distDir = argv.local
  buildTypes = argv.types !== 'false'
  rollupWatch = argv.watch === 'true'
  if (paramTarget.length === 0) {
    buildAll(allTragets)
  } else {
    buildAll(paramTarget)
  }
}

function buildAll(targets) {
  runParallel(8, targets, rollupBuild)
}

async function runParallel(poolLimit, sources, interatorFn) {
  const ret = []
  const executing = []
  for (const item of sources) {
    const p = Promise.resolve().then(() => interatorFn(item))
    ret.push(p)
    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= sources.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      // 保存正在执行的异步任务
      executing.push(e)
      if (executing.length >= poolLimit) {
        // 等待较快的任务执行完成
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function rollupBuild(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)
  if (pkg.private) {
    return
  }
  const args = [
    '-c',
    '--environment',
    [
      `PACKAGE:${target}`,
      `TYPES:${buildTypes}`,
      `DISTDIR:${distDir}`
    ].filter(Boolean).join(',')
  ]
  rollupWatch && args.push('--watch')
  await binRun('rollup', args)

  if (buildTypes && pkg.types) {
    console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)))
    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: false
    })
    if (extractorResult.succeeded) {
      const typesDir = path.resolve(pkgDir, 'types')
      if (fs.existsSync(typesDir)) {
        const dtsPath = path.resolve(pkgDir, pkg.types)
        const existing = await fs.readFile(dtsPath, 'utf-8')
        const typeFiles = await fs.readdir(typesDir)
        const toAdd = await Promise.all(
          typeFiles.map((file) => {
            return fs.readFile(path.resolve(typesDir, file), 'utf-8')
          })
        )
        await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      }
      console.log(chalk.bold(chalk.green(`API Extractor completed successfully.`)))
    }
    fs.remove(`${pkgDir}/dist/packages`)
  }
}
