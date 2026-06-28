---
title: "1337 Local CTF: Baby-AES — Known Plaintext → Tiny Keyspace"
published: 2026-06-27
description: "Recovering a 9-byte AES key by using the known flag format and a known plaintext/ciphertext pair."
tags: [1337CTF, CTF, Crypto, AES, KnownPlaintext]
category: CTF
image: ./cover.png
draft: false
---

# Baby-AES

## Challenge Context

The challenge provided `aes.py`. The script reads the flag, uses it as an AES key padded with null bytes, encrypts a 16-byte zero block in ECB mode, and prints the ciphertext.

## Reconnaissance

The important part of the source was:

```python
with open("flag.txt", "rb") as f:
    flag = f.read().strip()

key = flag + b"\x00" * (16 - len(flag))
cipher = AES.new(key, AES.MODE_ECB)
pt = b"\x00" * 16
ct = cipher.encrypt(pt)

print("len(flag): ", len(flag))
print("Ciphertext (hex):", ct.hex())
```

The output told us:

```text
len(flag): 9
Ciphertext (hex): 489b02c7245f7d5b6221ba7bd7f85c29
```

## Vulnerability / Core Idea

The flag is the AES key. Because the flag length is 9 and the format is `leet{...}`, only three bytes are unknown:

```text
leet{???}
```

This is not an AES break. The cryptographic mistake is turning a low-entropy, format-constrained secret into a symmetric key and revealing a known plaintext/ciphertext pair.

## Exploitation

For each candidate `leet{XYZ}`:

1. Pad it with seven null bytes to produce a 16-byte AES key.
2. Encrypt `00 * 16` under AES-ECB.
3. Compare the output to `489b02c7245f7d5b6221ba7bd7f85c29`.

```python
from Crypto.Cipher import AES
import itertools, string

target = bytes.fromhex("489b02c7245f7d5b6221ba7bd7f85c29")
pt = b"\x00" * 16
charset = string.ascii_letters + string.digits + "_!@#$%^&*()-+=[]{}|;:',.<>?/~`"

for a, b, c in itertools.product(charset, repeat=3):
    flag = f"leet{{{a}{b}{c}}}".encode()
    key = flag + b"\x00" * 7
    if AES.new(key, AES.MODE_ECB).encrypt(pt) == target:
        print(flag.decode())
        break
```

## Flag

```text
leet{lol}
```

## Lesson Learned

Known plaintext plus a tiny keyspace turns strong primitives into a dictionary check. The primitive was fine; the key derivation was the bug.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
