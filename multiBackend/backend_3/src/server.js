import express from "express";
import cors from 'cors';
import sumRoute from './routes/sum.js';
import userRoute from './routes/user.js';
import { initializeWebSocketServer } from './websocket.js';

const app = express();
const PORT = 8003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ["POST", "GET"],
    credentials: true,
}));

// Routes
app.use("/sum", sumRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
    console.log("Request comes to Server 3");
    res.send("Hello");
});

// Initialize WebSocket server
initializeWebSocketServer(8083);

app.listen(PORT, () => {
    console.log(`Backend Server 3 running on port ${PORT}`);
});
