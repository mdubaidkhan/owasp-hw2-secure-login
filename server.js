const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const PORT = 8080;

function validateLogin(email, password) {
    if (!email || !password) {
        return "Email and password are required.";
    }

    if (!email.includes("@")) {
        return "Email must contain @.";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }

    return null;
}

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        const html = fs.readFileSync("index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        return;
    }

    if (req.method === "POST" && req.url === "/login") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = querystring.parse(body);
            const email = data.email || "";
            const password = data.password || "";

            // Server-side validation
            const error = validateLogin(email, password);

            if (error) {
                res.writeHead(400, { "Content-Type": "text/html" });
                res.end(`<h2>Validation Error</h2><p>${error}</p><a href="/">Go back</a>`);
                return;
            }

            // Intentionally vulnerable reflection for Part 3 testing.
            res.writeHead(200, { "Content-Type": "text/html" });
            const safeEmail = email
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

res.end(`<h2>Login successful</h2><p>Welcome, ${safeEmail}</p><a href="/">Go back</a>`);
        });

        return;
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Login application running at http://localhost:${PORT}`);
});