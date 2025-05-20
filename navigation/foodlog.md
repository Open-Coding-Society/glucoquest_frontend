---
layout: post
title: Food log
permalink: /foodlog/
comment: true
---
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
        return "Medium";  // default fallback
    }

    document.getElementById("foodForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const meal = document.getElementById("meal").value.trim();
        const token = localStorage.getItem("jwt");

        if (!meal) return;

        const impact = determineImpact(meal);
        console.log("Sending:", { meal, impact });

        try {
            const response = await fetch(`${pythonURI}/api/foodlog`, {
                ...fetchOptions,
                method: "POST",
                headers: {
                    ...fetchOptions.headers,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ meal, impact })
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
                    ...fetchOptions.headers,
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch logs: " + response.statusText);
            }

            const logs = await response.json();
            console.log("Fetched logs:", logs);
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
                    ...fetchOptions.headers,
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
