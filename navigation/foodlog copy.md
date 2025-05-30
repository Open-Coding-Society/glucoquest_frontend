---
layout: post
title: Food log
permalink: /foodlog1/
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

  <div class="chart-container">
    <canvas id="impactChart"></canvas>
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .checklist-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
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

  /* Chart Styles */
  .chart-container {
    width: 100%;
    height: 400px;
    background: rgba(10, 10, 20, 0.7);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 0 20px rgba(0, 150, 255, 0.3);
    border: 1px solid rgba(0, 200, 255, 0.2);
    position: relative;
    overflow: hidden;
  }

  .chart-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 255, 200, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 150, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
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
    
    .chart-container {
      height: 300px;
      padding: 1rem;
    }
    
    .foodlog-wrapper {
      width: 100%;
      padding: 1rem;
    }
  }
</style>

<!-- Chart.js and date-fns for date handling -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/date-fns@2.28.0/dist/date-fns.min.js"></script>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  let impactChart = null;

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
    if (["ice cream", "pizza", "soda", "cake", "burger", "fries", "candy"].some(w => lowered.includes(w))) return "High";
    if (["banana", "toast", "pasta", "rice", "cheese", "bread", "eggs"].some(w => lowered.includes(w))) return "Medium";
    if (["salad", "chicken", "broccoli", "grilled", "fish", "vegetables"].some(w => lowered.includes(w))) return "Low";
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
            <small>${new Date(log.timestamp).toLocaleString()}</small>
          </span>
          <button class="delete-btn" data-id="${log.id}">Delete</button>
        `;
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

  function updateChart(logs) {
    // Group logs by date and calculate daily impact scores
    const dailyData = {};
    
    logs.forEach(log => {
      const date = dateFns.format(new Date(log.timestamp), 'yyyy-MM-dd');
      if (!dailyData[date]) {
        dailyData[date] = { low: 0, medium: 0, high: 0, date: date };
      }
      
      if (log.impact === "Low") dailyData[date].low++;
      else if (log.impact === "Medium") dailyData[date].medium++;
      else dailyData[date].high++;
    });
    
    // Sort dates chronologically
    const sortedDates = Object.values(dailyData).sort((a, b) => 
      new Date(a.date) - new Date(b.date));
    
    // Prepare data for Chart.js
    const dates = sortedDates.map(item => dateFns.format(new Date(item.date), 'MMM dd'));
    const lowData = sortedDates.map(item => item.low);
    const mediumData = sortedDates.map(item => item.medium);
    const highData = sortedDates.map(item => item.high);
    
    // Create or update chart
    const ctx = document.getElementById('impactChart').getContext('2d');
    
    if (impactChart) {
      impactChart.data.labels = dates;
      impactChart.data.datasets[0].data = lowData;
      impactChart.data.datasets[1].data = mediumData;
      impactChart.data.datasets[2].data = highData;
      impactChart.update();
    } else {
      impactChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Low Impact',
              data: lowData,
              borderColor: '#00ffc8',
              backgroundColor: 'rgba(0, 255, 200, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#00ffc8',
              pointBorderColor: '#000',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointStyle: 'circle'
            },
            {
              label: 'Medium Impact',
              data: mediumData,
              borderColor: '#0095ff',
              backgroundColor: 'rgba(0, 149, 255, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#0095ff',
              pointBorderColor: '#000',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointStyle: 'rect'
            },
            {
              label: 'High Impact',
              data: highData,
              borderColor: '#ff00aa',
              backgroundColor: 'rgba(255, 0, 170, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#ff00aa',
              pointBorderColor: '#000',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointStyle: 'triangle'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff',
                font: {
                  size: 14,
                  family: 'Inter'
                },
                padding: 20,
                usePointStyle: true,
                boxWidth: 10
              }
            },
            title: {
              display: true,
              text: 'Daily Food Impact Trend',
              color: '#00ffc8',
              font: {
                size: 18,
                family: 'Inter',
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 20
              }
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#00ffc8',
              bodyColor: '#ffffff',
              borderColor: '#00ffc8',
              borderWidth: 1,
              padding: 12,
              usePointStyle: true,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw} meals`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
              },
              ticks: {
                color: '#ffffff',
                font: {
                  family: 'Roboto'
                }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
              },
              ticks: {
                color: '#ffffff',
                font: {
                  family: 'Roboto'
                },
                stepSize: 1,
                callback: function(value) {
                  return value % 1 === 0 ? value : null;
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          elements: {
            line: {
              cubicInterpolationMode: 'monotone'
            }
          }
        }
      });
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

