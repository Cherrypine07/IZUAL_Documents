---
title: 安装
order: 3
toc: menu
translateHelp: true
---

## Docker 安装

Docker 镜像安装更适用于 Linux 系统. 对于 Windows 和 Mac, 由于底层音频驱动方式不同, 没办法实现离线唤醒和语音播放的功能, 但后台端的文本或录音的交互依然可用

### X86-64 架构设备

首先确保已经 [安装 Docker](https://docs.docker.com/get-docker/)

如果你的设备是普通的 X86-64 架构设备 (例如 PC 或 Mac), 可以使用我们提供的镜像:

```bash
$ docker pull <镜像还在制作中...>:latest
```

<Alert type="warning">
  如果遇到 Docker 拉取慢的问题, 你或许需要考虑先配置好<a herf="https://www.daocloud.io/mirror#accelerator-doc/">Docker 加速器</a>
</Alert>

对于 Linux 系统, 可以将 /dev/snd 桥接给 Docker, 这样可以实现声卡的支持:

```bash
$ docker run -it -p 5000:5000 --device /dev/snd <镜像还在制作中...>:latest
```

而对于 Mac 和 Windows 系统, 则只能放弃声卡的支持:

```bash
$ docker run -it -p 5000:5000 <镜像还在制作中...>:latest
```

因此 Mac 系统更推荐手动安装的方式. 而 Windows 则可以参考 [脚本安装](/zh-CN/guide/installation#脚本安装) 中的一键安装脚本

`docker run` 完成后, 就可以参考 [运行](/zh-CN/guide/run) 一节, 启动 IZUAL 了

<Alert type="error">
  注意: 每次重启 Docker 后镜像内的数据会被重置. 如果不希望每次 Docker 每次重启导致数据丢失, 可以使用 Docker commit 命令保存镜像的改动. 详见 <a herf="https://www.jianshu.com/p/2885eaa5d36d">Docker 保存修改后的镜像</a>
</Alert>

### ARM 架构设备

如果你的设备是 ARM 架构设备 (例如树莓派 3B), 可以使用 <镜像还在制作中...> 镜像 (注意: Pi Zero 是 armv6l 架构, 因此不支持 Docker 安装, 请使用手动安装):

```bash
$ git clone https://github.com/MiracleInk/<制作中...>
$ cd IZUAL
$ sudo ./pi_installer
```

然后使用如下命令启动 Docker 镜像即可:

```bash
$ docker run -it -p 5000:5000 --device /dev/snd -e LANG=C.UTF-8 <镜像还在制作中...>:latest
```

如果运行时提示

<Alert type="error">
  docker: unknown server OS: .
</Alert>

则可以在上面的命令前带上 `sudo` 再试

`docker run` 完成后, 就可以参考 [运行](/zh-CN/guide/run) 一节, 启动 IZUAL 了

<Alert type="error">
  注意: 每次重启 Docker 后镜像内的数据会被重置. 如果不希望每次 Docker 每次重启导致数据丢失, 可以使用 Docker commit 命令保存镜像的改动. 详见 <a herf="https://www.jianshu.com/p/2885eaa5d36d">Docker 保存修改后的镜像</a>
</Alert>

## 手动安装

### 1. 克隆本仓库:

```bash
git clone https://github.com/MiracleInk/<制作中...>
```

### 2. 安装 sox, ffmpeg 和 PyAudio:

#### Linux 系统:

```bash
$ sudo apt-get install portaudio19-dev python-pyaudio python3-pyaudio sox pulseaudio libsox-fmt-all ffmpeg
$ pip3 install pyaudio
```

<Alert type="success">
  如果遇到 pip3 安装慢的问题, 可以考虑使用 Pypi 镜像. 例如 <a herf="https://mirror.tuna.tsinghua.edu.cn/help/pypi/">清华大学 Pypi 镜像</a>
</Alert>

#### Mac 系统:

```bash
$ brew install portaudio --HEAD  # 安装 Git 最新版本, 确保 Big Sur 系统可用
$ brew install sox ffmpeg
$ pip3 install pyaudio
```

<Alert type="error">
  如果你没有 Homebrew ，参考<a herf="http://brew.sh/">本文</a>安装
</Alert>

### 3. 安装依赖的库:

```bash
$ cd IZUAL
$ pip3 install -r requirements.txt
```

### 4. 编译 \_snowboydetect.so

<Alert type="success">
  <a herf="https://github.com/MiracleInk/snowboy">手动编译 snowboy</a>, 得到 _snowboydetect.so 以支持更多的平台
</Alert>

#### 安装 swig

首先确保你的系统已经装有 swig

对于 Linux 系统:

```bash
$ wget https://izual-1300648143.cos.ap-shanghai.myqcloud.com/swig-3.0.10.tar.gz
$ tar xvf swig-3.0.10.tar.gz
$ cd swig-3.0.10
$ sudo apt-get -y update
$ sudo apt-get install -y libpcre3 libpcre3-dev
$ ./configure --prefix=/usr --without-clisp --without-maximum-compile-warnings
$ make
$ sudo make install
$ sudo install -v -m755 -d /usr/share/doc/swig-3.0.10
$ sudo cp -v -R Doc/* /usr/share/doc/swig-3.0.10
$ sudo apt-get install -y libatlas-base-dev
```

<Alert type="error">
  如果提示找不到 python3-config 命令, 你还需要安装 python3-dev:
</Alert>

```bash
$ sudo apt-get install python3-dev  # 注意 Ubuntu 18.04 可能叫 python3-all-dev
```

对于 Mac 系统:

```bash
$ brew install swig wget
```

#### 构建 snowboy

```bash
$ wget https://izual-1300648143.cos.ap-shanghai.myqcloud.com/snowboy.tar.bz2 # 使用我fork出来的版本以确保接口兼容
$ tar -xvjf snowboy.tar.bz2
$ cd snowboy/swig/Python3
$ make
$ cp _snowboydetect.so <wukon-robot的根目录/snowboy/>
```

<Alert type="error">
  如果 make 阶段遇到问题, 尝试在 snowboy 项目 issue 中找到解决方案
</Alert>

### 5. 安装插件

<Alert type="info">
  插件官网目前正在制作中...
</Alert>

### 6. 更新唤醒词 (可选, 树莓派必须)

默认自带的唤醒词是在 Windows 上录制的, 用的是作者的声音模型. 但由于不同的人发声不同, 所以不保证对于其他人都能很好的适用

而树莓派上或者其他板子上接的麦克风可能和 PC 上的麦克风的声音畸变差异非常大, 所以现有的模型更加不能直接在树莓派上工作, 否则效果会非常糟糕

如果你是第一次使用, 需要先创建一个配置文件方便配置唤醒词. 这个工作可以交给 IZUAL 帮你完成. 在 IZUAL 的根目录下执行:

```bash
$ python3 main.py
```

第一次启动将提示你是否要到用户目录下创建一个配置文件, 输入 `y` 即可. 配置文件将会保存在 `~/.izual/config.yml`

接下来我们来训练和更新唤醒词. 比较建议自行训练自己的模型, 然后把模型放在 ~/.izual 中, 并修改 ~/.izual/config.yml 里的几个 hotword 指向的文件名 (如果文件名没改, 则不用变) 一共有三个唤醒词需要修改:

1. `hotword`: 全局唤醒词. 默认为 "snowboy" (snowboy.umdl)
2. `/do_not_bother/on_hotword`: 让 IZUAL 进入勿扰模式的唤醒词. 默认为 "开启勿扰模式" (开启勿扰模式.pmdl)
3. `/do_not_bother/off_hotword`: 让 IZUAL 结束勿扰模式的唤醒词. 默认为 "关闭勿扰模式" (关闭勿扰模式.pmdl)

### 7.自己训练唤醒词

[自己训练唤醒词]() snowboy 官方建议在树莓派上先用 rec t.wav 这样的命令录制唤醒词, 然后在训练的时候通过上传按钮上传到服务器中进行训练:

- 完成后修改下 config.yml 把唤醒词改成刚刚训练的唤醒词即可

#### config.yml

```bash
# snowboy 离线唤醒
# 建议使用 snowboy-seasalt (https://github.com/MiracleInk/snowboy)
# 使用相同环境录入你的语音, 以提升唤醒成功率和准确率
hotword: '衣卒尔.pmdl'  # 唤醒词模型, 如要自定义请放到 $HOME/.izual 目录中
sensitivity: 0.4  # 灵敏度

# 勿扰模式, 该时间段内自动进入睡眠, 避免监听
do_not_bother:
    enable: false # true: 开启; false: 关闭
    since: 23     # 开始时间
    till: 9       # 结束时间, 如果比 since 小表示第二天
    hotword_switch: true    # 是否使用唤醒词开关唤醒模式
    on_hotword: '开启勿扰模式.pmdl'   # 通过这个唤醒词可切换勿扰模式
    off_hotword: '关闭勿扰模式.pmdl'  # 通过这个唤醒词可切换勿扰模式
```

#### CentOS 没声音问题解决

CentOS 系统中遇到播放没声音的问题. 解决方法是:

```bash
$ mknod /dev/dsp c 14 3
$ chmod 666 /dev/dsp
```

## 脚本安装

脚本安装适用于 MacOS/Ubuntu/WSL (Windows Subsystem for Linux) 系统

### 安装脚本

<Alert type="info">
  安装脚本制作中...
</Alert>
