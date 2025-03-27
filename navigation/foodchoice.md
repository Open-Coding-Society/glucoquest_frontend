---
layout: post
permalink: /foodchoice
show_reading_time: false
comments: true
---
<style>
h1 {
    font-size: 30px;
}
h3 {
    font-size: 24px;
}
.card-container {
    background-color: #58A618;
    display: flex;
    justify-content: center;
}
.food-card {
    width: 300px;
    height: 300px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
    transition: transform 0.3s ease;
}
.food-card img {
    display: block;
    height: 50%;
    width: auto;
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

<title>Food Choice!</title>

<h1 style="text-align: center;">Food Choice!</h1>
<h3 style="text-align: center;">Make the best choices for your body to keep your glucose levels low</h3>

<div class="card-container">
    <div class="food-card" data-glycemic="41" onclick="foodSelect(this)">
        <img src="{{site.baseurl}}/images/food/apple.png">
        <div>
            <span>Green Apple</span>
            <span>Glycemic Index: 41</span>
        </div>
    </div>
    <div class="food-card" data-glycemic="62" onclick="foodSelect(this)">
        <img src="{{site.baseurl}}/images/food/banana.png">
        <div>
            <span>Banana</span>
            <span>Glycemic Index: 62</span>
        </div>
    </div>
</div>

<h3 style="text-align: center;">Total Glycemic Index: <span id="total-gi">0</span></h3>

<script>
    let totalGI = 0;

    async function foodSelect(card) {
        let glycemicValue = parseInt(card.getAttribute("data-glycemic")); // Get current GI
        totalGI += glycemicValue; // Update total
        document.getElementById("total-gi").textContent = totalGI;
    }
</script>