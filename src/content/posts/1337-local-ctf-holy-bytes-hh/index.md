---
title: "1337 Local CTF: holy bytes hh — Timing Side Channel"
published: 2026-06-27
description: "Extracting a flag bit-by-bit from a deliberate timing leak in a Python loop."
tags: [1337CTF, CTF, Crypto, TimingAttack, SideChannel]
category: CTF
image: ./cover.png
draft: false
---

# holy bytes hh

## Challenge Context

The challenge provided a Python service that asks for a bit position. It converts the flag to a binary string and performs expensive work only when the selected bit is `1`.

## Reconnaissance

The relevant code was:

```python
from math import gcd

with open("flag.txt", "r") as f:
    flag = f.read()

while 1:
    mask = int(input("gimme ur mask > "))
    bits = ''.join(format(ord(c), '08b') for c in flag)
    for bit in bits[mask-1:mask]:
        if bit == '1':
            i = 1
            while gcd(i, 279557) == 1:
                i = i + 1
        else:
            pass
```

## Vulnerability / Core Idea

The branch for `1` takes measurably longer than the branch for `0`. That turns the service into a bit oracle:

```text
fast response  -> selected bit is 0
slow response  -> selected bit is 1
```

## Exploitation

Query bit positions from 1 upward, measure round-trip time, classify each bit, and decode every 8 bits as one byte.

```python
import socket, time

s = socket.socket()
s.settimeout(30)
s.connect(("159.65.235.153", 4446))

bits = ""
for i in range(1, 500):
    s.recv(4096)
    start = time.perf_counter()
    s.send(f"{i}\n".encode())
    s.recv(4096)
    duration = time.perf_counter() - start
    bits += "1" if duration >= 0.17 else "0"

    flag = "".join(chr(int(bits[j:j+8], 2)) for j in range(0, len(bits)-7, 8))
    if "}" in flag:
        print(flag)
        break
```

## Flag

```text
leet{wA7cH_ThEm_BiTs_4pp3ar_0ne_aftA_an0thA}
```

## Lesson Learned

Branch-dependent runtime is enough to leak secrets. If a secret controls whether expensive work happens, the network becomes an oracle.

---

Cover: [Wallhaven gw55w7](https://wallhaven.cc/w/gw55w7).
