---
title: "1337 Local CTF: The BOSS — .NET Dropper → AES Payload → Rolling XOR"
published: 2026-06-27
description: "Reverse-engineering a .NET malware dropper, decrypting an embedded payload, and extracting a statically built flag."
tags: [1337CTF, CTF, Forensics, DotNet, Malware, AES]
category: CTF
image: ./cover.png
draft: false
---

# The BOSS

## Challenge Context

The challenge provided `invoice.exe`, a suspicious .NET attachment. Dynamic analysis was misleading because of anti-debug and anti-sandbox checks.

## Reconnaissance

Static analysis showed:

```text
anti-debug: Debugger.IsAttached
anti-sandbox: Thread.Sleep timing check
embedded resource: enc_payload.bin
crypto: AES-256-CBC, PaddingMode.None
```

The key was built by string concatenation:

```text
"Sphynx" + "MalwareKey" + "1234567890123456"
= SphynxMalwareKey1234567890123456
```

The IV was:

```text
InitialVector123
```

## Attack Chain

```text
invoice.exe
  -> recover AES key/IV from IL
  -> decrypt enc_payload.bin
  -> Payload.dll
  -> inspect Execute()
  -> rolling XOR decode static byte array
```

## Exploitation

The decrypted DLL built the flag but never printed it. `Execute()` initialized a 38-byte static array, then decoded it with a rolling XOR key:

```text
key starts at 90 (0x5a)
for each byte:
    char = encoded[i] ^ key
    key = (key + 7) mod 256
```

Encoded bytes:

```text
36040d1b0d13b7ffcdeb93c1c286dfb7fbe1b6808bd9988c367b23486c165a00483279213120
```

Python extraction:

```python
data = bytes.fromhex("36040d1b0d13b7ffcdeb93c1c286dfb7fbe1b6808bd9988c367b23486c165a00483279213120")
key = 90
out = []
for b in data:
    out.append(b ^ key)
    key = (key + 7) % 256
print(bytes(out).decode())
```

## Flag

```text
leet{n3t_r3fl3ct10n_m4lw4r3_r3v3rs1ng}
```

## Lesson Learned

The payload's runtime output was decoy text. In malware-style CTFs, the flag often exists only as a constructed string in memory; static IL analysis can be cleaner than executing the sample.

---

Cover: [Wallhaven 7j38je](https://wallhaven.cc/w/7j38je).
