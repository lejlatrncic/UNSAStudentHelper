import React, { useEffect } from 'react';

const Chatbot = () => {
    useEffect(() => {
        // Set the chatbot configuration before the script is loaded
        window.chtlConfig = {
            chatbotId: "3514628687",
            display: "page_inline"
        };

        // Create and load the chatbot script
        const script = document.createElement("script");
        script.src = "https://chatling.ai/js/embed.js";
        script.async = true;
        script.onload = () => {
            // Optionally handle post-script load logic here
            console.log("Chatbot script loaded successfully.");
        };
        script.onerror = (error) => {
            console.error("Failed to load the chatbot script", error);
        };
        document.body.appendChild(script);

        // Cleanup the script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);  // Empty dependency array ensures this runs only on mount

    return (
        <div
            className="container-fluid d-flex flex-column p-0"
            style={{ height: 'calc(100vh - 100px)' }}
        >
            {/* The chatbot container */}
            <div id="chatling-inline-bot" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default Chatbot;
