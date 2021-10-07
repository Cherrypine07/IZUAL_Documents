---
title: 运行
order: 4
toc: menu
translateHelp: true
---

### 运行前声卡检查和设置

<Alert type="warning">
    请确保麦克风和音响配置正确再启动 IZUAL !
</Alert>

#### Mac 系统

Mac 系统的配置比较简单, 在 [系统偏好设置] → [声音] 里调整输入和输出即可

调节完之后, 可以测试一下录音:

```bash
$ rec test.wav
```

将启动 sox 提供的录音工具. 按 Ctrl-C 结束录音

之后播放一下录音:

```bash
$ play test.wav
```

<Alert type="success">
    如果可以正常播放, 则说明配置正常. 可以运行 IZUAL 了
</Alert>

#### Linux 系统 (包括树莓派)

Linux 系统需要对声卡进行一下设置. 配置麦克风和音响是新用户在 Linux 下使用 IZUAL 过程中最容易卡住的环节

<Alert type="success">
    如果您使用的是 PS3 eye, 请参见 <a herf="https://renatocunha.com/2012/04/playstation-eye-audio-linux/">这篇文章</a> 配置教程, 无需阅读本节设置
</Alert>

<Alert type="success">
    如果您使用的是 ReSpeaker 2 Mic HAT, 请参见 <a herf="#">ReSpeaker 2-Mics Pi HAT</a> 配置教程, 无需阅读本节设置
</Alert>

#### 1. 检查声卡配置

测试一下录音:

```bash
$ arecord test.wav
```

将启动 alsa 进行录音. 按 Ctrl-C 结束录音

之后播放一下录音:

```bash
$ aplay test.wav
```

如果可以正常播放, 则说明配置正常. 可以运行 IZUAL 了
如果不能, 则参考下面的步骤进行配置

在配置前, 首先确保已接好麦克风和音响

#### 2. 配置声卡

##### 获得声卡编号和设备编号

查看当前已接入的所有录音设备:

```bash
$ arecord -l
```

得到的结果类似这样:

```bash
pi@raspberrypi:~$ arecord -l
**** List of CAPTURE Hardware Devices ****
card 1: Set [C-Media USB Headphone Set], device 0: USB Audio [USB Audio]
  Subdevices: 0/1
  Subdevice #0: subdevice #0
card 2: Device [USB PnP Sound Device], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

上面的结果说明当前接入了两个录音设备, 选择你要使用的录音设备, 并记下声卡编号 (或名字) 和设备编号. 例如, 我希望使用 `USB PnP Sound Device` 这个设备, 则声卡编号为 2 (声卡名为 `Device`), 设备编号为 0

类似的方法获取音响的声卡编号和设备编号:

```bash
$ aplay -l
```

结果类似这样:

```bash
pi@raspberrypi:~$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: ALSA [bcm2835 ALSA], device 0: bcm2835 ALSA [bcm2835 ALSA]
  Subdevices: 8/8
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
  Subdevice #7: subdevice #7
card 0: ALSA [bcm2835 ALSA], device 1: bcm2835 ALSA [bcm2835 IEC958/HDMI]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Set [C-Media USB Headphone Set], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 2: Device [USB PnP Sound Device], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

上面的结果说明当前接入了三个播放设备, 其中 card 0 是树莓派自带的声卡, 如果您是使用 AUX 3.5 口外接的音响/或耳机, 那么应该使用 card 0; card 1 和 card 2 则是其他的设备. 记下您要使用的声卡编号和设备编号

##### 配置 .asoundrc.conf

首先创建 `~/.asoundrc.conf`:

```bash
$ cp $HOME/.asoundrc.conf $HOME/.asoundrc.conf.bk  # 备份已有的声卡配置 (如果有的话)
$ touch $HOME/.asoundrc.conf
```

之后添加您选择的声卡编号和设备. 这里举两种常见的配置:

- 第一种: 您使用的是一个自带音响和录音的组合设备 (例如会议麦克风喇叭, 或者一块连接了麦克风和音响的独立 USB 声卡), 那么只需设置 pcm 为该组合设备的编号即可. 示例:

```bash
pcm.!default {
        type plug slave {
                pcm "hw:1,0"
        }
}

ctl.!default {
        type hw
        card 1
}
```

上面的 `hw:1,0` 表示使用 card 1, 设备 0. 即 `C-Media USB Headphone Set` 如果配成 `hw:Set,0`, 效果相同 (个人更推荐使用声卡名字)

