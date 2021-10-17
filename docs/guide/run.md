---
title: Run
order: 4
toc: menu
translateHelp: true
---

### Sound card check and setup before running

<Alert type="warning">
    Please make sure that the microphone and audio configuration are correct before starting IZUAL!
</Alert>

#### Mac system

Mac system configuration is relatively simple, just adjust the input and output in [System Preferences] → [Sound]

After adjusting, you can test the recording:

```bash
$ rec test.wav
```

The recording tool provided by sox will be started. Press Ctrl-C to end the recording

Then play the recording:

```bash
$ play test.wav
```

<Alert type="success">
    If it can be played normally, the configuration is normal. You can run IZUAL
</Alert>

#### Linux system (including Raspberry Pi)

The Linux system needs to set up the sound card. Configuring the microphone and speaker is the easiest link for new users to get stuck in the process of using IZUAL under Linux

<Alert type="success">
    If you are using PS3 eye, please refer to this article <a herf="https://renatocunha.com/2012/04/playstation-eye-audio-linux/"></a> Configuration tutorial, no need to read this section settings
</Alert>

<Alert type="success">
    If you are using ReSpeaker 2 Mic HAT, please refer to the <a herf="#">ReSpeaker 2-Mics Pi HAT</a> configuration tutorial, no need to read the settings in this section
</Alert>

#### 1. Check the sound card configuration

Test the recording:

```bash
$ arecord test.wav
```

Will start alsa for recording. Press Ctrl-C to end recording

Then play the recording:

```bash
$ aplay test.wav
```

If it can be played normally, the configuration is normal. You can run IZUAL
If not, please refer to the following steps to configure

Before configuration, first make sure that the microphone and sound are connected

#### 2. Configure the sound card

##### Get sound card number and device number

View all currently connected recording devices:

```bash
$ arecord -l
```

The result is similar to this:

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

The above results indicate that two recording devices are currently connected, select the recording device you want to use, and write down the sound card number (or name) and the device number. For example, if I want to use the `USB PnP Sound Device` device, then the sound card The number is 2 (the name of the sound card is `Device`), and the device number is 0

A similar method is used to obtain the sound card number and device number of the speaker:

```bash
$ aplay -l
```

The result is similar to this:

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

The above results indicate that three playback devices are currently connected, and card 0 is the sound card that comes with the Raspberry Pi. If you are using an external audio/headphone with the AUX 3.5 port, you should use card 0; card 1 and card 2 Other devices. Note down the sound card number and device number you want to use

##### Configuration .asoundrc.conf

First create `~/.asoundrc.conf`:

```bash
$ cp $HOME/.asoundrc.conf $HOME/.asoundrc.conf.bk  # Back up the existing sound card configuration (if any)
$ touch $HOME/.asoundrc.conf
```

Then add the sound card number and device of your choice. Here are two common configurations:

- The first type: You are using a combined device with its own audio and recording (such as a conference microphone speaker, or a separate USB sound card connected to the microphone and speaker), then you only need to set pcm to the number of the combined device . Example:

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

The above `hw:1,0` means to use card 1, device 0. That is, `C-Media USB Headphone Set` If it is configured with `hw:Set,0`, the effect is the same (personally recommend using the sound card name)

