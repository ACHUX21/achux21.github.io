---
title: "1337 Local CTF: Encrypted Callback — TLS 1.3 Decryption → PowerShell Malware"
published: 2026-06-27
description: "Decrypting TLS 1.3 traffic with sslkeylog.log, unpacking PowerShell stages, and reversing exfiltrated telemetry."
tags: [1337CTF, CTF, Forensics, TLS13, PowerShell, Malware]
category: CTF
image: ./cover.png
draft: false
---

# Encrypted Callback

## Challenge Context

The challenge provided a PCAP/PCAPNG and `sslkeylog.log`. The traffic contained suspicious PowerShell activity over TLS on localhost port 8443.

## Reconnaissance

Important TLS details:

```text
cipher suite: TLS_AES_256_GCM_SHA384 (0x1302)
server sends NewSessionTicket before HTTP responses
HTTP response application-data records start at sequence number 2
```

Those two details mattered: SHA-384 must be used for HKDF, and TLS record sequence numbers must account for NewSessionTicket records.

## Attack Chain

```text
sslkeylog.log
  -> TLS 1.3 application-data decryption
  -> GET /stage1 response
  -> PowerShell -EncodedCommand
  -> AES-CBC key/IV
  -> decrypt /stage2.enc
  -> reverse telemetry transform
  -> flag
```

## Exploitation

Stage 1 was a Base64-encoded PowerShell downloader. Decoding it revealed:

```text
AES key: 0123456789abcdef0123456789abcdef
AES IV:  abcdef0123456789
```

Stage 2 decrypted to logic that XORed the flag with `Sup3rS3cr3t`, converted the bytes to hex, reversed the hex string, and base64 encoded it before POSTing telemetry.

The telemetry value was:

```json
{
  "machine_id": "DESKTOP-89A4B",
  "data": "RTQ4MTQxMjM4MTg1MDAyMDI1MTNBMUI1MzExMEMwNTEyNTMxMjAyNTQwOTA3NDUxMDFGMw=="
}
```

Decoding process:

```python
import base64
blob = "RTQ4MTQxMjM4MTg1MDAyMDI1MTNBMUI1MzExMEMwNTEyNTMxMjAyNTQwOTA3NDUxMDFGMw=="
hex_reversed = base64.b64decode(blob).decode()
xored = bytes.fromhex(hex_reversed[::-1])
key = b"Sup3rS3cr3t"
flag = bytes(xored[i] ^ key[i % len(key)] for i in range(len(xored)))
print(flag.decode())
```

## Flag

```text
leet{Waaaaa_tchhbaarklaah}
```

## Lesson Learned

TLS key logs do not remove all complexity. For TLS 1.3, the cipher-suite hash and record sequence numbers are part of the decryption state.

---

Cover: [Wallhaven ly3gmr](https://wallhaven.cc/w/ly3gmr).
