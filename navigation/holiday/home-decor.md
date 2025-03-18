---
layout: post
title: home-decor
permalink: /holiday/home-decor/
author: Soni Dhenuva, Vibha Mandayam, Kushi Gade, Nora Ahadian, Spencer Lyons
comments: true
---

<div class="container">
  <div class="category-box">
    <div class="category-row" onclick="toggleItems('holiday-items')">
      <h3>Review Home Decor Gift Here</h3>
      <div id="holiday-items" class="item-list-container" style="display: none;">
        <p>Please select the category that applies:</p>
        <div class="item-list">
          <button onclick="selectItem(this, 'Holiday')" data-channel-id="5">Teenage Girl (11-15)</button>
          <button onclick="selectItem(this, 'Holiday')" data-channel-id="6">Teenage Boy (11-15)</button>
          <button onclick="selectItem(this, 'Holiday')" data-channel-id="7">Toddler</button>
          <button onclick="selectItem(this, 'Holiday')" data-channel-id="8">Adult</button>
        </div>
      </div>
      <div id="holiday-posts" class="category-posts"></div>
    </div>
    <p></p>

  <!-- New Post Form -->
  `<div class="post-form-container" id="post-form" style="display: none;">
    <h2>Post Review</h2>
    <form id="postForm">
      <label for="title">Gift Title:</label>
      <input type="text" id="title" name="title" required>
      <p></p>
      <label for="comment">Comment:</label>
      <textarea id="comment" name="comment" required></textarea>
      <!-- Star Rating Input -->
      <label for="stars">Rate this gift (out of 5):</label>
      <div id="stars-container">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div>
      <input type="hidden" id="stars" name="stars" value="0" required>
      <!-- Dropdowns for Group and Channel Selection -->
      <div class="dropdown-container">
        <label for="group-select">Group:</label>
        <select id="group-select" name="group">
          <option value="Holiday">Holiday</option>
        </select>
        <label for="channel-select">Channel:</label>
        <select id="channel-select" name="channel">
          <option value="Teenage Girl (11-15)">Teenage Girl (11-15)</option>
          <option value="Teenage Boy (11-15)">Teenage Boy (11-15)</option>
          <option value="Toddler">Toddler</option>
          <option value="Adult">Adult</option>
        </select>
      </div>
      <button type="submit">Add Post</button>
    </form>
  </div>`
</div>

<script>
  // Toggle visibility of item lists
  function toggleItems(id) {
    const selectedItem = document.getElementById(id);
    const currentState = selectedItem.style.display;
    selectedItem.style.display = currentState === 'none' ? 'block' : 'none';
  }

  // Handle item selection
  function selectItem(button, group) {
    button.style.backgroundColor = 'green';
    button.style.color = 'white';

    // Show the post form
    const formContainer = document.getElementById('post-form');
    formContainer.style.display = 'block';

    // Pre-fill form data based on the selected category
    document.getElementById('title').value = "";
    document.getElementById('comment').value = "";
    document.getElementById('group-select').value = group;

    // Set the category for the dropdown
    const categoryName = button.textContent;
    document.getElementById('channel-select').value = categoryName;

    // Save the channel ID to the form
    const channelID = button.getAttribute('data-channel-id');
    document.getElementById('postForm').setAttribute('data-channel-id', channelID);
  }
  
    document.querySelectorAll('.star').forEach((star) => {
    star.addEventListener('click', function () {
      const value = this.getAttribute('data-value');
      document.getElementById('stars').value = value;

      // Highlight selected stars
      document.querySelectorAll('.star').forEach((s) => {
        s.classList.remove('selected');
        if (s.getAttribute('data-value') <= value) {
          s.classList.add('selected');
        }
      });
    });
  });
</script>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  // Fetch all arguments for a specific channel
  async function fetchArguments(channelId) {
    try {
      const response = await fetch(`${pythonURI}/api/posts/filter`, {
        ...fetchOptions,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel_id: channelId })
      });

      if (!response.ok) throw new Error('Failed to fetch arguments: ' + response.statusText);

      const argumentsData = await response.json();
      argumentContainer.innerHTML = ""; // Clear existing arguments

      argumentsData.forEach(arg => {
        const card = document.createElement("div");
        card.classList.add("argument-card");

        const text = document.createElement("p");
        text.innerHTML = `<strong>${arg.user_name}:</strong> ${arg.comment}`; // Adjusted to match backend response structure

        card.appendChild(text);
        argumentContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching arguments:', error);
    }
  }

  // Handle item selection
  function selectItem(button, type, category) {
    const color = type === 'most' ? 'green' : 'red';
    button.style.backgroundColor = color;
    button.style.color = 'white';

    // Create a post when an item is selected
    if (type === 'most') {
      document.getElementById('group-select').value = "Dnero Store";
      document.getElementById('channel-select').value = category;

      const postForm = document.getElementById('post-form');
      postForm.style.display = "block"; // Display post form
    }
  }

  // Handle form submission
  document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const comment = document.getElementById('comment').value;
    const group = document.getElementById('group-select').value;
    const channel = document.getElementById('channel-select').value;
    const channelID = document.getElementById('postForm').getAttribute('data-channel-id'); // Retrieve the saved channel ID
    const postData = {
      title: title,
      comment: comment,
      channel_id: channelID,
      stars: document.getElementById('stars').value, // Add the stars field
    };


    try {
      const response = await fetch(`${pythonURI}/api/post`, {
        ...fetchOptions,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) throw new Error('Failed to add post: ' + response.statusText);
      alert("Post added successfully!");

    } catch (error) {
      console.error('Error adding post:', error);
    }
  });
