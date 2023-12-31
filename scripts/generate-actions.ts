import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import fg from 'fast-glob'

const env = 'onepisya-github-pages'
const pagesName = `${env}-`
const generateBuildPackage = (dir)=>{
  return `   
      - uses: tj-actions/changed-files@v35
        id: changed-${dir}
        # 文件修改检测
        with:
          files: |
            ${dir}/src/*
      - name: Build ${dir}
        if: steps.changed-${dir}.outputs.any_changed == 'true'
        run: pnpm -C ${dir}/src run build
      - name: Debug
        run: |
          echo "any_changed: \${{ steps.changed-${dir}.outputs.any_changed }}"
        `
  }

const getLastBuild = async ()=>{
  const buildYml = await fs.readFile('./.github/workflows/gh-pages.yml', 'utf-8');
  const lastBuild = buildYml.match(new RegExp(`${pagesName}(\\d+)`))?.[1]
  return lastBuild
}

const generateActions = async (buildsTemplate)=>{
  const now = new Date().getTime();

    return`
  name: Build
  on: 
    push:
      branches:
        - main
  jobs:
    build:
      runs-on: ubuntu-latest
      permissions:
        pages: write
        id-token: write
      environment:
        name: onepisya-github-pages
      env:
        LastArtiFact: onepisya-github-pages-${await getLastBuild()}
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
      # ============ 脚本自动生成 ==============${buildsTemplate}
      # ============ 生成结束 ==============
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1 
        # have not skipped, but it is designed to fail if there is no artifact to upload
        with:
          name: ${pagesName}${now}
          path: dist/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3.9.3 # tag: Better
        with:
          publish_branch: gh-pages  # default: gh-pages
          personal_token: \${{ secrets.PERSONAL_TOKEN }}
          publish_dir: ./dist
          allow_empty_commit: true
          keep_files: true
          # force_orphan: true
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


const actions = await generateActions(builds)
await fs.writeFile('./.github/workflows/gh-pages.yml', actions, 'utf-8')

console.log("You generated actions!")