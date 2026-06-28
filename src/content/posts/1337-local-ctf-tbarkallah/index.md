---
title: "1337 Local CTF: tbarkallah 3lek awldi katchfi lghalil — Rev First Blood"
published: 2026-06-27
description: "Accepted first-blood reverse-engineering flag; local detailed analysis needs reconstruction before public publishing."
tags: [1337CTF, CTF, Rev, ReverseEngineering, FirstBlood]
category: CTF
image: ./cover.png
draft: false
---

# tbarkallah 3lek awldi katchfi lghalil

## Challenge Context

This was a 500-point reverse-engineering challenge by Jst3r. The challenge description was:

```text
nsit nasi7a d lwalid
```

The final solve was accepted as first blood.

## Evidence Preserved

The browser submission showed `Correct`, and the session recorded:

```text
tbarkallah 3lek awldi katchfi lghalil:
leet{Y4r81_yrj33_1t7553b_l0g_71m3_Dl0ckScr33n_fL1NuX}
```

## Core Idea

The exact reversing path was not preserved as a local `solution.md`. The accepted flag text references log time and lock screen behavior, which likely maps to the binary's validation logic.

For a public post, rebuild the technical trail from:

```text
/home/lain/ctf/1337-local/challenges/rev/tbarkallah/
```

Minimum reconstruction checklist:

```bash
file extracted/chall
strings -a extracted/chall
objdump -d -M intel extracted/chall
```

Then identify the validation function and show exactly how the flag is derived.

## Flag

```text
leet{Y4r81_yrj33_1t7553b_l0g_71m3_Dl0ckScr33n_fL1NuX}
```

## Lesson Learned

A first blood still needs a reproducible explanation. Capture the derivation immediately, not only the final accepted flag.

---

Cover: [Wallhaven gw52yd](https://wallhaven.cc/w/gw52yd).
