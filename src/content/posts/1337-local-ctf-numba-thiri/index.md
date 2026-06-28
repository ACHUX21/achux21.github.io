---
title: "1337 Local CTF: numbA thiri — CRT Reconstruction"
published: 2026-06-27
description: "Recovering the flag integer from residues modulo small primes and a quotient."
tags: [1337CTF, CTF, Crypto, CRT, NumberTheory]
category: CTF
image: ./cover.png
draft: false
---

# numbA thiri

## Challenge Context

The challenge converted the flag to an integer `m`, generated all primes below 105, and printed two things:

1. `m // prod(primes)`
2. A list of `(m % p, p)` residues for each small prime.

## Reconnaissance

The source logic was:

```python
m = bytes_to_long(flag)
primes = []
sieve()
residues = [(m % p, p) for p in primes]
print(m // math.prod(primes))
print(residues)
```

## Vulnerability / Core Idea

The residues reveal `m mod P`, where `P` is the product of all listed primes. The quotient reveals the high part of `m`:

```text
m = quotient * P + (m mod P)
```

So the problem is a direct Chinese Remainder Theorem reconstruction.

## Exploitation

```python
import math
from Crypto.Util.number import long_to_bytes

quotient = 100785
residues = [(0, 2), (0, 3), (4, 5), (4, 7), ...]

P = math.prod(p for _, p in residues)
x = 0
for r, p in residues:
    Mi = P // p
    x = (x + r * Mi * pow(Mi, -1, p)) % P

m = quotient * P + x
print(long_to_bytes(m))
```

The recovered bytes include a trailing newline in the original flag file, but the submitted flag is the text without the newline.

## Flag

```text
leet{R3al_F149_HH}
```

## Lesson Learned

If you publish enough modular residues plus the quotient by the modulus product, you have published the whole integer.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
