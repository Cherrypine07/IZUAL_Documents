---
title: 退出
order: 5
toc: menu
translateHelp: true
---

## 如果 IZUAL 正在前台工作

可以直接按组合键 `Ctrl+4` 或 `Ctrl+\` 即可. 在 Mac 系统下可能会弹出诸如 "Python 已停止工作" 的警告, 仅仅只是系统的提示, 不必理会

## 如果 IZUAL 正在后台工作

可以执行如下命令:

```bash
ps auwx | grep main  # 查看IZUAL的PID号
kill -9 <PID号>
```
