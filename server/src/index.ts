import { createServer } from "http";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development.local" });

// Use the correct environment variable name
const mongoUrl = process.env.MONGO_URL;
console.log("MONGO_URL:", mongoUrl ? "Loaded successfully" : "NOT FOUND");

if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is required");
}

const client = new MongoClient(mongoUrl);
let db;
let users_collection; // Fixed typo: was "users_colliection"

const initdb = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB");
        
        db = client.db("pokemonUsers"); // No need for await here
        users_collection = db.collection("users"); // No need for await here
        console.log("Database initialized successfully");
        console.log(users_collection);
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
};

const handleRequest = async (req: any, res: any) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    try {
        if (req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/plain" }); // Fixed: "text/plain"
            res.end("server is running on port 3000");
        } else if (req.url === "/listing") {
            res.writeHead(200, { "Content-Type": "text/plain" }); // Fixed: "text/plain"
            res.end("Listing Download \n please Wait ... ");
        } else if (req.url === "/users") {
            const users = await users_collection.find({}).toArray();
            console.log(users);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" }); // Fixed: 404 status
            res.end("404 not found");
        }
    } catch (error) {
        console.error("Request handling error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
    }
};

// Start the server
const startServer = async () => {
    try {
        await initdb();
        const server = createServer(handleRequest);
        server.listen(3000, () => {
            console.log("*** --> server on port 3000 Running <-- ***");
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
