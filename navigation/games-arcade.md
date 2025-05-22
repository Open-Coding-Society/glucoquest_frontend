---
layout: tailwind
title: Arcade
search_exclude: true
hide: true
menu: nav/home.html
show_reading_time: false
---
<link href="https://fonts.googleapis.com/css?family=Oxygen+Mono" rel="stylesheet">
<style>
    p {
        font-family: 'Oxygen Mono';
        font-size: 1.2rem;
        color: #d1d5db;
        text-align: center;
        margin-top: 0.5rem;
    }
    .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 2rem auto;
    }
    .game-box {
        background-color: #3e7e34; /* Green background for game boxes */
        border-radius: 1rem;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .game-box:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    }
    .game-box img {
        width: 100%;
        height: 200px;
        text-align: center;
        object-fit: cover;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    .game-box h2 {
        font-size: 1.5rem;
        color: #a3e635;
        margin-bottom: 0.5rem;
    }
    .game-box p {
        font-size: 1rem;
        color: #d1d5db;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
<html>
    <h1 class="text-5xl font-bold text-center mt-16 drop-shadow-lg">Welcome to the Glucose Arcade!</h1>
    <p class="subtitle">
        Play our games to learn more about glucose monitoring and to achieve a place on the leaderboard.
    </p>
    <div class="games-grid">
        <!-- Game 1 -->
        <a href="{{site.baseurl}}/test2/" class="game-box">
            <img src="{{site.baseurl}}/images/ui-images/pin_dexcom.png" alt="Pin the Dexcom Placeholder">
            <h2>Pin the Dexcom</h2>
            <p>
                An interactive drag-and-drop game where users place a needle correctly on an arm to simulate starting glucose monitoring.
            </p>
        </a>
        <!-- Game 2 -->
        <a href="{{site.baseurl}}/foodchoice/" class="game-box">
            <img src="{{site.baseurl}}/images/ui-images/green-apple2.png" alt="What Do You Eat Placeholder">
            <h2>What Do You Eat?</h2>
            <p>
                A mini-challenge where players choose between two food items for a meal, each associated with a glucose level.
            </p>
        </a>
        <!-- Game 3 -->
        <a href="{{site.baseurl}}/crossword" class="game-box">
            <img src="{{site.baseurl}}/images/ui-images/dexcom_crossword.png" alt="Daily Diabetes Crossword Placeholder">
            <h2>Daily Diabetes Crossword</h2>
            <p>
                A mini-challenge where players solve diabetes-related crosswords.
            </p>
        <!-- Game 4 -->>
        <a href="{{site.baseurl}}/glucoserush/" class="game-box">
            <img src="{{site.baseurl}}/images/healthyplate.jpeg" alt="Balanced Plate Challenge">
            <h2>Perfect Plate</h2>
            <p>
                Catch the right combination of foods from different groups to build a perfect meal while avoiding junk food!
            </p>
        </a>
        <!-- Game 5 -->
        <a href="{{site.baseurl}}/grandprix/" class="game-box">
            <img src="{{site.baseurl}}/images/grandprix/default.png" alt="Glucose Grand Prix">
            <h2>Glucose Grand Prix</h2>
            <p>
                I will also fix the description later.
            </p>
        </a>
        <!-- Game 6 -->
        <a href="{{site.baseurl}}/foodlog/" class="game-box">
            <img src="{{site.baseurl}}/images/foodlog.png" alt="Food Log">
            <h2>Food Log</h2>
            <p>
               "Track your meals, see their impact, and build smarter eating habits, one log at a time."
            </p>
        </a>
        <!-- Game 7 -->
        <a href="{{site.baseurl}}/Dexcom-lifestyle-minigame/" class="game-box">
            <img src="{{site.baseurl}}/images/ui-images/lifestyle-icon.jpg" alt="Glucose Hero Placeholder">
            <h2>Lifestyle Minigame</h2>
            <p>
                An interactive simulation game where players experience a full day living with diabetes by making lifestyle choices.
            </p>
        </a>