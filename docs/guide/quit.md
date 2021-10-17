---
title: Quit
order: 5
toc: menu
translateHelp: true
---

## If IZUAL is working in the foreground

You can directly press the key combination `Ctrl+4` or `Ctrl+\`. On Mac systems, a warning such as "Python has stopped working" may pop up, just a system prompt, don’t bother about it

## If IZUAL is working in the background

You can execute the following commands:

```bash
ps auwx | grep main  # Check the PID number of IZUAL
kill -9 <PID number>
```
