---
layout: post
title: Food Log
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
      <input type="text" id="meal" name="meal" required class="checklist-input" placeholder="What did you eat?">
      <button class="submit-btn checklist-btn">Add Meal</button>
    </form>
  </div>

  <div class="chart-container">
    <canvas id="impactChart"></canvas>
  </div>

  <div class="checklist-container">
    <p id="count" class="checklist-count">Total Meals: 0</p>
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
    min-height: 100vh;
  }

  .checklist-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #00ffc8;
    font-family: 'Inter', sans-serif;
    text-shadow: 0 0 8px #00ffc8, 0 0 16px #00ffc8;
    width: 100%;
  }

  .foodlog-wrapper {
    width: 150%;
    max-width: 800px;
    background: linear-gradient(145deg, #0c0c0c, #1c1c1c);
    box-shadow: 0 0 30px rgba(0, 255, 200, 0.3);
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
    color: #00ffc8;
  }

  .checklist-input {
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    background-color: #1a1a1a;
    color: #ffffff;
    font-size: 1rem;
    border: 1px solid #00ffc8;
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
    transition: all 0.2s ease;
    width: 100%;
    max-width: 200px;
  }

  .submit-btn:hover {
    background-color: #00d6a3;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 200, 0.5);
  }

  .checklist-count {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #00ffc8;
    font-family: 'Inter', sans-serif;
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
    border-left: 4px solid #00ffc8;
  }

  .checklist-item span {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .meal-name {
    font-weight: 600;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
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
    margin-top: 0.3rem;
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
    background-color: transparent;
    border: 1px solid #ff4d4d;
    color: #ff4d4d;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: bold;
  }

  .delete-btn:hover {
    background-color: #ff4d4d;
    color: white;
    transform: scale(1.05);
  }

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

  @media (max-width: 768px) {
    body {
      padding: 1rem;
    }
    
    .foodlog-wrapper {
      padding: 1.5rem;
    }
    
    .checklist-title {
      font-size: 2rem;
    }
    
    .chart-container {
      height: 300px;
      padding: 1rem;
    }
    
    .checklist-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .delete-btn {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
</style>

<!-- Chart.js for the graph -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  // Food log data - will be replaced with your API data
  let foodLogs = [
    {
      id: 1,
      meal: "Salad",
      impact: "Low",
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
    },
    {
      id: 2,
      meal: "Chicken Sandwich",
      impact: "Medium",
      timestamp: new Date(Date.now() - 1 * 86400000).toISOString() // yesterday
    },
    {
      id: 3,
      meal: "Ice Cream",
      impact: "High",
      timestamp: new Date().toISOString() // today
    }
  ];

  let impactChart = null;

  // Initialize the application
  document.addEventListener("DOMContentLoaded", function() {
    initializeChart();
    renderFoodLogs();
    
    // Form submission handler
    document.getElementById("foodForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const mealInput = document.getElementById("meal");
      const mealName = mealInput.value.trim();
      
      if (mealName) {
        addFoodLog(mealName);
        mealInput.value = "";
        mealInput.focus();
      }
    });
  });

  function addFoodLog(mealName) {
    const newFoodLog = {
      id: Date.now(),
      meal: mealName.charAt(0).toUpperCase() + mealName.slice(1),
      impact: determineImpact(mealName),
      timestamp: new Date().toISOString()
    };
    
    foodLogs.push(newFoodLog);
    renderFoodLogs();
  }

  function determineImpact(meal) {
    const lowered = meal.toLowerCase();
    
    // High impact foods
    const highImpactFoods = ["ice cream", "pizza", "soda", "cake", "burger", "fries", "candy", "chocolate", "donut"];
    if (highImpactFoods.some(food => lowered.includes(food))) return "High";
    
    // Medium impact foods
    const mediumImpactFoods = ["toast", "pasta", "rice", "cheese", "bread", "eggs", "potato", "yogurt", "granola"];
    if (mediumImpactFoods.some(food => lowered.includes(food))) return "Medium";
    
    // Low impact foods
    const lowImpactFoods = ["salad", "chicken", "broccoli", "grilled", "fish", "vegetables", "fruit", "soup", "quinoa"];
    if (lowImpactFoods.some(food => lowered.includes(food))) return "Low";
    
    // Default to medium if not recognized
    return "Medium";
  }

  function renderFoodLogs() {
    // Update meal count
    document.getElementById("count").textContent = `Total Meals: ${foodLogs.length}`;
    
    // Clear current items
    const container = document.getElementById("food-items");
    container.innerHTML = "";
    
    // Sort by newest first
    const sortedLogs = [...foodLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Add each food log to the list
    sortedLogs.forEach(log => {
      const impactClass = `impact-${log.impact.toLowerCase()}`;
      const formattedDate = new Date(log.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const itemDiv = document.createElement("div");
      itemDiv.className = "checklist-item";
      itemDiv.innerHTML = `
        <span>
          <span class="meal-name">${log.meal}</span>
          <span class="impact-pill ${impactClass}">${log.impact} IMPACT</span>
          <small>${formattedDate}</small>
        </span>
        <button class="delete-btn" data-id="${log.id}">Delete</button>
      `;
      container.appendChild(itemDiv);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        const idToDelete = parseInt(this.getAttribute("data-id"));
        foodLogs = foodLogs.filter(log => log.id !== idToDelete);
        renderFoodLogs();
      });
    });
    
    // Update the chart
    updateChartData();
  }

  function initializeChart() {
    const ctx = document.getElementById('impactChart').getContext('2d');
    
    impactChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Low Impact',
            data: [],
            backgroundColor: 'rgba(0, 255, 136, 0.7)',
            borderColor: 'rgba(0, 255, 136, 1)',
            borderWidth: 1
          },
          {
            label: 'Medium Impact',
            data: [],
            backgroundColor: 'rgba(255, 204, 0, 0.7)',
            borderColor: 'rgba(255, 204, 0, 1)',
            borderWidth: 1
          },
          {
            label: 'High Impact',
            data: [],
            backgroundColor: 'rgba(255, 77, 77, 0.7)',
            borderColor: 'rgba(255, 77, 77, 1)',
            borderWidth: 1
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
              }
            }
          },
          title: {
            display: true,
            text: 'Daily Food Impact',
            color: '#00ffc8',
            font: {
              size: 18,
              family: 'Inter',
              weight: 'bold'
            },
            padding: {
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
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw} meals`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#ffffff'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#ffffff',
              stepSize: 1,
              precision: 0
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
    
    updateChartData();
  }

  function updateChartData() {
    // Group by date
    const dailyData = {};
    
    foodLogs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = { low: 0, medium: 0, high: 0 };
      }
      
      if (log.impact === "Low") dailyData[date].low++;
      else if (log.impact === "Medium") dailyData[date].medium++;
      else if (log.impact === "High") dailyData[date].high++;
    });
    
    // Sort dates chronologically
    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    
    // Prepare data for chart
    const lowData = sortedDates.map(date => dailyData[date].low);
    const mediumData = sortedDates.map(date => dailyData[date].medium);
    const highData = sortedDates.map(date => dailyData[date].high);
    
    // Update chart
    impactChart.data.labels = sortedDates;
    impactChart.data.datasets[0].data = lowData;
    impactChart.data.datasets[1].data = mediumData;
    impactChart.data.datasets[2].data = highData;
    impactChart.update();
  }
</script>