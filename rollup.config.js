import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import size from 'rollup-plugin-sizes'
import visualizer from 'rollup-plugin-visualizer'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import typescript from 'rollup-plugin-typescript2'
import clear from 'rollup-plugin-clear'
import { terser } from 'rollup-plugin-terser'
import * as path from 'path'
import * as fs from 'fs'

if (!process.env.PACKAGE) {
  throw new Error('PACKAGE must be specified')
}

const isDeclaration = process.env.TYPES === 'true'

const version = require('./package.json').version
const rootPkg = path.resolve(__dirname, 'packages')
const pkgDir = path.resolve(rootPkg, process.env.PACKAGE)

const pkgDistDir = process.env.DISTDIR === 'undefined'?`${pkgDir}/dist`:process.env.DISTDIR

const name = path.basename(pkgDir)

const mainName = '@bee/track'

const pkgDirs = fs.readdirSync(rootPkg)


const paths = {}

pkgDirs.forEach((dir) => {
  if (dir.startsWith('.')) return
  paths[`@bee/track-${dir}`] = [`${rootPkg}/${dir}/src`]
})

const common = {
  input: `${pkgDir}/src/index.ts`,
  output: {
    banner: `/* ${mainName}-${name} version ' + ${version} */`,
    sourcemap: true,
    name: 'TRACK',
  },
  external: [...Object.keys(paths)],
  plugins: [
    // import foo from 'foo/index.js' => import foo from 'foo'
    resolve(),
    json(),
    // Simple analysis on rollup bundling, helping you to spot libaries bloating up your bundles.
    size(),
    // Visualize and analyze your Rollup bundle to see which modules are taking up space.
    visualizer({
      title: `${mainName} analyzer`,
      filename: 'analyzer.html'
    }),
    // Convert CommonJS modules to ES6
    commonjs({
      exclude: 'node_modules'
    }),
    // Rollup plugin to remove comments, trim trailing spaces, compact empty lines, and normalize line endings in JavaScript files.
    cleanup({
      comments: 'none'
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: isDeclaration,
          declarationMap: isDeclaration,
          declarationDir: `${pkgDistDir}/packages/`, // 类型声明文件的输出目录
          module: 'ES2015',
          paths
        }
      },
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
    })
  ]
}

const esmPackage = {
  ...common,
  output: {
    file: `${pkgDistDir}/${name}.esm.js`,
    format: 'es',
    ...common.output
  },
  plugins: [
    ...common.plugins,
    // Rollup clear plugin
    clear({
      targets: [pkgDistDir]
    })
  ]
}

const cjsPackage = {
  ...common,
  external: [],
  output: {
    file: `${pkgDistDir}/${name}.js`,
    format: 'cjs',
    minifyInternalExports: true,
    ...common.output
  }
}

const iifePackage = {
  ...common,
  external: [],
  output: {
    file: `${pkgDistDir}/${name}.min.js`,
    format: 'iife',
    ...common.output
  },
  plugins: [...common.plugins, terser()]
}

export default [esmPackage, iifePackage, cjsPackage]
