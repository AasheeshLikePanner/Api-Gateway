import serverList from "../ServerList/ServerList.js";
import axios from "axios";

export default function startHealthCheck() {
    async function healthTest() {
        for (const server of serverList) {
            try {
                const response = await axios.get(server.url);
                server.healthy = response.status === 200;
                const { ws, ...serverWithoutWs } = healthyServer; 
                servers.push(serverWithoutWs);
            } catch (error) {
                console.error(`Failed to reach ${server.url}:`, error.message);
                server.healthy = false; 
            }
            console.log(server); 
        }
    }

    healthTest();

    setInterval(healthTest, 30000);
}


