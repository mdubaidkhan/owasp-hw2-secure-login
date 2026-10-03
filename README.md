# OWASP HW2 - Secure Login Form

A basic HTML and JavaScript login form created for the OWASP Juice Shop / OWASP Top 10 assignment (CSCE 703, HW 2-B).

## Features

- Email and password login
- Client-side validation
- Server-side validation
- Email must contain `@`
- Password must be at least 8 characters
- Reflected XSS testing and mitigation

## Project Structure

```
owasp-hw2-secure-login/
├── index.html
├── server.js              # Fixed (secure) version
├── server_vulnerable.js   # Original version with the reflected XSS flaw
└── README.md
```

## Requirements

- Node.js
- Web browser

No external packages are required.

## How to Run

Clone the repository:

```
git clone https://github.com/mdubaidkhan/owasp-hw2-secure-login.git
cd owasp-hw2-secure-login
```

### Option 1: Secure (fixed) version

```
node server.js
```

### Option 2: Vulnerable version (to reproduce the XSS attack first)

```
node server_vulnerable.js
```

Then open the application in your browser:

```
http://localhost:8080
```

Both servers use port 8080, so stop one (Ctrl+C) before starting the other.

## Validation

The application performs both client-side and server-side validation. It checks that:

- Email is not empty
- Email contains `@`
- Password is not empty
- Password is at least 8 characters

## XSS Testing

To reproduce the attack, run `server_vulnerable.js`, open `http://localhost:8080`, and submit this payload as the email (with any password of 8+ characters):

```
<script>alert('XSS')</script>@example.com
```

The vulnerable server reflects the email directly into the HTML response, so the script executes and an alert appears.

To verify the fix, stop the vulnerable server and run `node server.js`. The same payload now appears as plain text and does not execute, because special characters (`&`, `<`, `>`, `"`, `'`) are HTML-encoded before being included in the response.

## Security Note

Client-side validation can be bypassed, so server-side validation is also implemented. User-controlled data is HTML-encoded before being included in the response to prevent reflected XSS.

> **Warning:** `server_vulnerable.js` is intentionally insecure and exists for educational purposes only. Do not deploy it.
