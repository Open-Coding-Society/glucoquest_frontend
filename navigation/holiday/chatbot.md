---
layout: post
title: ChatBot
permalink: /holiday/chatbot/
author: SoniDhenuva
comments: true
---

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                position: relative;
                height: 100vh;
                background-color: #f9f9f9;
            }
            #help-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 10px 20px;
                background-color: #B22222 !important;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }
            #help-button:hover {
                background-color: #63b6e3;
            }
            #chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                max-height: 500px;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            #chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: #333;
                color: white;
                border-bottom: 1px solid #ddd;
            }
            #chat-header h4 {
                margin: 0;
                font-size: 16px;
            }
            #close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
            }
            #close-chat:hover {
                color: #ff6666;
            }
            #chat-box {
                flex-grow: 1;
                padding: 10px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            .message {
                margin: 10px;
                padding: 10px;
                border-radius: 10px;
                max-width: 75%;
                word-wrap: break-word;
                display: inline-block;
            }
            .assistant {
                background-color: #333;
                color: white;
                align-self: flex-start;
                text-align: left;
            }
            .user {
                background-color: #2f4f4f;
                color: white;
                align-self: flex-end;
                text-align: right;
            }
            #input-container {
                display: flex;
                padding: 10px;
                border-top: 1px solid #ddd;
            }
            input[type="text"] {
                flex-grow: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
            }
            button {
                margin-left: 5px;
                padding: 10px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            }
            button:hover {
                background-color: #555;
            }
        </style>
    </head>
    <body>
        <button id="help-button">Need Help?</button>
        <div id="chat-container">
            <div id="chat-header">
                <h4>Giftinator 3000</h4>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-box"></div>
            <div id="input-container">
                <input type="text" id="user-input" placeholder="Type your message..." />
                <button id="send-message-button">Send</button>
            </div>
        </div>
        <script type="module" src="/holiday_frontend/chatbot.js">
            import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
            const chatBox = document.getElementById('chat-box');
            const userInput = document.getElementById('user-input');
            const chatContainer = document.getElementById('chat-container');
            const sendMessageButton = document.getElementById('send-message-button');
            // Adding event listeners for the help button, close chat button, and send message button
            document.getElementById('help-button').addEventListener('click', toggleChat);
            document.getElementById('close-chat').addEventListener('click', toggleChat);
            sendMessageButton.addEventListener('click', sendMessage); // Event listener for send message button
            function toggleChat() {
                chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
            }
            async function sendMessage() {
                const message = userInput.value;
                if (!message) return;
                appendMessage('user', message);
                userInput.value = '';
                try {
                    const response = await fetch(`${pythonURI}/chat`, {
                        ...fetchOptions,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_input: message }),
                        credentials: 'include' // Ensures cookies/auth headers work
                    });
                    const data = await response.json();
                    if (response.ok) {
                        appendMessage('assistant', data.response);
                    } else {
                        appendMessage('assistant', `Error: ${data.error}`);
                    }
                } catch (error) {
                    appendMessage('assistant', `Error: ${error.message}`);
                }
            }
            function appendMessage(sender, message) {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${sender}`;
                messageElement.innerText = message;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        </script>
    </body>
</html>
