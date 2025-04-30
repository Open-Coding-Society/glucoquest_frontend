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

.foodchoice-tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #3a3a3a;
  }
  
  .foodchoice-tab {
    padding: 10px 20px;
    cursor: pointer;
    background: #2c2c2c;
    border: 1px solid #3a3a3a;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
  }
  
  .foodchoice-tab.active {
    background: #3a3a3a;
    border-color: #3b82f6;
    color: #3b82f6;
  }
  
  .foodchoice-content {
    display: none;
  }
  
  .foodchoice-content.active {
    display: block;
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
    display: none;
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

<div class="foodchoice-tabs">
  <div class="foodchoice-tab active" data-tab="introduction">Introduction</div>
  <div class="foodchoice-tab" data-tab="food-choice">Food Choice Game</div>
</div>

<div class="foodchoice-content active" id="introduction">
    <div class="introduction-bar">
      <h2>Smart Food Choices Made Simple with the Glycemic Load Game</h2>
    <p><strong>Eat Smarter – No Nutrition Degree Needed!</strong></p>
    <p>Managing diabetes is all about making informed decisions—and that includes what you eat. This <strong>interactive food choice game</strong> helps you explore how different foods impact your blood sugar using an easy-to-understand measure: the <strong>glycemic load (GL)</strong>.</p>
    <h3>What Is Glycemic Load?</h3>
    <p>The glycemic load is a value that tells you how much a food will raise your blood glucose levels. The higher the number, the greater the increase. Foods like white bread or sugary drinks have a high GL, while beans and whole grains have a lower GL, meaning they raise your blood sugar more slowly and steadily.</p>
    <h3>Why Does It Matter for Diabetes?</h3>
    <p>If you have diabetes, keeping blood glucose levels within target ranges is critical. Choosing foods with a lower glycemic load can help reduce spikes, making it easier to manage blood sugar throughout the day.</p>
    <h3>How Dexcom CGM Comes In</h3>
    <p>Dexcom's <strong>Continuous Glucose Monitoring (CGM)</strong> system tracks glucose levels in real time—no fingersticks required. It shows how your glucose responds to everything you do, including what you eat. With this game, you can see how choosing lower GL foods would keep your levels more stable, just like Dexcom’s CGM would show in real life.</p>
    <h3>Why Play This Game?</h3>
    <ul>
      <li><strong>Interactive Learning</strong>: Pick between two foods and watch how each one affects your total glycemic load.</li>
      <li><strong>See the Impact</strong>: Every food has a number—compare, learn, and understand how better choices lead to better glucose control.</li>
      <li><strong>Diabetes-Friendly</strong>: Ideal for anyone living with diabetes, caregivers, or those simply curious about eating in a more glucose-stable way.</li>
      <li><strong>Train Your Brain</strong>: With repeated play, you’ll naturally start to recognize the better options and make them part of your daily life.</li>
    </ul>
  </div>
</div>


<div class="help" id="help">
    <p class="help-instructions"><strong>Background</strong></p>
    <p>Dexcom's continuous glucose monitoring technology tracks glucose (sugar) levels in the blood. This value can change throughout the day based on different factors, including the food you eat! Foods with more carbs will affect blood glucose more. <strong>Glycemic load</strong> is a value 0-100 that estimates how much a food will cause glucose levels to rise—the higher the value, the greater the climb. It is calculated by multiplying grams of carbohydrate in food by the its glycemic index (a measure of how fast a food will cause blood glucose to increase) and  dividing by 100.</p>
    <br>
    <p class="help-instructions"><strong>Instructions</strong></p>
    <p>You will be presented with a choice of two foods. When selecting an option, make sure to watch the glycemic load and make choices that will keep it low to manage diabetes!</p>
    <button class="help-btn toggle-help-btn">OK</button>
</div>


<div class="foodchoice-content active" id="food-choice">
    <div class="game-section">
      <div class="game-panel">
        <div class="card-container" id="card-container"></div>
        <h3 style="text-align: center;">Total Glycemic Load: <span id="total-gl">0</span></h3>
        </div></div>
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

document.querySelectorAll('.foodchoice-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.foodchoice-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.foodchoice-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
      });
    });

let totalGL = 0;
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
        foodCard.setAttribute("data-glycemic", food.glycemic_load);
        let imgSrc = food.image ? `data:image/png;base64,${food.image}` : 'default-image.jpg';

        foodCard.innerHTML = `
            <img src="${imgSrc}" alt="${food.food}">
            <div>
                <span style="color: black">${food.food}</span>
                <span style="color: black">Glycemic Load: ${food.glycemic_load}</span>
            </div>
        `;

        foodCard.onclick = () => {
            totalGL += food.glycemic_load;
            document.getElementById("total-gl").textContent = totalGL;
            currentPairNumber++;
            fetchFoodPair(currentPairNumber);
        };

        container.appendChild(foodCard);
    });
}

fetchFoodPair(currentPairNumber);
</script>