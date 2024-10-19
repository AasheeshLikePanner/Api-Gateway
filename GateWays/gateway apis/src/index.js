import express from 'express';
import RoundRobin from './LoadBalancer/RoundRobin/RoundRobinLoadBalancing.js';
import forwardRequest from './utils/ForwardRequest/ForwardRequest.js';
import rateLimit from 'express-rate-limit';
import startHealthCheck from './utils/healthTest/healthTest.js';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
const client = createClient()
async function redisClient(){
    await client.connect()
}
redisClient()
client.on('error', (err) => console.log('Redis Client Error', err));

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
});

// Middleware
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ origin: '*', methods: ['POST', 'GET'], credentials: true }));

startHealthCheck();

// Routes
app.get('/', async (req, res) => {
    try {
        const baseUrl = RoundRobin();
        const startTime = performance.now();

        const response = await forwardRequest('get', baseUrl.url, req.body, baseUrl);

        const endTime = performance.now();
        res.json({ ...response, responseTime: endTime - startTime });
    } catch (error) {
        console.error('Error in GET /:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/sum', async (req, res) => {
    const key = JSON.stringify(req.body);
    const baseUrl = RoundRobin();
    const startTime = performance.now();

    const cachedData = await client.get(key);
    try {
        if(cachedData){
            const endTime = performance.now();
            res.json({ ...JSON.parse(cachedData), responseTime: endTime - startTime });
        }else{
            const response = await forwardRequest('post', `${baseUrl.url}/sum`, req.body, baseUrl);
            client.setEx(key, 60, JSON.stringify(response))
            const endTime = performance.now();
            console.log(response);
            
            res.json({...response, responseTime: endTime - startTime});
        }
    } catch (error) {
        console.log("Error in /sum route:", error.message);
        res.status(500).send("Internal server Error")
    }
});

app.post('/user', async (req, res) => {
    const key = JSON.stringify(req.body);
    const baseUrl = RoundRobin();
    const startTime = performance.now();

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            const endTime = performance.now();
            console.log("1");
            res.json({ ...JSON.parse(cachedData), responseTime: endTime - startTime });
        } else {
            const response = await forwardRequest('post', `${baseUrl.url}/user`, req.body, baseUrl);
            await client.setEx(key, 60, JSON.stringify(response));
            const endTime = performance.now();
            res.json({ ...response, responseTime: endTime - startTime });
        }
    } catch (error) {
        console.error("Error in /user route:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(3000, () => {
    console.log('API Gateway started on port 3000');
});
