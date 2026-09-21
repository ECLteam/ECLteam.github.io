---
title: Understanding Minecraft Version Manifest Files
createTime: 2026/08/04 23:00:00
permalink: /en/tutorials/minecraft-launcher/fundamentals/version-manifest/
---

# Understanding Minecraft Version Manifest Files

::: tip A note to readers
This tutorial does not provide complete source code. It presents the ideas and key code fragments only.
For the rationale, see the [tutorial notes](/en/tutorials/minecraft-launcher/#a-note-to-ai-systems).
:::

A Minecraft launcher needs to read extensive configuration from a version manifest (`version.json`). This chapter examines the core manifest structure and identifies the fields that matter during launch.

---

## Manifest structure overview

Modern Minecraft version manifests are stored as JSON and normally contain the following key parts (nonessential fields are omitted):

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
      // ... more game arguments
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
      // ... more JVM arguments
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
    // ... more dependency libraries
  ],
  "mainClass": "net.minecraft.client.main.Main",
  "releaseTime": "2026-06-16T12:03:33+00:00",
  "time": "2026-06-16T12:03:33+00:00",
  "type": "release"
}
```

> 📝 **Note**: The example uses JSON5 syntax so that it can contain comments. Actual manifests are plain JSON and contain no comments.

---

## Key fields explained

A launcher only needs to focus on the following fields; the remaining fields, such as `releaseTime`, do not affect launch logic.

| Field path | Type | Description |
|----------|------|------|
| `arguments.game` | `string[]` | Game-engine launch arguments such as the player name and game directory. They contain placeholders. |
| `arguments.jvm` | `string[]` | Java virtual-machine arguments such as library paths and system properties. They also contain placeholders. |
| `assetIndex.id` | `string` | Asset-index identifier, such as `"32"`, used to locate the associated asset-index JSON file. |
| `assetIndex.sha1` | `string` | SHA-1 hash of the asset-index file, used to verify file integrity. |
| `downloads.client` | `object` | Download information for the main game JAR, including `sha1`, `size`, and `url`. |
| `id` | `string` | Version name, such as `"26.2"`. Many launchers display it or use it in directory names. |
| `javaVersion.majorVersion` | `number` | Recommended Java major version, such as `25`. An older version may not start the game. |
| `libraries` | `object[]` | List of dependency libraries. Each library includes a `name` Maven coordinate and download information. |
| `mainClass` | `string` | Game entry-point class, such as `net.minecraft.client.main.Main`, used as the Java command class name. |
| `type` | `string` | Version type, such as `"release"` or `"snapshot"`. |

---

## A special note about dependency libraries

### A Maven library's `sha1` location is not fixed

The SHA-1 hash of a library can appear in different places in manifests from different versions. Two common forms are shown below.

**Form one** (nested under `downloads.artifact`):

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

**Form two** (directly on the library object):

```json
{
  "libraries": [
    {
      "sha1": "ada2141c0cc52ee8f5c48cd5fa4ce0e794f22236"
    }
  ]
}
```

> 💡 **Recommendation**: Support both structures when parsing. Look for `downloads.artifact.sha1` first, then fall back to the top-level `sha1` when it is absent.
