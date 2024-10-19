import axios from 'axios';
import { useState } from 'react';

export default function RightComp() {
    const [post, setPost] = useState(0);
    const [get, setGet] = useState(0);
    const [totalTime, setTotalTime] = useState(0); // State to store total time taken

    const handlePost = () => {
        async function sendConcurrentRequests() {
            const url = "http://localhost:3000/sum"; // API Gateway URL
            const payload = { a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 };

            const requests = Array.from({ length: post }, () =>
                axios.post(url, payload)
            );

            const startTime = performance.now(); // Start timing

            try {
                await Promise.all(requests);
                const endTime = performance.now(); // End timing
                setTotalTime(endTime - startTime); // Calculate total time taken
            } catch (error) {
                console.error("One or more requests failed:", error.message);
            }
        }

        sendConcurrentRequests();
    };

    const handleGet = async () => {
        async function sendConcurrentRequests() {
            const url = "http://localhost:3000/"; // API Gateway URL

            const requests = Array.from({ length: get }, () =>
                axios.get(url)
            );

            const startTime = performance.now(); // Start timing

            try {
                await Promise.all(requests);
                const endTime = performance.now(); // End timing
                setTotalTime(endTime - startTime); // Calculate total time taken
            } catch (error) {
                console.error("One or more requests failed:", error.message);
            }
        }

        sendConcurrentRequests();
    };

    return (
        <div className="w-full">
            <h1 className="text-white text-2xl text-center font-bold mb-8">
                Sending Request With Gateway API
            </h1>

            <div className="flex gap-8 mt-20">
                <div className="flex flex-col w-1/2 p-5 bg-zinc-700 rounded-lg shadow-md">
                    <h2 className="text-white text-xl font-semibold mb-4">Get Request</h2>
                    <input 
                        type="number" 
                        className="p-2 rounded-lg text-white bg-zinc-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter number of requests"
                        onChange={(e) => setGet(e.target.value)}
                    />
                    <button onClick={handleGet} className="mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">
                        Send
                    </button>
                </div>

                <div className="flex flex-col w-1/2 p-5 bg-zinc-700 rounded-lg shadow-md">
                    <h2 className="text-white text-xl font-semibold mb-4">Post Request</h2>
                    <input 
                        type="number" 
                        className="p-2 rounded-lg bg-zinc-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter number of requests"
                        onChange={(e) => setPost(e.target.value)}
                    />
                    <button onClick={handlePost} className="mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all">
                        Send
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-white text-xl font-semibold">Total Time Taken: {totalTime.toFixed(2)} ms</h3>
            </div>
        </div>
    );
}
