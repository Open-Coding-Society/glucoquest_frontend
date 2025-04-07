---
layout: post
permalink: /foodchoice/
title: Food Choice
show_reading_time: false
comments: true
categories: [Game]
---
<style>
h1 {
    font-size: 30px;
}
h3 {
    font-size: 24px;
    color: #000000;
}
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #66D7D1;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.help-box {
    max-width: 900px;
    padding: 30px;
    background: transparent;
    color: #000;
    text-align: center;
}
.help {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #66D7D1;
    z-index: 10;
    padding: 20px 40px;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 10px;
    display: block;
}

.help-instructions {
    font-size: 24px;
    text-align: center;
}
.help p {
    color:#000000;
}
.help-btn {
    margin-top: 20px;
    padding: 10px 25px;
    font-size: 18px;
    display: block;
    margin-left: auto;
    margin-right: auto;
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
    border: 2px solid transparent;
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

<div class="container">

<h3 style="text-align: center;">Make the best choices for your body to keep your glucose levels low!</h3>

<button class="help-btn toggle-help-btn">Help</button>

<div class="help" id="help">
    <p class="help-instructions"><strong>Background</strong></p>
    <p>Dexcom's continuous glucose monitoring technology tracks glucose (sugar) levels in the blood. This value can change throughout the day based on different factors, including the food you eat! Foods with more carbs will affect blood glucose more. <strong>Glycemic index</strong> is a value 0-100 that measures how fast a food will cause glucose levels to rise—the higher the value, the faster the climb.</p>
    <br>
    <p class="help-instructions"><strong>Instructions</strong></p>
    <p>You will be presented with a choice of two foods. When selecting an option, make sure to watch the glycemic index and make choices that will keep it low to manage diabetes!</p>
    <button class="help-btn toggle-help-btn">Let's Go!</button>
</div>

<div class="card-container" id="card-container"></div>

<h3 style="text-align: center;">Total Glycemic Index: <span id="total-gi">0</span></h3>
</div>


<script type="module">
import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

function toggleHelp() {
    const helpBox = document.getElementById("help");
    if (helpBox.style.display === 'none') {
        helpBox.style.display = 'block';
    } else {
        helpBox.style.display = 'none';
    }
}

document.querySelectorAll('.toggle-help-btn').forEach(btn => {
    btn.addEventListener('click', toggleHelp);
});

let totalGI = 0;
let currentPairNumber = 1;

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