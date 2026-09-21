---
title: 环境搭建
createTime: 2026/08/15 00:54:10
permalink: /development/setup/environment/
---

::: warning 提示
本页面为开发者文档，主要面向 EuoraCraft Launcher 的开发者和贡献者。如果您是普通用户，可以返回[主页](/)；此页面不影响您使用 EuoraCraft Launcher 的功能。
:::

## 开始
开始开发 `EuoraCraft Launcher` 之前，您需要先搭建开发环境。以下是详细的步骤和要求。

### 前置条件
在正式开始前，请确保您已经安装了以下工具和软件：
- Python 3.11 或更高版本（推荐 3.13）
- Node.js 22
- pnpm 10.34.4
- Git 最新稳定版
安装好后即可进入下一步

### 1. 克隆仓库
首先，您需要克隆 `EuoraCraft Launcher` 的源码仓库。因为该项目使用了 Git 子模块，所以请使用以下命令克隆所有仓库：
```bash
git clone --recurse-submodules https://github.com/ECLteam/EuoraCraft-Launcher.git
```

如果您直接克隆了主仓库[ECLteam/EuoraCraft-Launcher](https://github.com/ECLteam/EuoraCraft-Launcher)，请使用以下命令初始化子模块：
```bash
git submodule sync --recursive
git submodule update --init --recursive
```
如果没有报错，那么恭喜您可以进入下一步了。


### 2. 安装依赖
::: note
鉴于国内网络环境的限制，建议您使用国内镜像源来安装依赖，以提高下载速度和成功率。以下是一些常用的国内镜像源：
- Python 镜像源：
  - 清华大学：https://pypi.tuna.tsinghua.edu.cn/simple
  - 阿里云：https://mirrors.aliyun.com/pypi/simple/
- Node.js 镜像源：
  - 淘宝镜像：https://registry.npmmirror.com/
:::
因为 EuoraCraft Launcher 采用前后端分离的架构，所以我们需要分别安装前端和后端的依赖。
执行以下命令安装后端依赖：
如果您使用的是 `Windows PowerShell`，请执行：
```powershell
# Windows PowerShell
python -m venv .venv # 创建虚拟环境
.\.venv\Scripts\Activate.ps1 # 激活虚拟环境
python -m pip install -e ".[dev]" # 安装依赖
```

如果您使用的是 `Linux` 或 `macOS`，请执行：
```bash
python -m venv .venv # 创建虚拟环境
source .venv/bin/activate # 激活虚拟环境
python -m pip install -e ".[dev]" # 安装依赖
```
安装完后端依赖后，您可以进入前端目录，安装前端依赖：
```bash
cd frontend
pnpm install # 您也可以使用 npm 或 yarn 安装依赖，但我们推荐使用 pnpm
```

好了，如果不出意外，您已经完成了开发环境的搭建，接下来您可以开始开发 `EuoraCraft Launcher` 了。
