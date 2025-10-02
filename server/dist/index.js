import { createServer } from "http";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });
// Use the correct environment variable name
const mongoUri = process.env.MONGO_URI;
console.log("MONGO_URI:", mongoUri ? "Loaded successfully" : "NOT FOUND");
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is required");
}
const client = new MongoClient(mongoUri);
let db;
let users_collection; // Fixed typo: was "users_colliection"
const initdb = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("game_users"); // No need for await here
        users_collection = db.collection("users"); // No need for await here
        console.log("Database initialized successfully");
    }
    catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
};
const handleRequest = async (req, res) => {
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
        }
        else if (req.url === "/listing") {
            res.writeHead(200, { "Content-Type": "text/plain" }); // Fixed: "text/plain"
            res.end("Listing Download \n please Wait ... ");
        }
        else if (req.url === "/users") {
            const users = await users_collection.find({}).toArray();
            console.log(users);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
        }
        else {
            res.writeHead(404, { "Content-Type": "text/plain" }); // Fixed: 404 status
            res.end("404 not found");
        }
    }
    catch (error) {
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
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
// import {createServer} from "http";
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.development.local" });
// console.log("MONGO_URI:", process.env.MONGO_URL);
// // const client = new MongoClient('mongodb+srv://al19842000_db_user:<db_password>@cluster0.mbpt4ek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// const client = new MongoClient(aprocess.env.MONGO_URL);
// let db;
// let users_colliection;
// const initdb = async() => {
//     await client.connect()
//     db = await client.db("game_users");
//     users_colliection = await db.collection("users");
// }
// // const setCorsHeaders = (res) => {
// //   res.setHeader('Access-Control-Allow-Origin', '*');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// // }; 
// const handelRequest = async(req, res)=>{
//     if(req.url === "/"){
//         res.writeHead(200, {"Content-Type": "text/type"});      // "text/type" == download file with text 
//         res.end("server it running in port 3000");
//     }else if (req.url === "/listing"){
//         res.writeHead(200, {"Content-Type": "text/type"});      // "text/type" == download file with text 
//         res.end("Listing Download \n please Wait ... ");
//     }else if (req.url === "/users"){
//         const users = await users_colliection.find({}).toArray();
//         console.log(users);
//         res.writeHead(200, {"Content-Type": "application/json"});      
//         res.end(JSON.stringify(users));
//     }else{
//         res.writeHead(200, {"Content-Type": "text/type"});      // "text/type" == download file with text 
//         res.end("404 nut finding ");
//     }
// }
// const server = createServer(handelRequest);
// await initdb();
// server.listen(3000, () => {console.log(" *** --> server im port 3000 Running <-- ***")});
// // res.writeHead(200, {"Content-Type": "text/type"});      // "text/type" == download file with text 
