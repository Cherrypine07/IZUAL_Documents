---
title: Inatallation
order: 3
toc: menu
translateHelp: true
---

## Docker installation

Docker image installation is more suitable for Linux systems. For Windows and Mac, due to the different low-level audio drivers, there is no way to achieve offline wake-up and voice playback functions, but the interaction of text or recording on the background side is still available

### X86-64 architecture equipment

First make sure you have [installed Docker](https://docs.docker.com/get-docker/)

If your device is a normal X86-64 architecture device (such as a PC or Mac), you can use the image provided by us:

```bash
$ docker pull <The mirror is still in production...>:latest
```

<Alert type="warning">
 If you encounter the problem of slow Docker pull, you may need to consider configuring the<a herf="https://www.daocloud.io/mirror#accelerator-doc/"> Docker accelerator </a>first
</Alert>

For Linux systems, you can bridge /dev/snd to Docker, which can achieve sound card support:

```bash
$ docker run -it -p 5000:5000 --device /dev/snd <The mirror is still in production...>:latest
```

For Mac and Windows systems, you can only give up sound card support:

```bash
$ docker run -it -p 5000:5000 <The mirror is still in production...>:latest
```

Therefore, manual installation is recommended for Mac systems. For Windows, you can refer to the one-click installation script in [Script Installation](/zh-CN/guide/installation#脚本安装)

`docker run` After completion, you can refer to the [Run](/zh-CN/guide/run) section, to start IZUAL

<Alert type="error">
  Note: The data in the image will be reset every time Docker is restarted. If you do not want to lose data every time Docker restarts, you can use the Docker commit command to save the changes to the image. See details: <a herf="https://www.jianshu.com/p/2885eaa5d36d">Docker saves the modified image</a>
</Alert>

### ARM architecture equipment

If your device is an ARM architecture device (e.g. Raspberry Pi 3B), you can use <\The mirror is still in production...> mirroring (Note: Pi Zero is an armv6l architecture, so Docker installation is not supported, please use manual installation):

```bash
$ git clone https://github.com/MiracleInk/<Making...>
$ cd IZUAL
$ sudo ./pi_installer
```

Then use the following command to start the Docker image:

```bash
$ docker run -it -p 5000:5000 --device /dev/snd -e LANG=C.UTF-8 <The mirror is still in production...>:latest
```

If you are prompted at runtime

<Alert type="error">
  docker: unknown server OS: .
</Alert>

You can bring `sudo` before the above command and try again

After `docker run` is completed, you can refer to it [run](/zh-CN/guide/run) section, to start IZUAL

<Alert type="error">
  Note: The data in the image will be reset every time Docker is restarted. If you do not want to lose data every time Docker restarts, you can use the Docker commit command to save the changes to the image. See details: <a herf="https://www.jianshu.com/p/2885eaa5d36d">Docker saves the modified image</a>
</Alert>

## Manual installation

### 1. Clone this repository:

```bash
git clone https://github.com/MiracleInk/<Making...>
```

### 2. Install sox, ffmpeg and PyAudio:

#### Linux system:

```bash
$ sudo apt-get install portaudio19-dev python-pyaudio python3-pyaudio sox pulseaudio libsox-fmt-all ffmpeg
$ pip3 install pyaudio
```

<Alert type="success">
  If you encounter slow installation of pip3, you can consider using Pypi mirroring. e.g. <a herf="https://mirror.tuna.tsinghua.edu.cn/help/pypi/">Tsinghua University Pypi mirror</a>
</Alert>

#### Mac system:

```bash
$ brew install portaudio --HEAD  # Install the latest version of Git to ensure that the Big Sur system is available
$ brew install sox ffmpeg
$ pip3 install pyaudio
```

<Alert type="error">
  If you don't have Homebrew , Refer to<a herf="http://brew.sh/"> article </a>to intall
</Alert>

### 3. Install dependent libraries:

```bash
$ cd IZUAL
$ pip3 install -r requirements.txt
```

### 4. Compile \_snowboydetect.so

<Alert type="success">
  <a herf="https://github.com/MiracleInk/snowboy">Manual compilation snowboy</a>, Get _snowboydetect.so to support more platforms
</Alert>

#### install swig

First make sure your system has swig installed

For Linux systems:

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
  If you are prompted that you cannot find the python3-config command, you also need to install python3-dev:
</Alert>

```bash
$ sudo apt-get install python3-dev  # Note: Ubuntu 18.04 may be called python3-all-dev
```

For Mac system:

```bash
$ brew install swig wget
```

#### Construct snowboy

```bash
$ wget https://izual-1300648143.cos.ap-shanghai.myqcloud.com/snowboy.tar.bz2 # Use the version I fork to ensure interface compatibility
$ tar -xvjf snowboy.tar.bz2
$ cd snowboy/swig/Python3
$ make
$ cp _snowboydetect.so <wukon-robot的根目录/snowboy/>
```

<Alert type="error">
  If you encounter problems in the make phase, try to find a solution in the snowboy project issue
</Alert>

### 5. Install plugin

<Alert type="info">
  The official website of the plugin is currently in production...
</Alert>

### 6. Update wake word (optional, required for Raspberry Pi)

The default wake-up words are recorded on Windows, using the author's voice model. But because different people have different voices, it is not guaranteed to be well applicable to others

The sound distortion of the microphone connected to the Raspberry Pi or other boards may be very different from that of the microphone on the PC, so the existing models cannot work directly on the Raspberry Pi, otherwise the effect will be very bad.

If you are using it for the first time, you need to create a configuration file to configure the wake word first. This work can be done by IZUAL for you. In the root directory of IZUAL, execute:

```bash
$ python3 main.py
```

The first startup will prompt you whether you want to create a configuration file in the user directory, Just type `y`. The configuration file will be saved in `~/.izual/config.yml`

Next, let’s train and update the wake word. It is recommended to train your own model, then put the model in ~/.izual, and modify the file names pointed to by several hotwords in ~/.izual/config.yml (if If the file name has not been changed, there is no need to change it) There are three wake-up words that need to be modified:

1. `hotword`: Global wake word. Default is "snowboy" (snowboy.umdl)
2. `/do_not_bother/on_hotword`: Wake-up word for IZUAL to enter Do Not Disturb mode. The default is "Do Not Disturb Mode on" (开启勿扰模式.pmdl)
3. `/do_not_bother/off_hotword`: Let IZUAL end the wake-up word of Do Not Disturb mode. The default is "Disable Do Not Disturb Mode" (关闭勿扰模式.pmdl)

### 7.Train your own wake words

[Train your own wake words]() snowboy officially recommends using commands like rec t.wav to record the wake word on the Raspberry Pi, and then upload it to the server for training through the upload button during training:

- After completion, modify config.yml and change the wake word to the wake word just trained.

#### config.yml

```bash
# snowboy Wake up offline
# Recommended to use snowboy-seasalt (https://github.com/MiracleInk/snowboy)
# Use the same environment to record your voice to improve the success rate and accuracy of wake-up
hotword: '衣卒尔.pmdl'  # Wake-up word model, if you want to customize it, please put it in the $HOME/.izual directory
sensitivity: 0.4  # Sensitivity

# Do not disturb mode, automatically enter sleep during this time period, avoid monitoring
do_not_bother:
    enable: false # true: Turn on; false: Turn off
    since: 23     # Starting time
    till: 9       # End time, if it is less than since, it means the next day
    hotword_switch: true    # Whether to use the wake word to switch the wake mode
    on_hotword: '开启勿扰模式.pmdl'   # Use this wake-up word to switch the do not disturb mode
    off_hotword: '关闭勿扰模式.pmdl'  # Use this wake-up word to switch the do not disturb mode
```

#### CentOS no sound problem solved

There is no sound when playing in CentOS system. The solution is:

```bash
$ mknod /dev/dsp c 14 3
$ chmod 666 /dev/dsp
```

## Script installation

Script installation is suitable for MacOS/Ubuntu/WSL (Windows Subsystem for Linux) system

### Installation script

<Alert type="info">
  Installation script is being produced...
</Alert>
