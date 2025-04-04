---
layout: tailwind
title: Diabetes Prediction
permalink: /prediction
comments: true
---

<title>Diabetes Prediction</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
  }
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  select, input[type="number"], button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  #result {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
  }
</style>

<div class="form-container">
  <h1>Diabetes Prediction</h1>
  <form id="diabetesForm">
    <label for="highbp">High Blood Pressure:</label>
    <select id="highbp" name="highbp" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="highchol">High Cholesterol:</label>
    <select id="highchol" name="highchol" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="cholcheck">Cholesterol Check:</label>
    <select id="cholcheck" name="cholcheck" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="bmi">BMI:</label>
    <input type="number" id="bmi" name="bmi" required><br><br>

    <label for="smoker">Smoker:</label>
    <select id="smoker" name="smoker" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="stroke">Stroke:</label>
    <select id="stroke" name="stroke" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="heartdiseaseorattack">Heart Disease or Attack:</label>
    <select id="heartdiseaseorattack" name="heartdiseaseorattack" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <label for="physactivity">Physical Activity:</label>
    <select id="physactivity" name="physactivity" required>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select><br><br>

    <button type="submit">Submit</button>
  </form>

  <div id="result"></div>
</div>

<script>
  document.getElementById("diabetesForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Collecting form data
    const formData = {
      highbp: document.getElementById("highbp").value,
      highchol: document.getElementById("highchol").value,
      cholcheck: document.getElementById("cholcheck").value,
      bmi: document.getElementById("bmi").value,
      smoker: document.getElementById("smoker").value,
      stroke: document.getElementById("stroke").value,
      heartdiseaseorattack: document.getElementById("heartdiseaseorattack").value,
      physactivity: document.getElementById("physactivity").value
    };

    try {
      const response = await fetch("/api/diabetes/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("result").innerText = `Prediction: ${result.prediction}`;
      } else {
        document.getElementById("result").innerText = "Error: " + result.message;
      }
    } catch (error) {
      document.getElementById("result").innerText = "Error: " + error.message;
    }
  });
</script>
