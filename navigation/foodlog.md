---
layout: post
title: Food Log
permalink: /foodlog/
comment: true
---

<h2 class="checklist-title">Food Log</h2>

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

<style>
    /* Same styles as your checklist */
    body {
        font-family: Arial, sans-serif;
        background-color: #121212;
        color: #fff;
    }
    .checklist-title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-top: 20px;
        color: #00ff00;
        text-shadow: 0 0 10px #00ff00;
    }
    .checklist-section, .checklist-container {
        text-align: center;
        margin: 20px auto;
        padding: 20px;
        background: #1e1e1e;
        border-radius: 10px;
        max-width: 400px;
        border: 2px solid #00ff00;
        box-shadow: 0 0 10px #00ff00;
    }
    .checklist-label {
        font-weight: bold;
    }
    .checklist-input {
        padding: 8px;
        border-radius: 5px;
        border: none;
        outline: none;
        margin-right: 10px;
    }
    .checklist-btn {
        background-color: #ff9800;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
    }
    .checklist-btn:hover {
        background-color: #e68900;
    }
    .checklist-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #333;
    }
    .delete-btn {
        background-color: #ff4d4d;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
    }
    .delete-btn:hover {
        background-color: #e60000;
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    document.getElementById("foodForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const meal = document.getElementById("meal").value;
        const token = localStorage.getItem("jwt");

        if (!meal.trim()) return;

        try {
            const response = await fetch(`${pythonURI}/api/foodlog`, {
                ...fetchOptions,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ meal })
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
            const response = await fetch(`${pythonURI}/api/foodlog/user`, {
                ...fetchOptions,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
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

        try {
            await fetch(`${pythonURI}/api/foodlog`, {
                ...fetchOptions,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            });
            fetchFoodLogs();
        } catch (error) {
            console.error("Error deleting log:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", fetchFoodLogs);
</script>
