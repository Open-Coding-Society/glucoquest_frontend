---
layout: post
title: Food log
permalink: /foodlog1/
comment: true
---

<!-- Fonts + Chart.js -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Roboto&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<h2 class="checklist-title">Food Log</h2>

<!-- Functional Wrapper -->
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
    <div class="checklist-buttons">
      <button class="graph-btn" onclick="toggleGraph()">📊 Toggle Graph</button>
    </div>
    <div class="checklist-items" id="food-items"></div>
  </div>

  <div id="graphSection" class="graph-section">
    <canvas id="impactChart"></canvas>
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
    margin-bottom: 1rem;
    color: #00ffc8;
  }

  .checklist-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .graph-btn {
    padding: 0.6rem 1.2rem;
    background-color: #222;
    border: 2px solid #00ffc8;
    color: #00ffc8;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .graph-btn:hover {
    background-color: #00ffc8;
    color: #000;
    transform: scale(1.05);
  }

  .checklist-item {
    background-color: #1a1a1a;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 12px rgba(0, 255, 200, 0.2);
  }

  .delete-btn {
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
  }

  .graph-section {
    display: none;
    margin-top: 2rem;
  }

  .graph-section canvas {
    width: 100% !important;
    height: 300px !important;
  }

  @media (max-width: 500px) {
    .checklist-input, .submit-btn, .graph-btn {
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

  let impactChart;

  function determineImpact(meal) {
    const lowered = meal.toLowerCase();
    if (["ice cream", "pizza", "soda", "cake"].some(w => lowered.includes(w))) return "High";
    if (["banana", "toast", "pasta", "rice", "cheese"].some(w => lowered.includes(w))) return "Medium";
    if (["salad", "chicken", "broccoli", "grilled"].some(w => lowered.includes(w))) return "Low";
    return "Medium";
  }

  document.getElementById("foodForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const meal = document.getElementById("meal").value.trim();
    const token = localStorage.getItem("jwt");
    if (!meal) return;

    const impact = determineImpact(meal);
    const postData = { meal, impact };

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
        const div = document.createElement("div");
        div.className = "checklist-item";
        div.innerHTML = `<span><strong>${log.meal}</strong> — Impact: ${log.impact}</span>
                         <button class="delete-btn" data-id="${log.id}">Delete</button>`;
        container.appendChild(div);
      });

      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = () => deleteFoodLog(btn.getAttribute("data-id"));
      });

      updateChart(logs);
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

function toggleGraph() {
  const section = document.getElementById("graphSection");
  const canvas = document.getElementById("impactChart");
  section.style.display = section.style.display === "none" || section.style.display === "" ? "block" : "none";

  if (section.style.display === "block") {
    // Resize canvas after it's visible
    setTimeout(() => {
      canvas.scrollIntoView({ behavior: "smooth" });
      impactChart?.resize();
    }, 200);
  }
}


  function updateChart(logs) {
    const ctx = document.getElementById("impactChart").getContext("2d");

    const countsByDate = {};
    logs.forEach(log => {
      const dateKey = new Date(log.created_at || log.timestamp || Date.now()).toLocaleDateString();
      countsByDate[dateKey] = (countsByDate[dateKey] || 0) + 1;
    });

    const labels = Object.keys(countsByDate).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(label => countsByDate[label]);

    if (impactChart) impactChart.destroy();

    impactChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Meals Logged Per Day',
          data,
          fill: false,
          borderColor: '#00ffc8',
          backgroundColor: '#00ffc8',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Food Logging Trend Over Time 📈'
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Date' }
          },
          y: {
            title: { display: true, text: 'Number of Meals' },
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", fetchFoodLogs);
</script>