默认情况下 `arecord` 使用 `U8` 作为采样格式 ([sample format](https://linux.die.net/man/1/arecord)), 使用 `8000Hz` 作为采样率. 有些录音硬件可能会不支持. 此时可以通过增加 `sample` 和 `rate` 参数来调整到支持的值, 例如 (仅供参考, 具体请以实际测试为准):

```bash
pcm.!default {
        type plug slave {
                pcm "hw:1,0"
                format S16_LE
                rate 16000
        }
}

ctl.!default {
        type hw
        card 1
}
```

- 第二种: 您使用的是一个单独的 USB 麦克风, 并直接通过树莓派的 AUX 3.5 口外接一个音响. 那么可以参考如下配置:

```bash
pcm.!default {
        type asym
            playback.pcm {
                type plug
                slave.pcm "hw:0,0"
            }
            capture.pcm {
                type plug
                slave.pcm "hw:2,0"
            }
}

ctl.!default {
        type hw
        card 2
}
```

由于播放设备 (playback) 和录音设备 (capture) 是独立的, 所以需要各自配置

完成后可以再次[测试下命令行录音和播放](/zh-CN/guide/run#%E8%BF%90%E8%A1%8C%E5%89%8D%E5%A3%B0%E5%8D%A1%E6%A3%80%E6%9F%A5%E5%92%8C%E8%AE%BE%E7%BD%AE), 看看是否能正常工作

如果还有问题, 建议 Google/百度. 不同的硬件和系统环境可能有不同的配置方法, 作者很难给出完全通用的方案, 也难以对一些特定情况下遇到的问题进行定位. 也建议阅读 [Asoundrc](https://www.alsa-project.org/wiki/Asoundrc) 的配置文档, 了解如何配置采样格式、采样率等技巧

### 运行 IZUAL

```bash
$ cd <IZUAL 所在的目录>
$ python3 main.py
```

第一次启动时将提示你是否要到用户目录下创建一个配置文件, 输入 `y` 即可

然后通过唤醒词 "衣卒尔" 唤醒 IZUAL 进行交互 (该唤醒词可自定义, 详见更新唤醒词 以提升唤醒成功率和准确率)

启动时如遇到如下问题:

```bash
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 924
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 924
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Cannot connect to server socket err = No such file or directory
Cannot connect to server request channel
jack server is not running or cannot be started
JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
Cannot connect to server socket err = No such file or directory
```

**不影响功能, 只是 pulseaudio 的告警, 可以忽略**

如果遇到其他问题, 可以移步 常见问题解答 和 Github issue 看看是否有类似问题. 例如, 如果遇到类似这样的 -9997 错误:

```bash
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 924
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 924
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 934
Expression 'alsa_snd_pcm_hw_params_set_period_size_near( pcm, hwParams, &alsaPeriodFrames, &dir )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 924
Expression 'paInvalidSampleRate' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 2048
Expression 'PaAlsaStreamComponent_InitialConfigure( &self->capture, inParams, self->primeBuffers, hwParamsCapture, &realSr )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 2719
Expression 'PaAlsaStream_Configure( stream, inputParameters, outputParameters, sampleRate, framesPerBuffer, &inputLatency, &outputLatency, &hostBufferSizeMode )' failed in 'src/hostapi/alsa/pa_linux_alsa.c', line: 2843
CRITICAL:main:离线唤醒机制初始化失败: [Errno -9997] Invalid sample rate
```

到 Github issue 里搜 -9997 即可搜出类似问题

#### 小技巧:

要让 IZUAL 暂时屏蔽离线监听, 可以在配置文件中设置 `hotword_switch` 的 `enable` 配置为 true:

```bash
# 勿扰模式, 该时间段内自动进入睡眠, 避免监听
do_not_bother:
    ...
    hotword_switch: false  # 是否使用唤醒词开关唤醒模式
    ...
```

然后使用唤醒词 "开启勿扰模式" 屏蔽离线监听. 需要时再通过 "关闭勿扰模式" 恢复监听

<Alert type="success">
    同样的, 这两个唤醒词也建议自行训练, 并修改配置文件中的 <font color="#DB6161">hotword_switch</font> 的 <font color="#DB6161">on_hotword</font> 和 <font color="#DB6161">off_hotword</font> 两个设置
</Alert>

### 管理端

IZUAL 默认在运行期间还会启动一个后台管理端, 提供了远程对话、查看修改配置、查看 log 等能力

- 默认地址: http://localhost:5000
- 默认账户名: IZUAL
- 默认密码: PASSWD

建议正式使用时修改用户名和密码, 以免泄漏隐私

### 后台运行

直接在终端中启动 IZUAL, 等关掉终端后 IZUAL 的进程可能就没了

要想在后台保持运行 IZUAL, 可以在 [tmux](https://blog.csdn.net/xiaobei4929/article/details/43230385?ops_request_misc=&request_id=&biz_id=102&utm_term=tmux&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduweb~default-4-43230385.first_rank_v2_pc_rank_v29&spm=1018.2226.3001.4450) 或 [supervisor](https://blog.csdn.net/qq_29974553/article/details/118755687?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163357705216780271578096%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=163357705216780271578096&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v2~hot_rank-4-118755687.pc_v2_rank_blog_default&utm_term=supervisor&spm=1018.2226.3001.4450) 中运行

### 性能诊断

如果发现 IZUAL 运行时响应很慢 (例如: 有用户反馈交互一次后要等两分钟才能响应下一次交互), 通常和你的网络环境有很大关系. 例如: 某个服务因为防火墙的原因无法触达. 可以以如下方式运行 IZUAL:

```bash
python3 main.py profiling
```

IZUAL 将在每一步交互后打印当次交互的性能调优数据

<p style="text-align: center;">
  <img src="https://i.loli.net/2021/10/07/pHKfeaN4lE6rhyv.png" width="1050" >
</p>

标红的这一列会累计每一个任务的操作耗时. 一般往下找到数字突然变小的那一行的上一行就是最大黑手

<Alert type="info">
    执行 python3 main.py help 可以了解更多命令行用法
</Alert>

### 外网可访问

要在外网访问你家中的 IZUAL, 可以参考 [使用技巧 - 外网访问 IZUAL]()

### 其他使用技巧

可以参考 [使用技巧]()
