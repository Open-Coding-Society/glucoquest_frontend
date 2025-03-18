---
layout: post
title:  
search_exclude: true
hide: true
toc: false
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup Login Alert</title>
  <style>
    /* Global Background */
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-image: url('{{ site.baseurl }}/images/greenbackground.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    /* Popup styles */
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      display: none; /* Initially hidden */
    }
    .popup-container {
      background: white;
      padding: 20px;
      width: 320px;
      text-align: center;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 20px;
      font-weight: bold;
      color: black;
      cursor: pointer;
    }
    .close-btn:hover {
      color: red;
    }
    .popup-container h2 {
      margin-bottom: 10px;
      font-size: 18px;
      color: black;
    }
    .popup-button {
      background: #008080;
      color: white;
      border: none;
      padding: 10px 15px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      margin-top: 10px;
    }
    .popup-button:hover {
      background: #005f5f;
    }
    /* Sidebar styles */
    .sidebar {
      width: 260px;
      height: 75vh;
      background: linear-gradient(135deg, rgb(134, 8, 8), rgb(48, 10, 10));
      padding: 15px;
      position: fixed;
      left: 10px;
      top: 12vh;
      color: white;
      font-family: 'Poppins', sans-serif;
      border-radius: 12px;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 3px dotted white;
    }
    .sidebar h3 {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: center;
    }
    .sidebar h3::after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.5);
      margin: 10px auto;
      border-radius: 2px;
    }
    .sidebar a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white !important;
      text-decoration: none;
      padding: 12px 18px;
      margin: 8px 0;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      width: 100%;
    }
    .sidebar a:hover {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
    }
    .sidebar a::before {
      content: "";
      margin-right: 10px;
      transition: transform 0.3s ease;
    }
    .sidebar a:hover::before {
      transform: translateX(5px);
    }
    .holiday-header {
      width: 100%;
      text-align: center;
      padding: 20px 0;
    }
    .holiday-header h1 {
      font-size: 2.5em;
      margin: 20px 0;
      background: rgba(0, 0, 0, 0.6);
      padding: 10px 20px;
      border-radius: 10px;
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 90%;
      max-width: 3000px;
      padding-left: 85px; /* Slightly shifts it to the right */
    }
    .category-box {
      background: rgba(0, 0, 0, 0.6);
      border: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      text-align: center;
      padding: 20px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      z-index: 2;
    }
    .category-box h2 {
      margin-bottom: 15px;
      font-size: 1.5em;
    }
    .category-box button {
      background: #ffffff;
      color: #008080;
      border: none;
      padding: 10px 15px;
      font-size: 1em;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .category-box button:hover {
      background: #008080;
      color: #ffffff;
    }
    .category-box:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 768px) {
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .holiday-header h1 {
        font-size: 2em;
      }
    }
    @media (max-width: 480px) {
      .categories-grid {
        grid-template-columns: 1fr;
      }
      .category-box h2 {
        font-size: 1.2em;
      }
    }
    /* Snowflake styling */
    .snowflake {
        position: fixed; /* Changed from absolute to fixed */
        top: 0; /* Ensure snowflakes start from the top */
        color: white;
        font-size: 1em;
        user-select: none;
        pointer-events: none;
        z-index: 0;
        animation: fall linear infinite;
    }
    @keyframes fall {
      0% { transform: translateY(-10px); }
      100% { transform: translateY(100vh); }
    }
    .snowflake:nth-child(odd) {
      animation-duration: 12s;
    }
    .snowflake:nth-child(even) {
      animation-duration: 18s;
    }
    .snowflake:nth-child(1) {
      font-size: 1.5em;
      animation-duration: 14s;
    }
    .snowflake:nth-child(2) {
      font-size: 1.3em;
      animation-duration: 12s;
    }
    .snowflake:nth-child(3) {
      font-size: 1.7em;
      animation-duration: 14s;
    }
    /* Top Searchbar Styles */
    .top-search {
      margin: 0 auto 20px;
      width: 100%;
      max-width: 800px;
      text-align: center;
    }
    .top-search input {
      width: 100%;
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 25px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .top-search input:focus {
      border-color: green;
      box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
    }
    .top-search #results {
      margin-top: 10px;
      max-height: 200px;
      overflow-y: auto;
    }
    .top-search .result {
      margin: 5px 0;
      padding: 8px 12px;
      background: transparent; /* initial background is transparent */
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    .top-search .result:hover {
      background: rgba(255, 255, 255, 0.2); /* light background on hover */
    }
    .top-search .result:active {
      background: rgba(255, 255, 255, 0.3); /* slightly lighter when clicked */
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
  <!-- Popup Alert -->
  <div class="popup-overlay" id="popup">
    <div class="popup-container">
      <span class="close-btn">✖</span>
      <h2>Please Login/Sign-up to access all website features</h2>
      <a href="login.html" class="popup-button">Go to Login Page</a>
    </div>
  </div>
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

  <!-- Holiday Page Content -->
  <div class="holiday-page">
    <header class="holiday-header">
      <!-- Top Searchbar integrated into the header -->
      <h1> 🎉 Holiday Shopping 🎉</h1>
      <div class="top-search">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="🔍 Search for an item or tag..." 
          oninput="searchItems()"
        />
        <div id="results"></div>
      </div>
    </header>
    <div class="categories-grid">
      <div class="category-box" id="home-decor">
        <h2>Home Decor</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/home-decor/'">Explore Home Decor</button>
      </div>
      <div class="category-box" id="food">
        <h2>Food</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/food/'">Explore Food</button>
      </div>
      <div class="category-box" id="clothes">
        <h2>Clothes</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/clothes/'">Explore Clothes</button>
      </div>
      <div class="category-box" id="scented">
        <h2>Scented Gifts</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/scented/'">Explore Scented Gifts</button>
      </div>
      <div class="category-box" id="electronics">
        <h2>Electronics</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/electronics/'">Explore Electronics</button>
      </div>
      <div class="category-box" id="toys">
        <h2>Toys</h2>
        <button onclick="location.href='{{ site.baseurl }}/holiday/toys/'">Explore Toys</button>
      </div>
    </div>
  </div>

  <script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    // Popup and Snowflakes Code
    document.addEventListener("DOMContentLoaded", function() {
      // Popup Login Alert Logic
      const isAuthenticated = localStorage.getItem('authenticated') === 'true';
      if (!isAuthenticated) {
        document.getElementById("popup").style.display = "flex";
      }
      function closePopup() {
        document.getElementById("popup").style.display = "none";
      }
      document.querySelector(".close-btn").addEventListener("click", closePopup);
      document.getElementById("popup").addEventListener("click", function(event) {
        if (event.target === this) {
          closePopup();
        }
      });
      // Snowflakes Creation
      const numberOfSnowflakes = 100;
      for (let i = 0; i < 100; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.innerHTML = "❆";
        document.querySelector(".holiday-page").appendChild(snowflake);
      }
    });

    // Searchbar Functions
    async function searchItems() {
      const input = document.getElementById('searchInput').value.trim().toLowerCase();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Clear previous results

      if (input) {
        try {
          const response = await fetch(`${pythonURI}/api/search?q=${encodeURIComponent(input)}`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const items = await response.json();
          if (items.length > 0) {
            items.forEach(item => {
              const resultDiv = document.createElement('div');
              resultDiv.className = 'result';
              resultDiv.textContent = item.name;
              resultDiv.onclick = async () => {
                await incrementTags(item.name);
                window.location.href = item.link;
              };
              resultsDiv.appendChild(resultDiv);
            });
          } else {
            resultsDiv.textContent = 'No results found.';
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          resultsDiv.textContent = 'An error occurred while searching. Please try again.';
        }
      }
    }
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

    async function incrementTags(itemName) {
      try {
        const response = await fetch(`${pythonURI}/api/search/increment_tag`, {
          ...fetchOptions,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: itemName })
        });

        if (!response.ok) {
          throw new Error(`HTTP status code: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error updating tags:', error);
      }
    }

    window.searchItems = searchItems;

    document.addEventListener('DOMContentLoaded', () => {
      console.log('Search bar initialized');
    });
  </script>
</body>
</html>