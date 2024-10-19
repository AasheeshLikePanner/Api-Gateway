import axios from "axios";

export default async function forwardRequest(type, baseUrl, data, server) {
    try {
        let response;
        switch (type) {
            case "post":
                response = await axios.post(baseUrl, data, { withCredentials: "include" });
                break;
            case "get":
                response = await axios.get(baseUrl, { withCredentials: "include" });
                break;
            case "put":
                response = await axios.put(baseUrl, data, { withCredentials: "include" });
                break;
            default:
                throw new Error("Invalid request type");
        }

        server.connection = Math.max(0, server.connection - 1);
        return response.data; // Return only the data part
    } catch (error) {
        console.error("Error in forwardRequest:", error.message);
        throw error; // Ensure the calling function handles the error
    }
}
