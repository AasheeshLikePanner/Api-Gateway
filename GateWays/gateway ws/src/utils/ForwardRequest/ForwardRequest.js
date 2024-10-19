import axios from 'axios'

export default async function forwardRequest( type,baseUrl,data, server){
    try {
        switch(type){
            case "post":{
                const response = await axios.post(baseUrl, {...data}, {withCredentials:"include"});                
                server.connection = Math.max(0, server.connection - 1);
                return response.data;
            }
            case "get":{
                const response  = await axios.get(baseUrl, {...data}, {withCredentials:'include'})
                server.connection = Math.max(0, server.connection - 1);
                return response.data;
            }
            case "put":{
                const response  = await axios.put(baseUrl, {...data}, {withCredentials:'include'})
                server.connection = Math.max(0, server.connection - 1);
                return response.data;
            }
            default:
                return "Something went wrong";
        }
    } catch (error) {
        console.error
    }
}