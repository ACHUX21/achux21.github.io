---
title: "1337 Local CTF: MOL TAXI — Phishing PCAP → XOR Malware Layers"
published: 2026-06-27
description: "Extracting an encrypted invoice from HTTP traffic and peeling XOR, Base64, zlib, and malware config layers."
tags: [1337CTF, CTF, Forensics, PCAP, Malware, XOR]
category: CTF
image: ./cover.png
draft: false
---

# MOL TAXI

## Challenge Context

The challenge provided a phishing email and a small PCAP. The email claimed to be an urgent invoice and pointed the victim to an encrypted payload.

## Attack Chain

```text
phishing_email.eml
  -> invoice URL and decryption key
  -> PCAP HTTP response body
  -> XOR decrypt invoice.enc
  -> Python loader
  -> base64 + zlib payload
  -> embedded flag XORed with C2 config
```

## Reconnaissance

The email revealed:

```text
URL: http://malicious.local/invoice.enc
key: Sup3rS3cr3tK3y
```

The PCAP contained one HTTP GET for `/invoice.enc` and a 485-byte binary response.

## Exploitation

First layer: repeated-key XOR with the email key produced Python code:

```python
import base64, zlib
exec(zlib.decompress(base64.b64decode(b'eJxtUdtq...')))
```

Instead of executing it, decode it safely. The decompressed malware contained:

```python
enc_flag = [47, 87, 58, 39, 62, 58, 58, 46, 57, 0, 19, 44,
            30, 37, 46, 51, 29, 93, 102, 112, 83, 50, 58, 56]
key = "C2_SERVER_READY_x99"
```

Flag recovery:

```python
flag = ''.join(chr(enc_flag[i] ^ ord(key[i % len(key)])) for i in range(len(enc_flag)))
print(flag)
```

## Flag

```text
leet{hlkk_Ai_awled_3ami}
```

## Lesson Learned

Do not execute malware loaders just because they are Python. Decode each layer statically and treat C2 configuration as likely key material.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
