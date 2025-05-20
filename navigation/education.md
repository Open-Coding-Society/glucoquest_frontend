---
layout: tailwind
title: Education 
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
    <h1 class="text-5xl font-bold text-center mt-16 drop-shadow-lg">Welcome to the Education Center!</h1>
    <p class="subtitle">
        Go through these activties to learn and test your knowledge about diabetes!
    </p>
    <div class="games-grid">
        <!-- Game 1 -->
        <a href="{{site.baseurl}}/flashcards" class="game-box">
            <img src="{{site.baseurl}}/images/ui-images/pin_needle_image.png" alt="Pin the Needle Placeholder">
            <h2>Flashcards</h2>
            <p>
                Learn important terms regarding diabetes and its precautions and management!
            </p>
        </a>