const serverList = [
        {healthUrl:"http://localhost:8001", url:"ws://localhost:8081", name:"server1", weight:10, currentWeight: 0, connection: 0, healthy: true, ws: null},
        {healthUrl:"http://localhost:8002", url:"ws://localhost:8082", name:"server2", weight:3, currentWeight: 0, connection: 0, healthy: true, ws: null},
        {healthUrl:"http://localhost:8003", url:"ws://localhost:8083", name:"server3", weight:7, currentWeight: 0, connection: 0, healthy: true, ws: null} 
    ]


export default serverList;