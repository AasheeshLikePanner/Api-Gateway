import serverList from "../../utils/ServerList/ServerList.js";


export default function WeightedRoundRobin(){
    var bestServer = serverList[0];
       
    for (const server of serverList) {
        if (server.currentWeight > bestServer.currentWeight) {
          bestServer = server;
        }
    }

    bestServer.currentWeight -= serverList.reduce((acc , s) =>  acc + s.weight, 0);
    
    serverList.forEach((s) => (s.currentWeight += s.weight));
    console.log(bestServer.name);
    
    return bestServer;
}