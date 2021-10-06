---
title: 安装
order: 3
toc: menu
---

## Docker 安装

Docker 镜像安装更适用于 Linux 系统. 对于 Windows 和 Mac, 由于底层音频驱动方式不同, 没办法实现离线唤醒和语音播放的功能, 但后台端的文本或录音的交互依然可用

### X86-64 架构设备

首先确保已经 [安装 Docker](https://docs.docker.com/get-docker/)

如果你的设备是普通的 X86-64 架构设备 (例如 PC 或 Mac), 可以使用我们提供的镜像:

```bash
docker pull <镜像还在制作中...>:latest
```

<Alert type="error">
  如果遇到 Docker 拉取慢的问题, 你或许需要考虑先配置好<a herf="https://www.daocloud.io/mirror#accelerator-doc/">Docker 加速器</a>
</Alert>

对于 Linux 系统, 可以将 /dev/snd 桥接给 Docker, 这样可以实现声卡的支持:

```bash
docker run -it -p 5000:5000 --device /dev/snd <镜像还在制作中...>:latest
```

而对于 Mac 和 Windows 系统, 则只能放弃声卡的支持:

```bash
docker run -it -p 5000:5000 <镜像还在制作中...>:latest
```

因此 Mac 系统更推荐手动安装的方式. 而 Windows 则可以参考 [脚本安装]() 中的一键安装脚本

`docker run` 完成后, 就可以参考 [运行]() 一节, 启动 IZUAL 了

<Alert type="error">
  注意: 每次重启 Docker 后镜像内的数据会被重置. 如果不希望每次 Docker 每次重启导致数据丢失, 可以使用 Docker commit 命令保存镜像的改动. 详见 <a herf="https://www.jianshu.com/p/2885eaa5d36d">Docker 保存修改后的镜像</a>
</Alert>

### ARM 架构设备

如果你的设备是 ARM 架构设备 (例如树莓派 3B), 可以使用 <镜像还在制作中...> 镜像 (注意: Pi Zero 是 armv6l 架构, 因此不支持 Docker 安装, 请使用手动安装):

```bash
git clone https://github.com/MiracleInk/<制作中...>
cd IZUAL
sudo ./pi_installer
```

然后使用如下命令启动 Docker 镜像即可:

```bash
docker run -it -p 5000:5000 --device /dev/snd -e LANG=C.UTF-8 <镜像还在制作中...>:latest
```

如果运行时提示

<Alert type="error">
  docker: unknown server OS: .
</Alert>

则可以在上面的命令前带上 `sudo` 再试

`docker run` 完成后, 就可以参考 [运行]() 一节, 启动 IZUAL 了

## 手动安装

除了独立的组件库以外，我们大多数的项目还会有自己的内部组件，这些内部的组件库管理通常是一个很头疼的问题，既不需要发布单独的 npm 包，又需要进行迭代、更新、说明、交接；为了让项目内部组件库管理这件事变得更加轻松，dumi 推出了 Umi 项目集成模式：

- **自动探测**：当 `dependencies` 或 `devDependencies` 中包含 `umi` 和 `@umijs/preset-dumi` 时，进入集成模式（不再需要单独安装 `dumi` 这个包）
- **相互隔离**：所有 dumi 文档都会集中在 `/~docs` 路由下，与原项目相互隔离、互不干扰，可以理解为标准 dumi 文档都加了一个特定路由前缀，也包括用户的导航和菜单路由配置
- **不影响生产**：仅在 `NODE_ENV` 是 `development` 时集成，不影响项目的生产构建
- **可单独构建**：如果需要单独构建文档做部署，可执行 `umi build --dumi`，即可得到一份非集成模式的 dumi 站点产物，`--dumi` 在 `umi dev` 命令下也是可用的

使用方式很简单：在已有 Umi 项目中安装 `@umijs/preset-dumi` 到 `devDependencies` 中，再根据需要配置 `resolve.includes` 即可（比如约定 `src/components` 目录下为业务组件库和组件库对应的文档）。

## UI 资产数据化

如何理解资产？从开发者视角狭义的理解，只要是生产出来可以帮助下游提效的实体，都可以称之为资产，比如组件、文档、组件 API、组件 demo 等等。

我们在组件研发的过程中，无时无刻不在创建着资产。发布的 npm 包自然是资产，编写的 TypeScript 类型定义、精心准备的组件库 demo 也都是资产，现在只需一行命令，即可将 dumi 与开发者共同完成的资产数据化，这份数据可以跟随 npm 包迭代、发布，进而流转给下游工具使用。

此处拿下游工具——Umi UI 作为例子演示资产数据化的使用流程，如下图所示：

<p style="text-align: center;">
  <img src="https://gw.alipayobjects.com/zos/bmw-prod/a873195d-32fe-427d-9756-a002d7644d85/kc5y7qpk_w2078_h1757.png" width="800" >
</p>

### 1. 初始化 dumi 组件开发项目

```bash
$ mkdir dumi-lib && cd dumi-lib
$ npx @umijs/create-dumi-lib
```

### 2. 为 demo 添加资产元信息

以初始化项目的 demo 为例，打开 `src/Foo/index.md`，添加如下 frontmatter 配置：

<pre lang="diff">
// src/Foo/index.md

```jsx
+ /**
+  * title: Foo demo
+  * thumbnail: [缩略图的 URL 地址]
+  * previewUrl: [预览的 URL 地址]
+  */
import React from 'react';
import { Foo } from 'dumi-lib';

export default () => <Foo title="First Demo" />;
```
</pre>

除了在源代码中编写 frontmatter 以外，给外部 demo 的 `code` 标签添加属性，也能实现元信息的添加：

```html
<code
  src="/path/to/demo.tsx"
  title="demo 的名称"
  thumbnail="demo 的预览缩略图地址"
  previewUrl="预览的 URL 地址"
/>
```

### 3. 启用元数据生成能力

在 `package.json` 中添加一条 npm script，并声明 `dumiAssets` 字段，Umi UI 会根据此字段查找资产元数据文件：

```diff
{
  "scripts": {
+   "postversion": "dumi assets"
  },
+ "dumiAssets": "assets.json"
}
```

由于 `assets.json` 不需要参与版本控制，请在 `gitignore` 中添加 `assets.json`。

### 4. 构建并生成资产元数据

如果只是用于测试，可以用 `npm version` 来代替 `npm publish`，随后用 link 进行本地玩耍：

```bash
$ npm run build
$ npm version patch -m "build: bump version to %s"
```

### 5. 在 Umi UI 中使用

初始化 Umi 应用，安装 Umi UI 并 link 我们刚刚的组件库：

```bash
$ mkdir umi-app && cd umi-app
$ npx @umijs/create-dumi-app
$ npm i @umijs/preset-ui -D
$ npm link path/to/dumi/lib
```

在 Umi 应用的 `package.json` 中，手动添加组件库为依赖：

```diff
{
  "dependencies": {
    // 其他依赖
+   "your-lib-package-name": "*"
  }
}
```

然后和往常一样启动 Umi 项目，即可在 Umi UI 的迷你气泡中看到 dumi-lib 项目中的 demo 资产，并可直接插入到页面中使用：

<p style="text-align: center;">
  <img src="https://gw.alipayobjects.com/zos/bmw-prod/4102a494-e4d8-494e-a790-1a7a5562da51/kc6gnqjd_w680_h387.gif" width="680">
</p>
