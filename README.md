# API Gateway

## Overview

This API Gateway project implements three load balancing strategies: Least Connections, Round Robin, and Weighted Round Robin. It features caching, rate limiting, and health checks to enhance the performance and reliability of backend service requests.

## Features

* **Load Balancing**: Implemented three strategies:
    * **Least Connections**
    * **Round Robin**
    * **Weighted Round Robin**
* **Caching**: Uses Redis for caching responses to improve response times for repeated requests.
* **Rate Limiting**: Limits the number of requests to prevent abuse and ensure fair usage.
* **Health Checks**: Regularly checks the health of backend services to route requests only to healthy instances.
* **API Forwarding**:
    * **HTTP Requests**: Uses Axios to forward HTTP requests.
    * **WebSocket**: Handles WebSocket connections for real-time communication.

## Screenshots

* **Axios Request Benchmark**
![axios](https://github.com/user-attachments/assets/14571183-b35a-48c6-8474-f19e2937ca53)


* **WebSocket Request Benchmark**  
![websocket](https://github.com/user-attachments/assets/863b6ff2-7668-4956-ab48-f3a7746afaf9)

## Getting Started

### Prerequisites

Before running the API Gateway, you need to start the backend servers. 

### Step 1: Run Backend Servers

1. Navigate to the **multibackend** folder.
2. Run the backend servers using the following commands:

```bash
cd multibackend
cd backend_1 # go to every backend folder backend_1, backend_2, and backend_3
node src/server.js # This will start backend_1, backend_2, and backend_3
```
```bash
cd Gateways
cd 'gateway ws' #GO to one folder gateway apis this is for apis request forwarding or gateway ws this is for websockets request forwarding
npm run dev
```
After all this send the request to gateway api like normal requests.
