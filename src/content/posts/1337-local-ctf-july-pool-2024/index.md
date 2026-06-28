---
title: "1337 Local CTF: July pool 2024 — Dangling Git Commits"
published: 2026-06-27
description: "Recovering a split flag from unreachable Git objects inside a piscine project archive."
tags: [1337CTF, CTF, Misc, GitForensics]
category: CTF
image: ./cover.png
draft: false
---

# July pool 2024

## Challenge Context

The archive contained a 1337 piscine project repository. The visible files looked normal, but the flag was hidden in Git history rather than the working tree.

## Reconnaissance

The challenge title and project layout pointed at Git forensics. The key commands were:

```bash
unzip pool.zip
cd Exams42
find .git -type f | head
git fsck --lost-found
git log --all --oneline
```

## Vulnerability / Core Idea

Git stores objects even when commits are no longer reachable from a branch. If a secret was committed and then removed or orphaned, it may still exist as a dangling commit/blob.

## Exploitation

`git fsck` revealed dangling commits. Inspecting each commit recovered five backup secret parts. Combining the parts produced the flag.

```bash
git fsck --lost-found
for c in $(git fsck --no-reflogs 2>/dev/null | awk '/dangling commit/ {print $3}'); do
  git show --stat --patch "$c"
done
```

## Flag

```text
leet{d4ngl1ng_c0mm1t5_4r3_1mp0rt4nt}
```

## Lesson Learned

Deleting a secret from the working tree does not delete it from Git history. In CTFs and in real incidents, always inspect unreachable commits and blobs.

---

Cover: [Wallhaven k81776](https://wallhaven.cc/w/k81776).
