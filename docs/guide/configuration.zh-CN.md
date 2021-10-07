---
title: 配置
order: 6
toc: menu
translateHelp: true
---

参考[配置文件](https://github.com/MiracleInk)的注释进行配置即可

几个 tips:

1. 不建议直接修改 `default.yml` 里的内容, 否则会给后续通过 git pull 更新带来麻烦. 你应该拷贝一份放到 `$HOME/.izual/config.yml 中, 或者在运行的时候按照提示让 IZUAL 为你完成这件事

<Alert type="success">
    配置文件的读取优先级: <font color="#DB6161">$HOME/.izual/config.yml</font> > <font color="#DB6161">static/default.yml</font> 如果存在 <font color="#DB6161">$HOME/.izual/config.yml</font> 文件, 则只读取该文件的配置, 而不读取 <font color="#DB6161">default.yml</font> 如果不存在, 则读取 <font color="#DB6161">default.yml</font> 作为兜底配置
</Alert>

2. 建议在运行 IZUAL 的机器上重新训练一下唤醒词, 不同设备录制出来的唤醒词模型使用效果会大打折扣. 详见 [更新唤醒词](/zh-CN/guide/installation#6-更新唤醒词-可选-树莓派必须)

3. 任一技能插件都允许关闭, 方法是在配置文件中为该插件添加一个 enable: false 的设置. 例如, 如果你想关闭新闻头条插件, 而该插件的 SLUG 是 headline_news ，那么可以如下设置:

```bash
# 新闻头条
# 聚合数据新闻头条API
# https://www.juhe.cn/docs/api/id/235
headline_news:
    enable: false
    key: 'AppKey'
```

4. 出于安全考虑, 后端管理端的 `validate` 和 `cookie_secret` 都 **应该** 修改!

其中 `cookie_secret` 可以使用本地生成的一串字符串. 你可以使用如下方式生成:

```bash
>>> import os
>>> os.urandom(24)
b'\x1f\x07\xd9zr\xca8\x08(.\x9d\x9ec\xe1\xf9\x0f\xb8\xde\x96\xb4Eh\xd9"'
```

将这个结果直接复制到 `cookie_secret` 配置中即可. 例如:

```bash
server:
    enable: true
    host: '127.0.0.1'     # ip 地址
    port: '5000'          # 端口号
    username: 'Jehovah'   # 用户名
    # cookie 的 secret, 用于对 cookie 的内容进行加密及防止篡改
    # 建议使用 os.urandom(24) 生成一串随机字符串
    cookie_secret: '\x1f\x07\xd9zr\xca8\x08(.\x9d\x9ec\xe1\xf9\x0f\xb8\xde\x96\xb4Eh\xd9"'
    # 密码的 md5, 可以用 python3 main.py md5 'password' 获得
    validate: 'f8467b120f4ed91f94074a286113f10a'
```