</script>


<style>
  body {
  background-color: #a8e6a3; /* Light green background */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #1a1a1a; /* Dark text for contrast */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
}

.category-box {
  width: 100%;
  max-width: 800px;
  background-color: #c8e6c9; /* Light green for the category box */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

.post-form-container {
  background-color: #b2dfdb; /* Light teal for the post form container */
  border: 2px solid #80cbc4; /* Complementary teal border */
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

  .category-box h3 {
    text-align: center;
    background-color: #007BFF;
    color: white;
    padding: 10px;
  }

  .item-list button {
    margin: 5px;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #007BFF;
    cursor: pointer;
  }

  .post-form-container {
    background-color: #020b40;
    border: 2px solid #007BFF;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }

  
</style>

<style>
  #stars-container {
    display: flex;
    gap: 5px;
    margin: 10px 0;
  }

  .star {
    font-size: 1.5em;
    cursor: pointer;
    color: #d3d3d3; /* Light gray for unselected stars */
    transition: color 0.3s;
  }

  .star.selected {
    color: #ffcc4d; /* Golden-yellow for selected stars */
  }

  .star:hover,
  .star:hover ~ .star {
    color: #ffcc4d; /* Highlight stars on hover */
  }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    // Fetch and display posts
    async function fetchPosts() {
        try {
            const response = await fetch(`${pythonURI}/api/posts`);
            const data = await response.json();

            // Clear existing posts
            const postContainer = document.getElementById("holiday-posts");
            postContainer.innerHTML = "";

            // Loop through posts and create cards
            data.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');

                // Default placeholder for username if not provided
                const userName = post.user_name || "Anonymous";

                postCard.innerHTML = `
                    <div class="post-header">
                        <p><strong>${userName}</strong></p>
                    </div>
                    <div class="post-body">
                      <p><strong>Gift Title:</strong> ${post.title || "No Title"}</p>
                      <p>${post.comment}</p>
                      <p><strong>Rating:</strong> ${'★'.repeat(post.stars || 0)}${'☆'.repeat(5 - (post.stars || 0))}</p>
                    </div>

                `;
                postContainer.appendChild(postCard);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    fetchPosts();
</script>

<style>
  body {
  background-color: #1a1a1a; /* Fallback dark background */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f9f9f9; /* Light text for better contrast */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
}

.category-box {
  width: 100%;
  max-width: 800px;
  background-color: #3b3b3b; /* Dark grey for contrast */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
}

.category-box h3 {
  text-align: center;
  background-color: #d62828; /* Holiday red */
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}

.item-list button {
  margin: 5px;
  padding: 10px;
  background-color: #ffcc4d; /* Golden-yellow */
  border: 1px solid #d62828; /* Holiday red border */
  color: #1a1a1a; /* Dark text for contrast */
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.item-list button:hover {
  background-color: #d62828; /* Highlight with holiday red */
  color: #ffffff;
}

.post-form-container {
  background-color: #2c2c2c; /* Deep gray for contrast */
  border: 2px solid #ffcc4d; /* Golden border for festive touch */
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.post-form-container h2 {
  color: #ffcc4d; /* Golden-yellow heading */
  text-align: center;
}

input, textarea, select, button {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ffcc4d; /* Golden border */
  border-radius: 5px;
  background-color: #f9f9f9; /* Light background */
  color: #1a1a1a; /* Dark text */
  font-size: 1em;
}

button[type="submit"] {
  background-color: #d62828; /* Holiday red */
  color: #ffffff;
  border: none;
  font-weight: bold;
  transition: all 0.3s;
}

button[type="submit"]:hover {
  background-color: #ffcc4d; /* Golden-yellow hover */
  color: #1a1a1a;
}

#holiday-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.post-card {
  background-color: #3b3b3b; /* Dark grey for contrast */
  border: 1px solid #ffcc4d; /* Golden border */
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.post-header {
  font-size: 1.2em;
  color: #ffcc4d; /* Golden-yellow for headers */
  margin-bottom: 10px;
}

.post-body {
  font-size: 1em;
  line-height: 1.5;
  color: #f9f9f9; /* Light text */
}

.post-body p {
  margin: 5px 0;
}
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Decor Gifts</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111;
            color: #000;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        header h1 {
            font-size: 2em;
            margin: 20px 0;
            background: rgba(0, 0, 0, 0.6);
            padding: 10px 20px;
            border-radius: 10px;
            color: #000;
        }
        .product-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px auto;
            padding: 20px;
            max-width: 800px;
        }
        .product {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
            color: #000;
        }
        .product h3 {
            font-size: 1em;
        }
        .product p {
            font-size: 0.9em;
            color: #333;
        }
        .product img {
            max-width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }
    </style>
    <div id="product-list" class="product-list">
        <div class="product" data-item="Table Lamp">
            <img src="{{site.baseurl}}/images/table lamp.jpeg" alt="Table Lamp">
            <h3>Table Lamp</h3>
            <p>A stylish table lamp to brighten up your space with warmth and elegance.</p>
        </div>
        <div class="product" data-item="Wall Art">
            <img src="{{site.baseurl}}/images/wall art.jpeg" alt="Wall Art">
            <h3>Wall Art</h3>
            <p>Beautiful wall art pieces to add character and charm to your home.</p>
        </div>
        <div class="product" data-item="Candle Set">
            <img src="{{site.baseurl}}/images/scented candles.jpeg" alt="Candle Set">
            <h3>Candle Set</h3>
            <p>Aromatic candle set perfect for creating a cozy and relaxing ambiance.</p>
        </div>
    </div>

