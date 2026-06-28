---
title: "1337 Local CTF: baby overflow — Integer Overflow"
published: 2026-06-27
description: "Using an 8-bit integer wraparound to satisfy a numeric check."
tags: [1337CTF, CTF, Pwn, IntegerOverflow]
category: CTF
image: ./cover.png
draft: false
---

# baby overflow

## Challenge Context

This was a small pwn challenge built around an integer overflow. The final state from the solve notes records the relevant arithmetic:

```text
uint8_t value 250 + 16 = 266 % 256 = 10
```

## Vulnerability / Core Idea

The program used an 8-bit integer for a value that was later increased. In C-like semantics, an unsigned 8-bit integer wraps modulo 256:

```text
250 + 16 = 266
266 mod 256 = 10
```

If the program expects the value to become `10`, we can reach it with a larger-looking input because the type truncates it.

## Exploitation

The solve was to supply the value that triggers wraparound instead of trying to enter the target value directly:

```text
input: 250
operation: +16
stored uint8_t result: 10
```

That satisfied the check and printed the flag.

## Flag

```text
leet{M0W471N_M15r1_6H4D1_64N8_17174}
```

## Lesson Learned

Always reason about the storage type, not only the mathematical expression. Small integer types silently wrap unless the program checks bounds before arithmetic.

---

Cover: [Wallhaven 3qwqld](https://wallhaven.cc/w/3qwqld).
