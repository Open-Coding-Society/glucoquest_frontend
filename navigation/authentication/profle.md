---
layout: post
title: User Profile
permalink: /profile/
menu: nav/home.html
author: Spencer Lyons
comments: true
---

<style>
.snowflake {
    position: absolute;
    font-size: 20px; /* Initial size */
    opacity: 1;
    pointer-events: none; /* Prevent interaction */
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
</style>

<link rel="stylesheet" href="/holiday_frontend/assets/css/profile_style.css">

<!-- Profile Content -->
<div class="profile-page">
  <!-- Delete Profile Button -->
  <div class="delete-container">
    <button id="delete-btn" class="delete-button" title="Delete Profile"><span class="trash-icon">&#x1F5D1;</span></button>
  </div>

  <!-- Profile Info Container -->
  <div class="profile-info">
    <div class="profile-picture">
      <img id="link" src="{{ site.baseurl }}/images/profile.jpg" width="100" height="100" alt="Profile Picture" />
    </div>
    <div class="name" id="username">default_user</div>
    <div class="theme" id="theme-preference">Preferred Theme: Dark</div>
  </div>

  <!-- Theme Buttons Container -->
  <div class="theme-buttons">
    <button id="light-mode-btn" title="Light Mode"><span class="symbol">&#x2600;</span></button> <!-- Sun symbol for Light Mode -->
    <button id="dark-mode-btn" title="Dark Mode"><span class="symbol">&#x263D;</span></button> <!-- Moon symbol for Dark Mode -->
  </div>
</div>
<script type="module">
  import { getCredentials } from '{{ site.baseurl }}/assets/js/api/login.js';
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
  function applyThemeColors(theme) {
    if (theme.toLowerCase() === 'light') {
      document.body.style.setProperty('background-color', 'white', 'important');
      document.body.style.setProperty('color', 'black', 'important');
      const header = document.querySelector('.holiday-header');
      if (header) {
        header.style.setProperty('color', 'black', 'important');
      }
    } else {
      document.body.style.setProperty('background-color', 'black', 'important');
      document.body.style.setProperty('color', 'white', 'important');
      const header = document.querySelector('.holiday-header');
      if (header) {
        header.style.setProperty('color', 'white', 'important');
      }
    }
  }
  async function loadProfile() {
    try {
      const credentials = await getCredentials();
      console.log("Retrieved Credentials:", credentials);
      if (!credentials || !credentials.name) {
        console.log("No credentials found, redirecting to login.");
        window.location.href = '{{ site.baseurl }}/login.html';
        return;
      }
      const profilePic = document.getElementById('link');
      const usernameElement = document.getElementById('username');
      const themeElement = document.getElementById('theme-preference');
      if (!profilePic || !usernameElement || !themeElement) {
        console.error("Profile elements not found in DOM.");
        return;
      }
      usernameElement.textContent = credentials.name || 'Unknown User';
      const theme = credentials.theme || 'Dark';
      themeElement.textContent = `Preferred Theme: ${theme}`;
      applyThemeColors(theme);
      if (credentials.pfp) {
        if (credentials.pfp.startsWith("data:image")) {
          profilePic.src = credentials.pfp;
        } else if (credentials.pfp.startsWith("/") || credentials.pfp.includes("http")) {
          profilePic.src = credentials.pfp;
        } else {
          profilePic.src = `/user-images/${credentials.pfp}`;
        }
      } else {
        profilePic.src = '{{ site.baseurl }}/images/profile.jpg';
      }
      profilePic.onerror = function () {
        this.src = '{{ site.baseurl }}/images/profile.jpg';
      };
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }
  async function updateTheme(theme) {
    const themeElement = document.getElementById('theme-preference');
    themeElement.textContent = `Preferred Theme: ${theme}`;
    applyThemeColors(theme);
    try {
      const response = await fetch(`${pythonURI}/api/user_profile/update`, {
        ...fetchOptions,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, theme: theme })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error updating theme: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }
  async function deleteProfile() {
    const confirmation = confirm('Are you sure you want to delete this profile?');
    if (!confirmation) return;
    try {
      const response = await fetch(`${pythonURI}/api/user_profile/delete`, {
        ...fetchOptions,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1 })
      });
      if (response.ok) {
        alert('Profile deleted successfully!');
        document.getElementById('link').src = '{{ site.baseurl }}/images/profile.jpg';
        document.getElementById('username').textContent = 'Unknown User';
        document.getElementById('theme-preference').textContent = 'Preferred Theme: Light';
        applyThemeColors('Light');
        localStorage.removeItem("user_id");
      } else {
        const errorData = await response.json();
        alert(`Error deleting profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    document.getElementById('delete-btn').addEventListener('click', deleteProfile);
    document.getElementById('light-mode-btn').addEventListener('click', function() {
      updateTheme('Light');
    });
    document.getElementById('dark-mode-btn').addEventListener('click', function() {
      updateTheme('Dark');
    });
  });
  window.addEventListener('load', function () {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
    }
  });
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.textContent = "❄️";
    snowflake.classList.add("snowflake");
    // Random position on the screen
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(snowflake);
    let size = 20;
    let growing = true;
    let fadeOut = false;
    function animateSnowflake() {
        if (growing) {
            size += 0.5;
            if (size >= 30) growing = false;
        } else {
            size -= 0.5;
            if (size <= 20) fadeOut = true;
        }
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.opacity = fadeOut ? (parseFloat(snowflake.style.opacity) - 0.02) : "1";
        if (parseFloat(snowflake.style.opacity) <= 0) {
            snowflake.remove();
        } else {
            requestAnimationFrame(animateSnowflake);
        }
    }
    animateSnowflake();
}
// Function to maintain a continuous snowfall effect
function maintainSnowfall() {
    let snowflakeCount = document.querySelectorAll(".snowflake").length;
    let neededSnowflakes = Math.max(5 - snowflakeCount, 1); // Ensure at least 5 are active
    for (let i = 0; i < neededSnowflakes; i++) {
        createSnowflake();
    }
    let randomDelay = Math.random() * 1000 + 500; // Random delay between 0.5s - 1.5s
    setTimeout(maintainSnowfall, randomDelay);
}
// Start continuous snowfall
maintainSnowfall();

</script>
