---
layout: post
title: Food log
permalink: /foodlog1/
comment: true
---

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Roboto&display=swap" rel="stylesheet">

<h2 class="checklist-title">Food Log</h2>

<div class="checklist-section">
    <form id="foodForm" class="checklist-form">
        <label for="meal" class="checklist-label">Meal:</label>
        <input type="text" id="meal" name="meal" required class="checklist-input"><br><br>
        <button class="submit-btn checklist-btn">Add Meal</button>
    </form>
</div>

<div class="checklist-container">
    <p id="count" class="checklist-count"></p>
    <div class="checklist-items" id="food-items"></div>
</div>

<style>
    body {
        background-color: #121212;
        color: #ffffff;
        font-family: 'Roboto', sans-serif;
        padding: 2rem;
    }

    .checklist-title {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 1rem;
        color: #00ffcc;
        font-family: 'Orbitron', sans-serif;
        text-shadow: 0 0 10px #00ffcc;
    }

    .checklist-form {
        text-align: center;
        margin-bottom: 2rem;
    }

    .checklist-label {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }

    .checklist-input {
        padding: 0.6rem;
        border: none;
        border-radius: 8px;
        width: 250px;
        background-color: #222;
        color: #fff;
        font-size: 1rem;
        box-shadow: inset 0 0 5px #00ffcc;
        outline: none;
    }

    .submit-btn {
        margin-top: 1rem;
        padding: 0.6rem 1.2rem;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        background-color: #00ffcc;
        color: #000;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
    }

    .submit-btn:hover {
        background-color: #00cfa5;
        transform: scale(1.05);
    }

    .checklist-count {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #00ffcc;
    }

    .checklist-item {
        background-color: #1f1f1f;
        padding: 0.8rem 1rem;
        margin: 0.5rem auto;
        border-radius: 10px;
        max-width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px rgba(0, 255, 204, 0.15);
    }

    .delete-btn {
        background-color: #ff4d4d;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .delete-btn:hover {
        background-color: #e60000;
        transform: scale(1.05);
    }

    h4 {
        text-align: center;
        font-weight: 600;
    }

    strong {
        color: #ffffff;
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    function determineImpact(meal) {
        const lowered = meal.toLowerCase();

        if (lowered.includes("ice cream") || lowered.includes("pizza") || lowered.includes("soda") || lowered.includes("cake")) {
            return "High";
        }
        if (lowered.includes("banana") || lowered.includes("toast") || lowered.includes("pasta") || lowered.includes("rice")) {
            return "Medium";
        }
        if (lowered.includes("salad") || lowered.includes("chicken") || lowered.includes("broccoli") || lowered.includes("grilled")) {
            return "Low";
        }
        return "Medium";  // fallback
    }

    document.getElementById("foodForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const meal = document.getElementById("meal").value.trim();
        const token = localStorage.getItem("jwt");
        if (!meal) return;

        const impact = determineImpact(meal);
        const postData = { meal, impact };

        try {
            const response = await fetch(`${pythonURI}/api/foodlog`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error("Failed to log meal: " + response.statusText);
            }

            alert("Meal logged successfully!");
            document.getElementById("foodForm").reset();
            fetchFoodLogs();
        } catch (error) {
            console.error("Error logging meal:", error);
            alert("Error: " + error.message);
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

            if (!response.ok) {
                throw new Error("Failed to fetch logs: " + response.statusText);
            }

            const logs = await response.json();
            document.getElementById("count").innerHTML = `<h4>Total Meals: ${logs.length || 0}</h4>`;

            const container = document.getElementById("food-items");
            container.innerHTML = "";

            logs.forEach(log => {
                const div = document.createElement("div");
                div.className = "checklist-item";
                div.innerHTML = `
                    <span><strong>${log.meal}</strong> — Impact: ${log.impact}</span>
                    <button class="delete-btn" data-id="${log.id}">Delete</button>
                `;
                container.appendChild(div);
            });

            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    deleteFoodLog(this.getAttribute("data-id"));
                });
            });

        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    }

    async function deleteFoodLog(id) {
        const token = localStorage.getItem("jwt");
        const postData = { id };

        try {
            const response = await fetch(`${pythonURI}/api/foodlog`, {
                ...fetchOptions,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error("Failed to delete log: " + response.statusText);
            }

            fetchFoodLogs();
        } catch (error) {
            console.error("Error deleting log:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", fetchFoodLogs);
</script>