By default `arecord` uses `U8` as the sampling format ([sample format](https://linux.die.net/man/1/arecord)), use `8000Hz` as the sampling rate. Some recording hardware may not support it. At this time, you can increase the `sample` and `rate` parameters to adjust to the supported value, for example (for reference only, please refer to the actual test for details) :

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

- The second type: You are using a separate USB microphone, and connect a speaker directly through the AUX 3.5 port of the Raspberry Pi. Then you can refer to the following configuration:

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

Since the playback device (playback) and recording device (capture) are independent, they need to be configured separately

After finishing [Command line recording and playback under test](/zh-CN/guide/run#%E8%BF%90%E8%A1%8C%E5%89%8D%E5%A3%B0%E5%8D%A1%E6%A3%80%E6%9F%A5%E5%92%8C%E8%AE%BE%E7%BD%AE), you can check again to see if it works normally

If you still have problems, I suggest Google/Baidu. Different hardware and system environments may have different configuration methods. It is difficult for the author to give a completely general solution, and it is difficult to locate the problems encountered in some specific situations. It is also recommended to read [Asoundrc](https://www.alsa-project.org/wiki/Asoundrc) configuration documents, learn how to configure sampling format, sampling rate and other skills

### Run IZUAL

```bash
$ cd <IDirectory where IZUAL is located>
$ python3 main.py
```

At the first startup, you will be prompted whether you want to create a configuration file in the user directory, just enter `y`

Then use the wake-up word "衣卒尔" to wake up IZUAL for interaction (this wake-up word can be customized, see Update the wake-up word to improve the success rate and accuracy of wake-up)

If you encounter the following problems during startup:

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

**Does not affect the function, just a pulseaudio alarm, which can be ignored**

If you encounter other problems, you can go to FAQ and Github issue to see if there are similar problems. For example, if you encounter a -9997 error like this:

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

Go to Github issue and search -9997 to find similar issues

#### Tips:

To make IZUAL temporarily block offline monitoring, you can set the `enable` configuration of `hotword_switch` to true in the configuration file:

```bash
# Do not disturb mode, automatically enter sleep during this time period, avoid monitoring
do_not_bother:
    ...
    hotword_switch: false  # Whether to use the wake word to switch the wake mode
    ...
```

Then use the wake-up word "Enable Do Not Disturb Mode" to block offline monitoring. If necessary, use "Turn off Do Not Disturb Mode" to resume monitoring

<Alert type="success">
    Similarly, these two wake-up words are also recommended to train by yourself, and modify the <font color="#DB6161">hotword_switch</font> 的 <font color="#DB6161">on_hotword</font> and <font color="#DB6161">off_hotword</font> settings in the configuration file
</Alert>

### Management side

By default, IZUAL will also start a background management terminal during operation, providing remote dialogue, viewing and modifying configurations, and viewing logs.

- Default address: http://localhost:5000
- Default account name: IZUAL
- Default password: PASSWD

It is recommended to modify the user name and password during official use to avoid leakage of privacy

### Background process

Start IZUAL directly in the terminal, and the process of IZUAL may be gone after closing the terminal

To keep running IZUAL in the background, you can run it in[tmux](https://blog.csdn.net/xiaobei4929/article/details/43230385?ops_request_misc=&request_id=&biz_id=102&utm_term=tmux&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduweb~default-4-43230385.first_rank_v2_pc_rank_v29&spm=1018.2226.3001.4450) or [supervisor](https://blog.csdn.net/qq_29974553/article/details/118755687?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163357705216780271578096%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=163357705216780271578096&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v2~hot_rank-4-118755687.pc_v2_rank_blog_default&utm_term=supervisor&spm=1018.2226.3001.4450)

### Performance diagnosis

If you find that the response of IZUAL is very slow when running (for example: after a user feedback interaction, it takes two minutes to respond to the next interaction), usually it has a lot to do with your network environment. For example: a service cannot be touched due to firewall You can run IZUAL as follows:

```bash
python3 main.py profiling
```

IZUAL will print the performance tuning data of the current interaction after each step of interaction

<p style="text-align: center;">
  <img src="https://i.loli.net/2021/10/07/pHKfeaN4lE6rhyv.png" width="1050" >
</p>

The column marked in red will accumulate the operation time of each task. Generally, the upper row of the row where the number suddenly becomes smaller is the biggest black hand.

<Alert type="info">
    Execute python3 main.py help to learn more about command line usage
</Alert>

### Internet accessible

To access IZUAL in your home on the external network, you can refer to [Use Skills-Access IZUAL from the Internet]()

### Other tips

You can refer to [Skills]()
