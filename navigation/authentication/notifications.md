---
layout: post
title: Notifications
permalink: /notifications
menu: nav/home.html
search_exclude: true
show_reading_time: false
author: nora + kushi
---
<style>
    body {
        background-image: url('images/redbg.webp');
        background-position: center;
        max-height: 250vh;
        background-size: 1700px auto; /* Adjust width */
        }
    .notifications-container {
        width: 70%;
        margin: auto;
        text-align: center;
        padding: 20px;
        background: #8B0000;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .notifications-container button {
        background: white;
        color: black;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
    }
    .notifications-container button:hover {
        background: #CD5C5C;
    }
</style>

<div class="notifications-container">
    <h1 class="page-title" style="color: black;">Send Notification</h1>
    <form id="notificationForm">
        <label for="content" style="color: black;">Notification Content:</label>
        <textarea id="content" required placeholder="Enter notification content..."></textarea>
        <label for="recipient_id" style="color: black;">Recipient:</label>
        <select id="recipient_id" required>
            <option value="" disabled selected>Select a user</option>
        </select>
        <button type="submit">Send Notification</button>
    </form>
    <h2 style="color: black;">Your Notifications</h2>
    <div id="notificationsList"></div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  document.addEventListener('DOMContentLoaded', function() {
      populateUserDropdown();
      fetchNotifications();
  });

  async function populateUserDropdown() {
      try {
          const response = await fetch(`${pythonURI}/api/users/id-name`, fetchOptions);
          if (!response.ok) {
              throw new Error('Failed to fetch users');
          }
          const users = await response.json();
          const recipientSelect = document.getElementById("recipient_id");
          recipientSelect.innerHTML = '<option value="" disabled selected>Select a user</option>';
          users.forEach(user => {
              const option = document.createElement("option");
              option.value = user.id;
              option.textContent = user.name;
              recipientSelect.appendChild(option);
          });
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  }

  document.getElementById("notificationForm").addEventListener("submit", async function(event) {
      event.preventDefault();
      
      const content = document.getElementById("content").value;
      const recipient_id = document.getElementById("recipient_id").value;
      
      if (!content || !recipient_id) {
          alert("Please fill in all fields.");
          return;
      }
      
      const notificationData = {
          content: content,
          recipient_id: recipient_id
      };
      
      try {
          const response = await fetch(`${pythonURI}/api/notification`, {
              ...fetchOptions,
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(notificationData),
          });
          if (!response.ok) {
              throw new Error('Failed to send notification');
          }
          alert('Notification sent!');
          document.getElementById("notificationForm").reset();
          fetchNotifications();
      } catch (error) {
          console.error("Error sending notification:", error);
      }
  });

  async function fetchNotifications() {
      try {
          const response = await fetch(`${pythonURI}/api/notifications`, fetchOptions);
          if (!response.ok) {
              throw new Error('Failed to fetch notifications');
          }
          const notifications = await response.json();
          const notificationsList = document.getElementById("notificationsList");
          notificationsList.innerHTML = notifications.map(n => `<p><strong>${n.sender}:</strong> ${n.content}</p>`).join('');
      } catch (error) {
          console.error("Error fetching notifications:", error);
      }
  }
  function startBouncingEmoji() {
    const emoji = document.createElement("div");
    emoji.textContent = "🎄";
    emoji.style.position = "absolute";
    emoji.style.fontSize = "40px"; // Adjust size
    emoji.style.top = "50px";
    emoji.style.left = "50px";
    document.body.appendChild(emoji);

    let x = 100, y = 100;
    let dx = 3, dy = 3; // Speed in each direction
    const speed = 4; // Adjust speed
    const screenWidth = () => window.innerWidth - 30; // Keep within screen
    const screenHeight = () => window.innerHeight - 60;

    function moveEmoji() {
        x += dx;
        y += dy;

        if (x <= 0 || x >= screenWidth()) dx *= -1;
        if (y <= 0 || y >= screenHeight()) dy *= -1;

        emoji.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(moveEmoji);
    }

    moveEmoji();
}

// Call this function to start the bouncing animation
startBouncingEmoji();
</script>
