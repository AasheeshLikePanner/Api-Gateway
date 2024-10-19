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
