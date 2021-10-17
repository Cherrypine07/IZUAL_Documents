---
title: Project Introduction
order: 2
nav:
  title: Guide
toc: menu
translateHelp: false
---

## Feature

### Fundamental contents:

- Modular design: functional plug-ins, speech recognition, speech synthesis, dialogue robots and other components are highly modularized, plug-ins can be extracted separately for maintenance, which is convenient for inheriting and developing your own plug-ins
- Multi-language support: Integrate many Chinese speech recognition and speech synthesis technologies such as Baidu, HKUST Xunfei, Ali, Tencent, etc., and can continue to expand
- Global monitoring, offline wake-up: support Muse brain-computer wake-up, and offline voice wake-up
- Flexible configuration: support customizing all components, support selecting and disabling various plug-ins and functions
- Smart home: supports access to smart home systems such as Mqtt, HomeAssistant, etc., and supports voice control of smart home appliances
- Back-end management: Provide back-end management, which can realize functions such as remote control, configuration modification and log viewing
- Open API: The open back-end API can be used to achieve richer functions
- Simple installation: support various mainstream platforms, simple installation, less code, easy to maintain
- Support hot update: The source code of functions such as plug-ins can be modified in real time while the system is running, and hot update is performed, which solves the difficulty of manually restarting the system for debugging
- Dialogue robots: Support local dialogue robots based on AnyQ, and support access to online dialogue robots such as Turing robots and Emotibot
- Auxiliary operation: This is a lightweight project, running in the background will not take up too much performance. Users can set whether to perform intelligent assistance according to personal preferences
- Auxiliary programming: By accessing Github Copilot, users can input the required function through voice, the program automatically gives a plan, the user can choose the plan and automatically complete the rest of the code
- Special Occupation Assistance: Network security work assistance, can input instructions by voice, and operate automatically

## Environmental requirements

Only supports **Python3.x** | Does not support **Python2.x**

### Supported operating systems (only those TESTED)

- 64Bit Mac OS X
- Windows system with WSL
- 64Bit Ubuntu (12.04 and 14.04)
- Full range of Raspberry Pi (Raspbian system)
- Pine 64 with Debian Jessie 8.5 (3.10.102)
- Intel Edison with Ubilinux (Debian Wheezy 7.8)

<Alert type="info">
  The WHOLE series of <strong>Debain</strong> systems can support
</Alert>
