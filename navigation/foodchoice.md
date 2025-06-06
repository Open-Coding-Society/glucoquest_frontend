---
layout: tailwind
permalink: /foodchoice/
title: Food Choice
show_reading_time: false
comments: true
categories: [Game]
---
<style>
h1 {
    font-size: 30px;
    color: white;
}

h2 {
    font-size: 26px;
    font-weight: bold;
    margin: 5px;
    text-align: center;
}

h3 {
    font-size: 22px;
    margin: 5px;
    /*color: #000000;*/
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
    background-color:rgb(131, 210, 105)/* #66D7D1*/;
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.popup-content {
  background: #58A618;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.popup-content p {
    color: black;
}

#close-popup {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.card-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    position: relative;
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

/* Tooltip container */
.tooltip {
    display: inline-block;
    position: absolute;
    max-width: 400px;
    overflow-wrap: normal;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    background-color:rgba(70, 128, 23, 0.71);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    /*white-space: nowrap;*/
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    pointer-events: none;
}

/* Arrow */
.tooltip::after {
    top: -6px;
    left: 50%;
    border-color: transparent transparent #333 transparent;
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
}

/* Show tooltip on hover */
.food-card:hover .tooltip {
    opacity: 1;
}

:fullscreen .game-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

/* Enlarge food cards in fullscreen */
:fullscreen .food-card {
  width: 400px;
  height: 400px;
}

:fullscreen .food-card img {
  width: 300px;
  height: 300px;
}

</style>

<audio id="correct" src="{{ site.baseurl }}/assets/audio/correct.mp3" preload="auto"></audio>


<div class="container">

<h2 style="text-align: center;">Make the best choices for your body to keep your glucose levels low!</h2>

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
    <p>Dexcom's continuous glucose monitoring technology tracks glucose (sugar) levels in the blood. This value can change throughout the day based on different factors, including the food you eat! Foods with more carbs will affect blood glucose more. <strong>Glycemic load</strong> is a value that estimates how much a food will cause glucose levels to rise—the higher the value, the greater the climb. It is calculated by multiplying grams of carbohydrate in food by the its glycemic index (a measure of how fast a food will cause blood glucose to increase) and  dividing by 100.</p>
    <br>
    <p class="help-instructions"><strong>Instructions</strong></p>
    <p>You will be presented with a choice of two foods. Hover over the food to see additional info to help guide your decision. When selecting an option, make sure to watch the glycemic load and make choices that will keep it low to manage diabetes!</p>
    <button class="help-btn toggle-help-btn">OK</button>
</div>

<div id="game-wrapper">
    <div id="gl-popup" style="display: none;" class="popup-overlay">
    <div class="popup-content">
        <div id="gl-info"></div>
        <button id="close-popup">OK</button>
    </div>
    </div>
    <!--break-->
    <div class="foodchoice-content active" id="food-choice">
        <div class="game-section">
        <div class="game-panel">
            <div class="card-container" id="card-container"></div>
            <h3 style="text-align: center;">Total Glycemic Load: <span id="total-gl">0</span></h3>
            <button class="help-btn" id="fullscreen-btn">Full Screen</button>
            </div></div>
    </div>
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

function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}

async function fetchFoodPair(pairNumber) {
    let response = await fetch(`${pythonURI}/api/foodchoice?number=${pairNumber}`);
    let data = await response.json();
    if (data.length === 0) {
        document.getElementById("card-container").innerHTML = "<h1 style='text-align:center;'>Good job making healthy choices!</h1>";
        return;
    }
    displayFoodPair(data);
}

// Close popup on button click
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("gl-popup").style.display = "none";
});

function checkFoodChoice(selectedFood, otherFood) {
    const selectedGL = selectedFood.glycemic_load;
    const otherGL = otherFood.glycemic_load;

    if (selectedGL < otherGL) {
        return "Good choice!"
    } else if (selectedGL > otherGL) {
        return "There was a better choice for you."
    } else {
        return "Both choices were good here";
    }
}

async function showGlycemicLoad(pairNumber, selectedFood, otherFood) {
    try {
        const response = await fetch(`${pythonURI}/api/foodchoice?number=${pairNumber}`);
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            alert("No glycemic load data available.");
            return;
        }

        const message = checkFoodChoice(selectedFood, otherFood);

        const messageBox = `<h1><strong>${message}</strong></h1>`
        
        const glInfo = data.map(food => 
        `<p><strong>${food.food} Glycemic Index</strong>: ${food.glycemic_load}</p>`
        ).join("");
        document.getElementById("gl-info").append(messageBox)
        document.getElementById("gl-info").innerHTML = messageBox + '\n' + glInfo;

        if (message !== "There was a better choice for you.") {
            const audio = document.getElementById("correct");
            if (audio) {
                audio.currentTime = 0; // rewind
                audio.play().catch(e => console.warn("Sound could not play:", e));
            }
        }

        // Show the popup
        const popup = document.getElementById("gl-popup");
        popup.style.display = "flex";

    } catch (error) {
        console.error("Failed to fetch glycemic load data:", error);
        alert("Error fetching glycemic load.");
    }
}


async function displayFoodPair(pair) {
    let container = document.getElementById("card-container");
    container.innerHTML = "";

    pair.forEach(async food => {
        let foodCard = document.createElement("div");
        foodCard.classList.add("food-card");
        foodCard.setAttribute("data-glycemic", food.glycemic_load);
        foodCard.setAttribute("data-id", food.id);
        let imgSrc = food.image ? `{{site.baseurl}}/${food.image}` : 'default-image.jpg';

        foodCard.innerHTML = `
            <img src="${imgSrc}" alt="${food.food}">
            <div>
                <span style="color: black">${food.food}</span>
            </div>
            <div class="tooltip" id="${food.id}">Loading info...</div>
        `;

        container.appendChild(foodCard);

        try {
            const response = await fetch(new URL(`${pythonURI}/api/foodchoice/info/${food.id}`), fetchOptions);
            if (!response.ok) {
                document.getElementById(`${food.id}`).textContent = "Info not available";
                throw new Error('Failed to fetch info: ' + response.statusText);
            }
            const data = await response.json();
            document.getElementById(`${food.id}`).textContent = data.info;
        } catch (error) {
            console.error(error);
        }

        foodCard.onclick = () => {
            totalGL = roundToTwoDecimals(totalGL + food.glycemic_load);
            document.getElementById("total-gl").textContent = totalGL;

            const selectedFood = food;
            const otherFood = pair.find(f => f !== food);
            const message = checkFoodChoice(selectedFood, otherFood);
            showGlycemicLoad(currentPairNumber, selectedFood, otherFood);
            currentPairNumber++;
            fetchFoodPair(currentPairNumber);
        };
    });
}

fetchFoodPair(currentPairNumber);

document.getElementById('fullscreen-btn').addEventListener('click', () => {
    const gameWrapper = document.getElementById('game-wrapper');

    if (!document.fullscreenElement) {
        if (gameWrapper.requestFullscreen) {
            gameWrapper.requestFullscreen();
        } else if (gameWrapper.webkitRequestFullscreen) { // Safari
            gameWrapper.webkitRequestFullscreen();
        } else if (gameWrapper.msRequestFullscreen) { // IE11
            gameWrapper.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
    }
});
</script>