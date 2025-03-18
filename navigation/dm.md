---
layout: post
title: Chat
permalink: /dm/
author: giftinator
comments: true
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .chat-container {
            width: 300px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .messages {
            height: 200px;
            overflow-y: auto;
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
            padding: 5px;
        }
        .message {
            padding: 5px;
            border-radius: 5px;
            margin-bottom: 5px;
        }
        .sent {
            background-color: #007bff;
            color: white;
            text-align: right;
        }
        .received {
            background-color: #e0e0e0;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <h2>Chat</h2>
        <div class="messages" id="messages"></div>
        <input type="text" id="messageInput" placeholder="Type a message...">
        <button onclick="sendMessage()">Send</button>
    </div>
    <script>
        const socket = io('http://localhost:5000');
        const user = 'User1';
        const recipient = 'User2';
        function appendMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', type);
            messageElement.textContent = message;
            document.getElementById('messages').appendChild(messageElement);
        }
        socket.on('receiveMessage', (data) => {
            if (data.sender === recipient || data.receiver === recipient) {
                appendMessage(data.message, 'received');
            }
        });
        function sendMessage() {
            const message = document.getElementById('messageInput').value;
            if (message.trim()) {
                socket.emit('sendMessage', { sender: user, receiver: recipient, message });
                appendMessage(message, 'sent');
                document.getElementById('messageInput').value = '';
            }
        }
    </script>
</body>
</html>
