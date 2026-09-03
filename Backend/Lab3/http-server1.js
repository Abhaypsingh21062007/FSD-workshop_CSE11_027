import http from "http";
import fs from "node:fs/promises";

const port = 3001;
const filePath = "file.txt";

let messages = [];

async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data;
    } catch (err) {
        console.log("Error found:", err);
        return null;
    }
}

const content = await readFile();

console.log(content);

const server = http.createServer((req, resp) => {

    const url = req.url;
    const typ = req.method;

    // GET /msg
    if (url === "/msg" && typ === "GET") {

        resp.writeHead(200, {
            "Content-Type": "application/json"
        });

        resp.end(JSON.stringify({
            message: content
        }));
    }


    // GET /sis
    else if (url === "/sis" && typ === "GET") {

        const userData = {
            name: "abhay",
            id: 1223
        };

        resp.writeHead(200, {
            "Content-Type": "application/json"
        });

        resp.end(JSON.stringify(userData));
    }


    // POST /create
    else if (url === "/create" && typ === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                const newUser = {
                    id: data.id,
                    name: data.name
                };

                messages.push(newUser);

                resp.writeHead(201, {
                    "Content-Type": "application/json"
                });

                resp.end(JSON.stringify({
                    message: "User created successfully",
                    user: newUser
                }));

            } catch (error) {

                resp.writeHead(400, {
                    "Content-Type": "application/json"
                });

                resp.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }


    // Unknown Route
    else {

        resp.writeHead(404, {
            "Content-Type": "application/json"
        });

        resp.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});