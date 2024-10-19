import express, { response } from 'express';
import RoundRobin from './LoadBalancer/RoundRobin/RoundRobinLoadBalancing.js';
import forwardRequest from './utils/ForwardRequest/ForwardRequest.js';
import WeightedRoundRobin from './LoadBalancer/WeightedRoundRobin/WeightedRoundRobin.js';
import LeastUser from './LoadBalancer/LeastUser/Leastuser.js';
import rateLimit from 'express-rate-limit';
import startHealthCheck from './utils/healthTest/healthTest.js';
import cors from 'cors';
import serverList from './utils/ServerList/ServerList.js';
import WebSocket from 'ws';
import {createClient} from 'redis';


const app = express();

const client = createClient()
async function redisClient(){
    await client.connect()
}
redisClient()
client.on('error', (err) => console.log('Redis Client Error', err));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
});

const backendWsConnections = serverList.map(server => {
    const ws = new WebSocket(server.url);
    ws.on('open', () => console.log(`${server.name} connected via WebSocket`));
    ws.on('error', error => console.error(`Error in ${server.name}:, error`));
    ws.on('close', () => console.log(`${server.name} connection closed`));
    server.ws = ws;
    return { ...server, ws }; // Return server details with ws connection
});


// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
    origin: '*',
    methods: ["POST", "GET"],
    credentials: true,
}));


//Checking the health of the servers
startHealthCheck();


//apis End point
app.get("/", async (req, res) => {
    const backendServer = RoundRobin();
    const startTime = performance.now(); 
    backendServer.ws.send(
        JSON.stringify({ method: 'GET', route: '/', data: req.query }),
        (err) => err && console.error('Error sending request:', err)
    );

    backendServer.ws.once('message', (response) => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        res.json({ ...JSON.parse(response), responseTime });
    });
});

app.post("/sum", async (req, res) => {
    const backendServer = RoundRobin();
    const startTime = performance.now();
    const cachedData = await client.get(JSON.stringify(req.body));
    if (cachedData) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        res.json({ ...JSON.parse(cachedData), responseTime });
    }else{
            backendServer.ws.send(
                JSON.stringify({ method: 'POST', route: '/sum',type:'sum', data: req.body }),
                (err) => err && console.error('Error sending request:', err)
            );
        
            backendServer.ws.once('message', (response) => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                client.setEx(JSON.stringify(req.body), 3600, response);
                res.json({ ...JSON.parse(response), responseTime });
            }); 
        }
});

app.post("/user", async (req, res) => {
    const backendServer = RoundRobin();
    const startTime = performance.now();
    const cachedData = await client.get(JSON.stringify(req.body));
    if (cachedData) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        res.json({ ...JSON.parse(cachedData), responseTime });
    }else{
        
        backendServer.ws.send(
            JSON.stringify({ method: 'POST', route: '/user', type:'userData' , data: req.body }),
            (err) => err && console.error('Error sending request:', err)
        );
    
        backendServer.ws.once('message', (response) => {
            const endTime = performance.now();
            const responseTime = endTime - startTime;
            client.setEx(JSON.stringify(req.body), 60, response);
            res.json({ ...JSON.parse(response), responseTime });
        });
    }
});

app.listen(3000, () => {
    console.log("Api Gateway Start running");
});