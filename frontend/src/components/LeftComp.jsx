import { useState } from "react";
import axios from "axios";

export default function LeftComp() {
    const [post, setPost] = useState(0);
    const [get, setGet] = useState(0);
    const [totalResponseTime, setTotalResponseTime] = useState(0); // State for total response time

    const handlePost = () => {
        async function sendConcurrentRequests() {
            const url = "http://localhost:8001/sum"; // Direct backend URL
            const payload = { a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 };

            const requests = Array.from({ length: post }, () => {
                return axios.post(url, payload);
            });

            const startTime = performance.now(); // Start timing

            try {
                await Promise.all(requests);
                const endTime = performance.now(); // End timing
                const responseTime = endTime - startTime; // Calculate total response time
                setTotalResponseTime(responseTime); // Update the total response time
            } catch (error) {
                console.error("One or more requests failed:", error.message);
            }
        }

        sendConcurrentRequests();
    };

    const handleGet = async () => {
        async function sendConcurrentRequests() {
            const url = "http://localhost:8001/"; // Direct backend URL

            const requests = Array.from({ length: get }, () => {
                return axios.get(url);
            });

            const startTime = performance.now(); // Start timing

            try {
                await Promise.all(requests);
                const endTime = performance.now(); // End timing
                const responseTime = endTime - startTime; // Calculate total response time
                setTotalResponseTime(responseTime); // Update the total response time
            } catch (error) {
                console.error("One or more requests failed:", error.message);
            }
        }

        sendConcurrentRequests();
    };

    return (
        <div className="w-full">
            <h1 className="text-white text-2xl text-center font-bold mb-8">
                Sending Request Without Gateway API
            </h1>

            <div className="flex gap-8 mt-20">
                <div className="flex flex-col w-1/2 p-5 bg-zinc-700 rounded-lg shadow-md">
                    <h2 className="text-white text-xl font-semibold mb-4">Get Request</h2>
                    <input 
                        type="number" 
                        className="p-2 rounded-lg bg-zinc-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter number of requests"
                        onChange={(e) => setGet(e.target.value)}
                    />
                    <button onClick={handleGet} className="mt-4 p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-all">
                        Send
                    </button>
                </div>

                <div className="flex flex-col w-1/2 p-5 bg-zinc-700 rounded-lg shadow-md">
                    <h2 className="text-white text-xl font-semibold mb-4">Post Request</h2>
                    <input 
                        type="number" 
                        className="p-2 rounded-lg bg-zinc-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter number of requests"
                        onChange={(e) => setPost(e.target.value)}
                    />
                    <button onClick={handlePost} className="mt-4 p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all">
                        Send
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-white text-xl font-semibold">Total Time Taken: {totalResponseTime ? `${totalResponseTime.toFixed(2)} ms` : "No requests sent yet."}</h3>
            </div>
        </div>
    );
}
