---
layout: post
title: Titanic
permalink: /titanic/
comments: true
---
<style>
/* Ensure full-page layout */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: white;
  text-align: center;
  background: black; /* Keeps contrast */
}

/* Centered Form */
.form-container {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  width: 45%;
  max-width: 500px;
  margin: 50px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  height: auto;
}

/* Chart Container */
.chart-container {
  width: 45%;
  margin-top: 50px;
  display: inline-block;
  vertical-align: top;
}

/* Form Labels */
label {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-top: 10px;
  text-align: left;
}

/* Form Inputs and Selects */
input, select {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

button {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #ffcc00;
  color: black;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

button:hover {
  background-color: #ffaa00;
}

/* Progress Bar */
.progress-container {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 400px;
  height: 25px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 0;
  background: limegreen;
  transition: width 1s ease-in-out;
  
}
.chart-container {
    width: 300px;  /* Adjust as needed */
    height: 300px; /* Adjust as needed */
}

</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<h2>Feature Importance: Titanic Survival Factors</h2>
<canvas id="featureWeightsChart"></canvas>

<!-- Form Container -->
<div class="form-container">
  <h1>Will You Survive the Titanic? 🚢</h1>
  <form id="survivalForm">
      <label for="pclass">Class (1st, 2nd, or 3rd):</label>
      <input type="number" id="pclass" min="1" max="3" required>

      <label for="sex">Gender:</label>
      <select id="sex" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
      </select>

      <label for="age">Age:</label>
      <input type="number" id="age" min="0" required>

      <label for="sibsp">Siblings or Spouse Aboard:</label>
      <input type="number" id="sibsp" min="0" required>

      <label for="parch">Parents or Children Aboard:</label>
      <input type="number" id="parch" min="0" required>

      <label for="fare">Fare (Ticket Price):</label>
      <input type="number" id="fare" min="0" step="0.01" required>

      <label for="embarked">Port of Embarkation:</label>
      <select id="embarked" required>
          <option value="C">Cherbourg</option>
          <option value="Q">Queenstown</option>
          <option value="S">Southampton</option>
      </select>

      <label for="alone">Traveling Alone:</label>
      <input type="checkbox" id="alone">

      <button type="submit">Calculate My Chance</button>
  </form>
</div>

<!-- Survival Chance Display -->
<h2 id="result">Your chance of surviving Titanic: ?%</h2>

<!-- Progress Bar -->
<div class="progress-container">
  <div class="progress-bar" id="progressBar"></div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  document.getElementById("survivalForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Fetch user input
    const pclass = parseInt(document.getElementById("pclass").value);
    const sex = document.getElementById("sex").value;
    const age = parseInt(document.getElementById("age").value);
    const sibsp = parseInt(document.getElementById("sibsp").value);
    const parch = parseInt(document.getElementById("parch").value);
    const fare = parseFloat(document.getElementById("fare").value);
    const embarked = document.getElementById("embarked").value;
    const alone = document.getElementById("alone").checked;

    // Prepare data
    const postData = { Pclass: pclass, Sex: sex, Age: age, SibSp: sibsp, Parch: parch, Fare: fare, Embarked: embarked, Alone: alone };

    try {
        const response = await fetch(`${pythonURI}/api/titanic/predict`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (!response.ok) throw new Error("API Error");

        const result = await response.json();
        const survivalChance = (result.survive * 100).toFixed(2);

        // Update result text
        document.getElementById("result").innerText = `Your chance of surviving Titanic: ${survivalChance}%`;

        // Update progress bar
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = `${survivalChance}%`;
        progressBar.style.background = survivalChance >= 50 ? "limegreen" : "red"; // Fix: Ensures red only for low survival
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error calculating your survival chance.";
    }
  });
async function fetchFeatureWeights() {
    try {
        // Fetch the feature weights from the backend
        const response = await fetch(`${pythonURI}/api/titanic/feature-weights`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error("API Error fetching feature weights");

        // Get feature weights as an object
        const featureWeights = await response.json();

        // Simplify feature names for better understanding
        const simplifiedLabels = {
            'Pclass': 'Ticket Class',
            'Sex': 'Gender',
            'Age': 'Age',
            'SibSp': 'Siblings/Spouse',
            'Parch': 'Parents/Children',
            'Fare': 'Ticket Fare',
            'Embarked': 'Port of Embarkation',
            'Alone': 'Traveling Alone'
        };

        // Prepare data for the chart
        const labels = Object.keys(featureWeights).map(key => simplifiedLabels[key] || key); // Map keys to simplified labels
        const data = Object.values(featureWeights); // Get the actual feature importance values

        // Create the pie chart
        const ctx = document.getElementById('featureWeightsChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie', // Change the type to 'pie'
            data: {
                labels: labels, // Use the simplified labels here
                datasets: [{
                    label: 'Feature Importance for Survival',
                    data: data, // Pie chart will represent each feature's weight
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)', 
                        'rgba(75, 192, 192, 0.2)', 
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)', 
                        'rgba(54, 162, 235, 0.2)', 
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 205, 86, 0.2)', 
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)', 
                        'rgba(75, 192, 192, 1)', 
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)', 
                        'rgba(54, 162, 235, 1)', 
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 205, 86, 1)', 
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Make the pie chart responsive
                plugins: {
                    legend: {
                        position: 'top', // Adjust legend position
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                // Format the tooltip to show percentage of total weight
                                let percentage = (tooltipItem.raw * 100 / data.reduce((a, b) => a + b, 0)).toFixed(2);
                                return `${tooltipItem.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching feature weights:", error);
    }
}


  // Call the fetchFeatureWeights function when the page loads
  window.onload = fetchFeatureWeights;
</script>
