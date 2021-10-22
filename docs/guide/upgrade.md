---
title: Upgrade
order: 7
toc: menu
translateHelp: true
---

### The automatic upgrade function is temporarily cancelled

### Manual upgrade

If it prompts that the upgrade failed, you can try to manually execute the following command in the root directory of IZUAL to see where the problem is

```bash
$ python3 main.py update
```

If there is a bug in IZUAL that makes it impossible to upgrade, you can also use the original upgrade command:

```bash
$ cd <IZUAL Directory>
$ git checkout master
$ git pull
$ cd <IZUAL Directory>
$ git checkout master
$ git pull
```
