# OWASP HW2 - Secure Login Form

A basic HTML and JavaScript login form created for the OWASP Juice Shop / OWASP Top 10 assignment.

## Features

- Email and password login
- Client-side validation
- Server-side validation
- Email must contain @
- Password must be at least 8 characters
- Reflected XSS testing and mitigation

## Project Structure

    owasp-hw2-secure-login/
    ├── index.html
    ├── server.js
    └── README.md

## Requirements

- Node.js
- Web browser

No external packages are required.

## How to Run

Clone the repository:

    git clone https://github.com/mdubaidkhan/owasp-hw2-secure-login.git

Enter the project directory:

    cd owasp-hw2-secure-login

Start the server:

    node server.js

Open the application:

    http://localhost:8080

## Validation

The application performs both client-side and server-side validation.

It checks that:

- Email is not empty
- Email contains @
- Password is not empty
- Password is at least 8 characters

## XSS Testing

The original application reflected user-controlled email input directly into the HTML response.

Test payload:

    <script>alert('XSS')</script>@example.com

The payload successfully executed JavaScript in the browser.

The vulnerability was fixed by HTML-encoding special characters before displaying user-controlled input.

After the fix, the same payload was displayed as text and did not execute.

## Security Note

Client-side validation can be bypassed, so server-side validation is also implemented. User-controlled data is HTML-encoded before being included in the response to prevent reflected XSS.
