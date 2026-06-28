---
title: "1337 Local CTF: BASIT — Apache Traversal → Encrypted ZIP → Nested Stego"
published: 2026-06-27
description: "Following a PCAP attack chain from Apache CVE-2021-41773 to an encrypted archive and hidden image payload."
tags: [1337CTF, CTF, Forensics, PCAP, Apache, CVE202141773, Steganography]
category: CTF
image: ./cover.png
draft: false
---

# BASIT

## Challenge Context

BASIT was a network forensics challenge. The PCAP showed an attacker exploiting an internal Apache server and exfiltrating an encrypted archive.

## Reconnaissance

The traffic identified:

```text
attacker: 10.0.0.66
victim:   10.0.0.10
server:   Apache/2.4.49 (Ubuntu)
```

Apache 2.4.49 is vulnerable to path traversal via CVE-2021-41773 when misconfigured.

## Attack Chain

```text
Apache path traversal
  -> read /var/www/html/.env
  -> recover archive password
  -> download bocal.zip
  -> decrypt ZIP
  -> inspect PNG trailing data
  -> extract hidden ZIP
  -> recover flag from final image/text
```

## Exploitation

The traversal used the classic encoded path:

```text
/icons/.%2e/%2e%2e/%2e%2e/
```

The attacker read sensitive files including:

```text
/etc/passwd
/etc/hostname
/var/www/html/.env
/var/www/html/.htpasswd
```

The `.env` exposed an archive secret. That password decrypted `bocal.zip`. Inside, `bocal.png` contained data after the PNG `IEND` marker: another hidden ZIP. Extracting that second layer led to the final flag.

Nested structure:

```text
bocal.zip
  -> bocal.png
      -> data after IEND
          -> hidden ZIP
              -> staff.txt / staff.png
                  -> flag
```

## Flag

```text
leet{W1r3sh4rk_k1ws1_lh4dr4_1mz47a}
```

## Lesson Learned

Good PCAP forensics reconstructs the attacker's path, not just the final artifact. Here the flag only made sense after following traversal, credential disclosure, archive extraction, and PNG stego layers.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
