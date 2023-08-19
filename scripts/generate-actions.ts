import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import fg from 'fast-glob'

const generateBuildPackage = (dir)=>{
  return `   
      - name: Build ${dir}
        if: steps.changed.outputs.any_changed == 'true'
        run: pnpm -C ${dir}/src run build`
  }
  
const generateActions = (buildsTemplate)=>{
    return`
  name: Build
  on: 
    push:
      branches:
        - main
  jobs:
    build:
      runs-on: ubuntu-latest
      # 缓存 
      steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 'lts/*'
  
      - name: Cache pnpm modules
        uses: actions/cache@v2
        with:
          path: ~/.pnpm-store
          key: \${{ runner.os }}-\${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            \${{ runner.os }}-
      - name: Install dependencies
        run: |
            npm install -g pnpm
            pnpm install
  
      - uses: tj-actions/changed-files@v35
        id: changed
        # 文件修改检测
        with:
          files: |
            **/src/*
      
      # ============ 脚本自动生成 ==============${buildsTemplate}
      # ============ 生成结束 ==============
      - name: Debug
        run: |
          echo "any_changed: \${{ steps.changed.outputs.any_changed }}"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
         name: github-pages
         path: dist/
  
    deploy:
      needs: build
      permissions:
        pages: write
        id-token: write
  
      environment:
        name: github-pages
        url: \${{ steps.deployment.outputs.page_url }}
  
      runs-on: ubuntu-latest
      steps:
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v2
        - name: show messages
          run: |
            echo \${{ steps.deployment.outputs.page_url }}
  `
  }

const packageFiles = (await fg('*/src/package.json', {
  onlyFiles: true,
})).sort()

const bases = (await Promise.all(
  packageFiles.map(async (file) => {
    const talkRoot = dirname(dirname(file))
    const json = JSON.parse(await fs.readFile(file, 'utf-8'))
    const pdfFile = (await fg('*.pdf', {
      cwd: resolve(process.cwd(),talkRoot),
      onlyFiles: true,
    }))[0]
    const command = json.scripts?.build
    if (!command)
      return
    const base = command.match(/ --base (.*?)\s/)?.[1]
    if (!base)
      return
    return {
      dir: talkRoot, // 文件目录
      base, // build base
      pdfFile, // pdf 文件
      // action 自动化
      // pdf 是提前本地 build 好上传的
      // 页面是使用 action 进行自动构建
    }
  }),
))
  .filter(Boolean)


const builds = bases
  .flatMap(({ base, pdfFile, dir }) => {
    // console.log('base', 'pdfFile', 'dir')
    // console.log(base,'|',  pdfFile, '|', dir)
    const parts: string[] = []

    if (pdfFile) {
      // parts.push()
    }
    // antfu 总共是 3 部分，但是我好像目前仅仅需要 dir
    // parts.push()
    // parts.push()
    return generateBuildPackage(dir)
    // return parts
  })
  .join('\n')


await fs.writeFile('./.github/workflows/build.yml', generateActions(builds), 'utf-8')

console.log("You generated actions!")