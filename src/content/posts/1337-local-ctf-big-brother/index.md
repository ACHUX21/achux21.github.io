---
title: "1337 Local CTF: big brother — Reverse Engineering Hidden Session Logic"
published: 2026-06-27
description: "Recovering a hidden rev flag from the challenge binary and confirming submission."
tags: [1337CTF, CTF, Rev, ReverseEngineering]
category: CTF
image: ./cover.png
draft: false
---

# big brother

## Challenge Context

`big brother` was a 500-point reverse-engineering challenge. The final session notes record the flag as submitted and accepted.

## Evidence Preserved

The local detailed reverse-engineering notes for this challenge were not retained in the workspace, but the solving session recorded the accepted flag:

```text
big brother: leet{Gh4_r3S5et1w_se551oNs_34wtAN1_mSG_0pp0} — 500pts, submitted
```

## Core Idea

The flag text points to the intended behavior: reset or recover session/message state (`r3S5et1w_se551oNs`, `mSG`). The challenge likely hid the flag behind program state or session logic rather than a raw printable string.

A publish-quality version of this writeup needs the original reversing notes rebuilt from the binary in:

```text
/home/lain/ctf/1337-local/challenges/rev/big-brother/
```

## Flag

```text
leet{Gh4_r3S5et1w_se551oNs_34wtAN1_mSG_0pp0}
```

## Lesson Learned

Save the reverse-engineering trail as soon as the flag is accepted: tool output, offsets, decryption routine, and why the candidate was correct. The accepted flag alone is enough for an archive, but not enough for a strong public writeup.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
