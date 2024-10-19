import serverList from "../../utils/ServerList/ServerList.js";


let ind = 0;

function RoundRobin(){
    return serverList[ind++ % serverList.length];
}

export default RoundRobin;