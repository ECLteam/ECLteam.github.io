---
title: Build from Source
permalink: /en/development/setup/build-from-source/
createTime: 2026/08/12 21:30:00
---

# Build the Project

EuoraCraft Launcher consists of a Python backend, the `frontend` frontend submodule, and the `ECL/game` core submodule. Clone the repository together with its submodules.

## Requirements

| Tool | Version |
| --- | --- |
| Python | 3.11 or later; 3.12 recommended |
| Node.js | 22 |
| pnpm | 10.34.4 |
| Git | Latest stable version |

::: warning Linux system dependencies
Ubuntu/Debian additionally require GTK, WebKit, and packaging tools:

```bash
sudo apt-get update
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
```
:::

## 1. Clone the source

```bash
git clone --recurse-submodules https://github.com/ECLteam/EuoraCraft-Launcher.git
cd EuoraCraft-Launcher
```

If you cloned normally, initialize the submodules afterwards:

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

## 2. Install backend dependencies

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

## 3. Build the frontend

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm build
cd ..
```

The frontend build output is located in `frontend/dist`. Both the backend runtime and PyInstaller packaging read this directory.

## 4. Run from source

```bash
python main.py
```

Microsoft sign-in requires a `.env` file in the repository root containing `MICROSOFT_CLIENT_ID`. Development that does not depend on Microsoft sign-in still works without it. Runtime logs are stored in `ECL_data/logs`.

## 5. Check the project

```bash
python -m ruff check ECL tests
python -m pytest -q
```

After changing the frontend, also run the following commands in `frontend`:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 6. Package the desktop app

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

| Platform | Build output |
| --- | --- |
| Windows | `dist/EuoraCraft Launcher.exe` |
| Linux | `dist/EuoraCraft Launcher` |
| macOS | `dist/EuoraCraft Launcher.app` |

The build is complete when the terminal displays `Build complete!` and the corresponding artifact exists in `dist`.

::: tip Common issues
If `frontend/dist` is missing, repeat step 3. If submodule directories are empty, run `git submodule update --init --recursive` again.
:::
