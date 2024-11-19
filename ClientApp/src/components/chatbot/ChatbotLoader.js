import { useEffect } from 'react';

const ChatbotLoader = () => {
    useEffect(() => {
        // Prvo kreiramo prvi script koji sadrži konfiguraciju za Chatling
        const script1 = document.createElement('script');
        script1.innerHTML = `
            window.chtlConfig = { chatbotId: "3514628687" };
        `;
        document.body.appendChild(script1);

        // Zatim kreiramo drugi script koji učitava Chatling chatbot
        const script2 = document.createElement('script');
        script2.src = "https://chatling.ai/js/embed.js";
        script2.id = "chatling-embed-script";
        script2.async = true;
        document.body.appendChild(script2);

        // Čistimo kad se komponenta unmounta
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    return null;
};

export default ChatbotLoader;