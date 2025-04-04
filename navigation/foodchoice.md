---
layout: post
permalink: /foodchoice/
show_reading_time: false
comments: true
---
<style>
h1 {
    font-size: 30px;
}
h3 {
    font-size: 24px;
    color: #000000;
}
.card-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}
.food-card {
    width: 300px;
    height: 300px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #58A618;
    /*background-color: #f3f3f3;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: transform 0.3s ease;
    padding: 10px;
    cursor: pointer;
}
.food-card img {
    display: block;
    width: 200px;
    height: 200px;
    justify-content: center;
}
.food-card div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 10px;
}
.food-card:nth-child(odd):hover {
  transform: rotate(-2deg);
}
/* evens are right */
.food-card:nth-child(even):hover {
  transform: rotate(2deg);
}
.food-card:first-child {
    margin-right: 300px;
}
</style>


<h1 style="text-align: center;">Food Choice!</h1>
<h3 style="text-align: center;">Make the best choices for your body to keep your glucose levels low</h3>

<div class="card-container" id="card-container"></div>

<h3 style="text-align: center;">Total Glycemic Index: <span id="total-gi">0</span></h3>


<script type="module">
import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

let totalGI = 0;
let currentPairNumber = 1;
let foodPairs = [];

async function fetchFoodPair(pairNumber) {
    let response = await fetch(`${pythonURI}/api/foodchoice?number=${pairNumber}`);
    let data = await response.json();
    if (data.length === 0) {
        document.getElementById("card-container").innerHTML = "<p style='text-align:center;'>Good job making healthy choices!</p>";
        return;
    }
    displayFoodPair(data);
}

function displayFoodPair(pair) {
    let container = document.getElementById("card-container");
    container.innerHTML = "";

    pair.forEach(food => {
        let foodCard = document.createElement("div");
        foodCard.classList.add("food-card");
        foodCard.setAttribute("data-glycemic", food.glycemic_index);
        let imgSrc = food.image ? `data:image/png;base64,${food.image}` : 'default-image.jpg';

        foodCard.innerHTML = `
            <img src="${imgSrc}" alt="${food.food}">
            <div>
                <span style="color: black">${food.food}</span>
                <span style="color: black">Glycemic Index: ${food.glycemic_index}</span>
            </div>
        `;

        foodCard.onclick = () => {
            totalGI += food.glycemic_index;
            document.getElementById("total-gi").textContent = totalGI;
            currentPairNumber++;
            fetchFoodPair(currentPairNumber);
        };

        container.appendChild(foodCard);
    });
}

fetchFoodPair(currentPairNumber);
</script>