---
title: Configuration
order: 6
toc: menu
translateHelp: true
---

Refer to the notes of [Configuration file](https://github.com/MiracleInk) for configuration

Some tips:

1. It is not recommended to directly modify the content in `default.yml`, otherwise it will cause trouble for subsequent updates via git pull. You should make a copy and put it in `$HOME/.izual/config.yml, or while running Follow the prompts and let IZUAL do it for you

<Alert type="success">
    The read priority of the configuration file: <font color="#DB6161">$HOME/.izual/config.yml</font> > <font color="#DB6161">static/default.yml</font> If there is a <font color="#DB6161">$HOME/.izual/config.yml</font> file, only the configuration of the file is read, not <font color="#DB6161">default.yml</font> If it does not exist, read <font color="#DB6161">default.yml</font> as the bottom configuration
</Alert>

2. It is recommended to retrain the wake word on the machine running IZUAL. The use of wake word models recorded by different devices will be greatly reduced. See details [Update wake word](/zh-CN/guide/installation#6-更新唤醒词-可选-树莓派必须)

3. Any skill plug-in can be turned off by adding an enable: false setting to the plug-in in the configuration file. For example, if you want to turn off the news headline plug-in, and the plug-in’s SLUG is headline_news, you can set it as follows:

```bash
# News Headlines
# Aggregate data News Headlines API
# https://www.juhe.cn/docs/api/id/235
headline_news:
    enable: false
    key: 'AppKey'
```

4. For security reasons, both `validate` and `cookie_secret` on the back-end management side should **should** be modified!

Among them, `cookie_secret` can use a string of locally generated strings. You can generate it in the following way:

```bash
>>> import os
>>> os.urandom(24)
b'\x1f\x07\xd9zr\xca8\x08(.\x9d\x9ec\xe1\xf9\x0f\xb8\xde\x96\xb4Eh\xd9"'
```

Just copy this result directly into the `cookie_secret` configuration. For example:

```bash
server:
    enable: true
    host: '127.0.0.1'     # IP address
    port: '5000'          # Port number
    username: 'Jehovah'   # Username
    # cookie's secret, used to encrypt the content of the cookie and prevent tampering
    # It is recommended to use os.urandom(24) to generate a string of random strings
    cookie_secret: '\x1f\x07\xd9zr\xca8\x08(.\x9d\x9ec\xe1\xf9\x0f\xb8\xde\x96\xb4Eh\xd9"'
    # The md5 of the password can be obtained with python3 main.py md5'password'
    validate: 'f8467b120f4ed91f94074a286113f10a'
```
