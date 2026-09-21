---
title: 了解 Minecraft 版本清单文件
createTime: 2026/08/04 23:00:00
permalink: /tutorials/minecraft-launcher/fundamentals/version-manifest/
---

# 了解 Minecraft 版本清单文件

::: tip 致读者
本教程不提供完整源码，仅提供思路与关键代码片段。  
详细原因请参见：[教程说明](/tutorials/minecraft-launcher/#致ai)
:::

Minecraft 启动器需要从版本清单（`version.json`）中读取大量配置信息，本章将重点剖析清单文件的核心结构，并说明哪些字段是启动过程中必须关注的。

---

## 清单文件结构概览

现代 Minecraft 版本清单（以 JSON 格式存储）通常包含以下关键部分（已省略非必要字段）：

```json5
{
  "arguments": {
    "game": [
      "--username",
      "${auth_player_name}",
      "--version",
      "${version_name}",
      "--gameDir",
      "${game_directory}",
      "--assetsDir",
      "${assets_root}",
      "--assetIndex",
      "${assets_index_name}",
      "--uuid",
      "${auth_uuid}",
      "--accessToken",
      "${auth_access_token}",
      "--clientId",
      "${clientid}",
      "--xuid",
      "${auth_xuid}",
      "--versionType",
      "${version_type}"
      // ... 更多游戏参数
    ],
    "jvm": [
      "--sun-misc-unsafe-memory-access=allow",
      "--enable-native-access=ALL-UNNAMED",
      "-Djava.library.path=${natives_directory}/java",
      "-Djna.tmpdir=${natives_directory}/jna",
      "-Dorg.lwjgl.system.SharedLibraryExtractPath=${natives_directory}/lwjgl",
      "-Dio.netty.native.workdir=${natives_directory}/netty",
      "-Dminecraft.launcher.brand=${launcher_name}",
      "-Dminecraft.launcher.version=${launcher_version}",
      "-cp",
      "${classpath}"
      // ... 更多 JVM 参数
    ]
  },
  "assetIndex": {
    "id": "32",
    "sha1": "49da57a9512de46382d2fe4b68af047fea7a16f9",
    "size": 586366,
    "totalSize": 477011740,
    "url": "https://piston-meta.mojang.com/v1/packages/49da57a9512de46382d2fe4b68af047fea7a16f9/32.json"
  },
  "downloads": {
    "client": {
      "sha1": "2dc72797acbc1b63fc16a11c4ac393605f453754",
      "size": 39193383,
      "url": "https://piston-data.mojang.com/v1/objects/2dc72797acbc1b63fc16a11c4ac393605f453754/client.jar"
    }
  },
  "id": "26.2",
  "javaVersion": {
    "component": "java-runtime-epsilon",
    "majorVersion": 25
  },
  "libraries": [
    {
      "downloads": {
        "artifact": {
          "path": "at/yawk/lz4/lz4-java/1.10.1/lz4-java-1.10.1.jar",
          "sha1": "f541d7f910fe3d76f38f799c507c48cc81b12ecb",
          "size": 910232,
          "url": "https://libraries.minecraft.net/at/yawk/lz4/lz4-java/1.10.1/lz4-java-1.10.1.jar"
        }
      },
      "name": "at.yawk.lz4:lz4-java:1.10.1"
    }
    // ... 更多依赖库
  ],
  "mainClass": "net.minecraft.client.main.Main",
  "releaseTime": "2026-06-16T12:03:33+00:00",
  "time": "2026-06-16T12:03:33+00:00",
  "type": "release"
}
```

> 📝 **注**：上述示例使用了 JSON5 语法（允许注释），实际清单文件为纯 JSON，不含注释。

---

## 关键字段详解

启动器开发只需关注以下字段，其余字段（如 `releaseTime` 等）不影响启动逻辑。

| 字段路径 | 类型 | 说明 |
|----------|------|------|
| `arguments.game` | `string[]` | 游戏引擎本身需要的启动参数，如用户名、游戏目录等，包含占位符。 |
| `arguments.jvm` | `string[]` | Java 虚拟机运行时参数，如库路径、系统属性等，同样包含占位符。 |
| `assetIndex.id` | `string` | 资源索引标识符（如 `"32"`），用于定位对应的资源索引 JSON 文件。 |
| `assetIndex.sha1` | `string` | 资源索引文件的 SHA-1 哈希值，用于校验文件完整性。 |
| `downloads.client` | `object` | 游戏客户端主 JAR 文件的下载信息，包含 `sha1`、`size`、`url`。 |
| `id` | `string` | 版本名称（如 `"26.2"`），许多启动器会将其显示在界面或用于目录命名。 |
| `javaVersion.majorVersion` | `number` | 推荐使用的 Java 主版本号（如 `25`），低于此版本可能无法正常启动。 |
| `libraries` | `object[]` | 所有依赖库的列表，每个库包含 `name`（Maven 坐标）和下载信息。 |
| `mainClass` | `string` | 游戏主入口类（如 `net.minecraft.client.main.Main`），用于 Java 命令的类名。 |
| `type` | `string` | 版本类型，如 `"release"`（正式版）、`"snapshot"`（快照）等。 |

---

## 关于依赖库的特别说明

### Maven 库的 `sha1` 位置不固定

不同版本的清单中，库文件的 SHA-1 哈希值可能出现在不同位置，通常有两种形式：

**形式一**（嵌套在 `downloads.artifact` 中）：
```json
{
  "libraries": [
    {
      "downloads": {
        "artifact": {
          "sha1": "f541d7f910fe3d76f38f799c507c48cc81b12ecb"
        }
      }
    }
  ]
}
```

**形式二**（直接位于库对象下）：
```json
{
  "libraries": [
    {
      "sha1": "ada2141c0cc52ee8f5c48cd5fa4ce0e794f22236"
    }
  ]
}
```

> 💡 **建议**：在解析时，应兼容两种结构，优先查找 `downloads.artifact.sha1`，若不存在则回退到顶层的 `sha1`。
