---
title: 升级
order: 7
toc: menu
translateHelp: true
---

### 自动升级功能暂时取消

### 手动升级

如果提示升级失败, 可以尝试在 IZUAL 的根目录手动执行以下命令, 看看问题出在哪

```bash
$ python3 main.py update
```

如果 IZUAL 出现了 bug 导致无法升级, 还可以用最原始的升级命令:

```bash
$ cd <IZUAL的目录>
$ git checkout master
$ git pull
$ cd <Plugins的目录>
$ git checkout master
$ git pull
```

sd
