<!--
 * Copyright (c) 2023 by onepisYa pis1@qq.com , All Rights Reserved. 
 * @Date: 2023-08-17 01:15:46
 * @LastEditors: onepisYa pis1@qq.com
 * @LastEditTime: 2023-08-21 09:09:15
 * @FilePath: /slidev-demo/README.md
 * 路漫漫其修远兮，吾将上下而求索。
 * @Description: 
-->
# [Github Pages] [Slidev] Demo

Slides &amp; code, using [Slidev](https://sli.dev).


> a slidev demo 

- [2022-12-10](./2022-12-10)
- [2023-05-17](./2023-05-17)
  

_The above two slides are copied from antfu's [talks](https://github.com/antfu/talks)._

>[!tip]+
> This project primarily demonstrates how to use [Slidev] within [Github Pages] for my friends.

- The version of Node.js I am using is v8.15.0.
- I recommend using `pnpm` pkm.
  - Pay attention to versions and dependency installation issues.
- Navigate to the 'src' directory of the corresponding slide and execute `pnpm run build`.


---

build

```bash
pnpm -C 2023-05-17/src run build
```


```
git commit --allow-empty -m "ActionTrigger: Empty commit"
```

---

- [x] 测试 批量 build actions ✅
- [x] 自动更新 actions js 脚本编写 ✅
- [x] bug fix 目前更新的时候，会全量重新编译，需要优化。✅
- [x] 当我没有任何 build 的时候 会报错, 自动失败。
- [x] 增量 deploy 
  - [x] 使用 [gh-pages][actions-gh-pages] 进行 增量部署
    - 设置 为 分支 gh-pages
    - 为自己的仓库设置 secrets.GITHUB_TOKEN or secrets.PERSONAL_TOKEN
    - 设置 publish_dir
    - 每次 commit 会自动触发 actions 然后编译，并推送到 gh-pages 分支
    - github pages 会自动部署 gh-pages 分支
    - 自动添加 .nojekyll 文件
- [x] 前端路由参数 404 处理 TODO: 
  - [x] hash mode 解决 404 这个问题 ✅
  - [ ] 也许可以想办法在 每个项目中使用 注入 404 和 重定向 index.html 的方式解决
    - 在 404的时候， 可以考虑做一个映射表， index.html 中写入解析参数，然后在 404 时候，根据参数进行重定向 [spa-github-pages]
    - [ ] 自定义GitHub Pages 404页面获取路径并重定向
    - 另外需要在每个 项目中的 index 中去处理 404 重定向
    - 不同的项目需要不同的 pathSegmentsToKeep
    - 也许我可以选择使用 [global-layer][slidevDoc:global-layer] 和 [index-inject][slidevDoc:index-inject] 去注入脚本。
- [ ] 添加文档 TODO: 
- [ ] 添加链接 TODO: 


---

## 一些其他的方案和好玩的 gh-pages 项目

-  [gh-pages] 是一个 Node.js 的库，支持增量发布
-  [gh-pages-url-shortener] 短网址服务静态部署


## 参考资料

- [Github Pages]
- [Slidev]
- [action-checkout@v2]
- [action-chnaged-files@v35]
- [action-cache@v2]
- [action-add-and-commit@v9]
- [action-upload-pages-artifact@v1]
- [action-upload-artifact@v3]
- [upload-artifact@v3-bug]
- [action-download-artifact]
- [actions-gh-pages]
- [spa-github-pages]
- [slidevDoc:index-inject]
- [slidevDoc:global-layer]



---

[Slidev]: https://sli.dev
[Github Pages]: https://pages.github.com/
[action-checkout@v2]: https://github.com/actions/checkout/tree/v2/
[action-chnaged-files@v35]: https://github.com/tj-actions/changed-files/tree/v35/
[action-cache@v2]: https://github.com/actions/cache/tree/v2/
[action-add-and-commit@v9]: https://github.com/EndBug/add-and-commit/tree/v9/
[action-upload-pages-artifact@v1]:https://github.com/actions/upload-pages-artifact/tree/v1/
[action-upload-artifact@v3]: https://github.com/actions/upload-artifact/tree/v3/
[upload-artifact@v3-bug]: https://github.com/actions/upload-artifact/issues/418
[action-download-artifact]: https://github.com/actions/download-artifact
[actions-gh-pages]: https://github.com/peaceiris/actions-gh-pages
[spa-github-pages]: https://github.com/rafgraph/spa-github-pages
[slidevDoc:index-inject]: https://sli.dev/custom/directory-structure.html#index-html
[slidevDoc:global-layer]: https://sli.dev/custom/directory-structure.html#global-layers
[gh-pages]: https://github.com/tschaub/gh-pages
[gh-pages-url-shortener]: https://github.com/nelsontky/gh-pages-url-shortener
