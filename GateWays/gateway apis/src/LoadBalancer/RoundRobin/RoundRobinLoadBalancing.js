import serverList from "../../utils/ServerList/ServerList.js";


let ind = 0;

function RoundRobin(){
    return serverList[i++ % serverList.length];
}

export default RoundRobin;