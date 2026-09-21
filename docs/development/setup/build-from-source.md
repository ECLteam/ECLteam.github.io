---
title: 从源码构建
permalink: /development/setup/build-from-source/
createTime: 2026/08/12 21:30:00
---

# 项目构建

EuoraCraft Launcher 由 Python 后端、frontend 前端子模块和 `ECL/game` Core 子模块组成。克隆项目时必须同时拉取子模块。

## 环境要求

| 工具 | 版本 |
| --- | --- |
| Python | 3.11 或更高，推荐 3.12 |
| Node.js | 22 |
| pnpm | 10.34.4 |
| Git | 最新稳定版 |

::: warning Linux 系统依赖
Ubuntu/Debian 需要额外安装 GTK、WebKit 和打包工具：

```bash
sudo apt-get update
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
```
:::

## 1. 拉取源码

```bash
git clone --recurse-submodules https://github.com/ECLteam/EuoraCraft-Launcher.git
cd EuoraCraft-Launcher
```

如果已经使用普通方式克隆，补充初始化子模块：

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

## 2. 安装后端依赖

::: code-tabs
@tab Windows PowerShell
```powershell
py -3.12 -m venv .venv
Set-ExecutionPolicy -Scope Process Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
```

@tab Linux / macOS
```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
```
:::

## 3. 构建前端

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm build
cd ..
```

前端构建结果位于 `frontend/dist`，后端运行和 PyInstaller 打包都会读取该目录。

## 4. 运行源码

```bash
python main.py
```

Microsoft 登录需要在根目录创建 `.env` 并填写 `MICROSOFT_CLIENT_ID`；未配置时仍可进行不依赖 Microsoft 登录的开发。运行日志位于 `ECL_data/logs`。

## 5. 检查项目

```bash
python -m ruff check ECL tests
python -m pytest -q
```

修改过前端时，在 `frontend` 目录额外运行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 6. 打包桌面程序

::: code-tabs
@tab Windows PowerShell
```powershell
$env:ECL_CONSOLE = "1"
$env:ECL_UPX = "0"
python -m PyInstaller --noconfirm EuoraCraft-Launcher.spec
```

@tab Linux / macOS
```bash
ECL_CONSOLE=1 ECL_UPX=0 python -m PyInstaller --noconfirm EuoraCraft-Launcher.spec
```
:::

| 平台 | 构建结果 |
| --- | --- |
| Windows | `dist/EuoraCraft Launcher.exe` |
| Linux | `dist/EuoraCraft Launcher` |
| macOS | `dist/EuoraCraft Launcher.app` |

终端最后出现 `Build complete!`，并且 `dist` 中存在对应平台的制品，即表示构建完成。

::: tip 常见问题
提示缺少 `frontend/dist` 时，请重新执行第 3 步；子模块目录为空时，请重新运行 `git submodule update --init --recursive`。
:::
