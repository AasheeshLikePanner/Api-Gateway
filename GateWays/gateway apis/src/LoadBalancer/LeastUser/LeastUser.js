import serverList from "../../utils/ServerList/ServerList.js";

export default function LeastUser(){
    var bestServer = serverList[0];
    for(const server of serverList){
        if(server.connection < bestServer.connection){
            bestServer = server;
        }
    }
    bestServer.connection += 1;
    return bestServer;
}