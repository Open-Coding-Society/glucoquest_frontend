---
layout: post
title: Food log
permalink: /foodlog/
comment: true
---

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Roboto&display=swap" rel="stylesheet">

<h2 class="checklist-title">Food Log</h2>

<div class="foodlog-wrapper">
  <div class="checklist-section">
    <form id="foodForm" class="checklist-form">
      <label for="meal" class="checklist-label">Meal:</label>
      <input type="text" id="meal" name="meal" required class="checklist-input">
      <button class="submit-btn checklist-btn">Add Meal</button>
    </form>
  </div>

  <div class="checklist-container">
    <p id="count" class="checklist-count"></p>
    <div class="checklist-items" id="food-items"></div>
  </div>
</div>

<style>
  body {
    background-color: #0f0f0f;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .checklist-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #00ffc8;
    font-family: 'Inter', sans-serif;
    text-shadow: 0 0 8px #00ffc8, 0 0 16px #00ffc8;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .foodlog-wrapper {
    width: 150%;
    max-width: 1000px;
    background: linear-gradient(145deg, #0c0c0c, #1c1c1c);
    box-shadow: 0 0 30px #00ffc8;
    border-radius: 20px;
    padding: 2rem;
    margin: 0 auto;
  }

  .checklist-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .checklist-label {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .checklist-input {
    padding: 0.7rem;
    border: none;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    background-color: #1a1a1a;
    color: #00ffcc;
    font-size: 1rem;
    box-shadow: 0 0 10px #00ffc8 inset;
    margin-bottom: 1rem;
    text-align: center;
  }

  .submit-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #00ffc8;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
    max-width: 200px;
  }

  .submit-btn:hover {
    background-color: #00d6a3;
    transform: scale(1.05);
  }



  .checklist-count {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #00ffc8;
  }

  .checklist-item {
    background-color: #1a1a1a;
    padding: 1rem 1.5rem;
    margin: 0.5rem 0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 12px rgba(0, 255, 200, 0.15);
    font-size: 1.1rem;
    font-family: 'Inter', sans-serif;
  }

  .checklist-item span {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .meal-name {
    font-weight: 600;
    color: #ffffff;
  }

  .impact-pill {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    font-size: 0.85rem;
    border-radius: 999px;
    font-weight: 600;
    width: fit-content;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .impact-low {
    background-color: #00ff88;
    color: #000;
  }

  .impact-medium {
    background-color: #ffcc00;
    color: #000;
  }

  .impact-high {
    background-color: #ff4d4d;
    color: #fff;
  }

  .delete-btn {
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    .checklist-input, .submit-btn {
      width: 100%;
    }

    .checklist-item {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  document.getElementById("foodForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const meal = document.getElementById("meal").value.trim();
    const formattedMeal = meal.charAt(0).toUpperCase() + meal.slice(1);
    const token = localStorage.getItem("jwt");
    if (!formattedMeal) return;

    const impact = determineImpact(formattedMeal);
    const postData = { meal: formattedMeal, impact };

    try {
      await fetch(`${pythonURI}/api/foodlog`, {
        ...fetchOptions,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
      });

      document.getElementById("foodForm").reset();
      fetchFoodLogs();
    } catch (error) {
      console.error("Error logging meal:", error);
    }
  });

  function determineImpact(meal) {
    const lowered = meal.toLowerCase();
    if (["ice cream", "pizza", "soda", "cake"].some(w => lowered.includes(w))) return "High";
    if (["banana", "toast", "pasta", "rice", "cheese"].some(w => lowered.includes(w))) return "Medium";
    if (["salad", "chicken", "broccoli", "grilled"].some(w => lowered.includes(w))) return "Low";
    return "Medium";
  }

  async function fetchFoodLogs() {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`${pythonURI}/api/foodlog`, {
        ...fetchOptions,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      const logs = await response.json();
      document.getElementById("count").innerHTML = `<h4>Total Meals: ${logs.length}</h4>`;

      const container = document.getElementById("food-items");
      container.innerHTML = "";

      logs.forEach(log => {
        const impactClass = `impact-${log.impact.toLowerCase()}`;
        const icon = log.impact === "High" ? "🔴" : log.impact === "Medium" ? "🟡" : "🟢";
        const div = document.createElement("div");
        div.className = "checklist-item";
        div.innerHTML = `
          <span>
            <span class="meal-name">${log.meal}</span>
            <span class="impact-pill ${impactClass}">${icon} IMPACT: ${log.impact}</span>
          </span>
          <button class="delete-btn" data-id="${log.id}">Delete</button>
        `;
        container.appendChild(div);
      });

      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = () => deleteFoodLog(btn.getAttribute("data-id"));
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function deleteFoodLog(id) {
    const token = localStorage.getItem("jwt");
    await fetch(`${pythonURI}/api/foodlog`, {
      ...fetchOptions,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ id })
    });

    fetchFoodLogs();
  }

  document.addEventListener("DOMContentLoaded", fetchFoodLogs);
</script>
