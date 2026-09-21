---
title: Set Up the Environment
createTime: 2026/08/15 00:54:10
permalink: /en/development/setup/environment/
---

::: warning Notice
This page is for EuoraCraft Launcher developers and contributors. If you are a regular user, return to the [home page](/en/); this content does not affect normal use of EuoraCraft Launcher.
:::

## Getting started

Before developing `EuoraCraft Launcher`, set up the development environment as described below.

### Prerequisites

Install the following tools before you begin:

- Python 3.11 or later (3.13 recommended)
- Node.js 22
- pnpm 10.34.4
- The latest stable version of Git

Once they are installed, proceed to the next step.

### 1. Clone the repository

EuoraCraft Launcher uses Git submodules, so clone it with all submodules:

```bash
git clone --recurse-submodules https://github.com/ECLteam/EuoraCraft-Launcher.git
```

If you already cloned the main [ECLteam/EuoraCraft-Launcher](https://github.com/ECLteam/EuoraCraft-Launcher) repository without submodules, initialize them with:

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

If these commands succeed, you can continue.

### 2. Install dependencies

::: note
If your network environment benefits from package mirrors, configure an appropriate mirror before installing dependencies. Common options include:

- Python mirrors:
  - Tsinghua University: https://pypi.tuna.tsinghua.edu.cn/simple
  - Alibaba Cloud: https://mirrors.aliyun.com/pypi/simple/
- Node.js mirror:
  - npmmirror: https://registry.npmmirror.com/
:::

EuoraCraft Launcher has separate frontend and backend components, so their dependencies must be installed separately.

For the backend, on Windows PowerShell run:

```powershell
# Windows PowerShell
python -m venv .venv # Create a virtual environment
.\.venv\Scripts\Activate.ps1 # Activate it
python -m pip install -e ".[dev]" # Install dependencies
```

On Linux or macOS, run:

```bash
python -m venv .venv # Create a virtual environment
source .venv/bin/activate # Activate it
python -m pip install -e ".[dev]" # Install dependencies
```

After the backend dependencies are installed, install frontend dependencies:

```bash
cd frontend
pnpm install # npm or yarn also work, but pnpm is recommended
```

If everything completes without errors, the development environment is ready and you can start working on EuoraCraft Launcher.
