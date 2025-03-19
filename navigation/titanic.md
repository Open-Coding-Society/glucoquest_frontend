---
layout: post
title: Titanic
permalink: /titanic/
comments: true
---

<style>
  /* Fullscreen background */
  body {
    margin: 0;
    padding: 0;
    background: url("https://upload.wikimedia.org/wikipedia/commons/f/fd/RMS_Titanic_3.jpg") no-repeat center center fixed;
    background-size: cover;
    font-family: Arial, sans-serif;
    color: white;
    text-align: center;
  }

  /* Centered Form */
  .form-container {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 25px;
    width: 80%;
    max-width: 500px;
    margin: 50px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    height: 500px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  label {
    font-size: 16px;
    font-weight: bold;
  }

  input, select, button {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }

  input, select {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  button {
    background-color: #ffcc00;
    color: black;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
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
</style>

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

    // Get values from the form
    const pclass = parseInt(document.getElementById("pclass").value);
    const sex = document.getElementById("sex").value;
    const age = parseInt(document.getElementById("age").value);
    const sibsp = parseInt(document.getElementById("sibsp").value);
    const parch = parseInt(document.getElementById("parch").value);
    const fare = parseFloat(document.getElementById("fare").value);
    const embarked = document.getElementById("embarked").value;
    const alone = document.getElementById("alone").checked;

    // Input Validation
    if (isNaN(pclass) || pclass < 1 || pclass > 3) {
        alert("Please select a valid class (1, 2, or 3).");
        return;
    }
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }
    if (isNaN(sibsp) || sibsp < 0) {
        alert("Please enter a valid number of siblings or spouse aboard.");
        return;
    }
    if (isNaN(parch) || parch < 0) {
        alert("Please enter a valid number of parents or children aboard.");
        return;
    }
    if (isNaN(fare) || fare < 0) {
        alert("Please enter a valid fare (ticket price).");
        return;
    }

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
        document.getElementById("progressBar").style.width = `${survivalChance}%`;
        document.getElementById("progressBar").style.background = survivalChance > 50 ? "limegreen" : "red";

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error calculating your survival chance.";
    }
  });
</script>
