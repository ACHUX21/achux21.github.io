---
title: "1337 Local CTF: intro to zk — Broken Fiat-Shamir Binding"
published: 2026-06-27
description: "Forging a Sigma protocol proof because the verifier's challenge is constant and not bound to the commitment."
tags: [1337CTF, CTF, Crypto, ZKP, FiatShamir, secp256k1]
category: CTF
image: ./cover.png
draft: false
---

# intro to zk

## Challenge Context

The service implements a Sigma-style proof of knowledge on secp256k1. The prover is supposed to prove knowledge of witness `w` where `P = wG`.

## Reconnaissance

The fatal function was the challenge generator:

```python
def generate_challenge(self, R):
    response = requests.get("https://example.com/" + os.urandom(35).hex())
    data = response.text.encode()
    return bytes_to_long(hashlib.sha256(data).digest())
```

## Vulnerability / Core Idea

There are two bugs:

1. The challenge `c` does not depend on the commitment `R`.
2. `example.com` returns stable HTML for arbitrary paths, so `c` is predictable before committing.

That breaks soundness. We can choose a commitment that cancels the public key term.

## Exploitation

The verifier checks:

```text
zG == R + cP
```

Because `c` is known ahead of time, choose:

```text
R = -cP
z = 0
```

Then:

```text
zG     = 0G       = O
R + cP = -cP + cP = O
```

The proof verifies without knowing `w`.

```python
# After receiving public key P from the server:
c = sha256(example_com_html).digest_as_int()
R = negate(point_mul(c, P))
z = 0
# send R, then z
```

## Flag

```text
leet{v3rY_9o0d_Bu7_juSt_so_u_kN0w_mod3rn_ZK_is_s0ME7hin9_3l53}
```

## Lesson Learned

Fiat-Shamir style challenges must be bound to the commitment and transcript. If the prover can know `c` before choosing `R`, they can program the equation instead of proving knowledge.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
