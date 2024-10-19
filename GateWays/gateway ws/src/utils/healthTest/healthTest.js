import serverList from "../ServerList/ServerList.js";
import axios from "axios";

export default function startHealthCheck() {
    async function healthTest() {
        let servers = []; 

        for (const server of serverList) {
            try {
                const response = await axios.get(server.healthUrl);
                
                const serverTmp = { 
                    healthUrl: server.healthUrl,
                    url: server.url,
                    name: server.name,
                    weight: server.weight,
                    currentWeight: server.currentWeight,
                    connection: server.connection,
                    healthy: response.status === 200,
                };

                servers.push(serverTmp); 
            } catch (error) {
                console.error(`Failed to reach ${server.healthUrl}`);
                const serverTmp = { 
                    healthUrl: server.healthUrl,
                    url: server.url,
                    name: server.name,
                    weight: server.weight,
                    currentWeight: server.currentWeight,
                    connection: server.connection,
                    healthy: false,
                };
                
                servers.push(serverTmp); 
            }
        }
        
    }

    healthTest();

    setInterval(healthTest, 30000);
}

