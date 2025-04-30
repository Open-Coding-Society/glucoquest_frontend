---
layout: tailwind
title: About
permalink: /about/
comments: true
mermaid: true  
---
<link href='https://fonts.googleapis.com/css?family=Oxygen Mono' rel='stylesheet'>

<style>
    p {
        font-family: 'Oxygen Mono';
        font-size: 15px;
        color: white;
    }

    h1, h2, h3, h4 {
        font-family: 'Oxygen Mono';
        color:#5fb617;
    }

    .feature-card {
        background: #1a3a1e;
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    .divider {
        width: 100px;
        height: 2px;
        background: #5fb617;
        margin: 30px auto;
    }
</style>

<h1 class="text-5xl font-bold text-center mt-16 drop-shadow-lg">
    GlucoQuest: Gamifying Diabetes Education
</h1>

<p class="text-xl text-center text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
   Revolutionizing diabetes management through interactive gaming and machine learning
</p>

<div class="divider"></div>


<div class="bg-green-900 rounded-3xl shadow-xl p-10 mx-auto max-w-6xl mt-6">
    <img style="max-width:550px; margin-left: auto; margin-right: auto" src="{{site.baseurl}}/images/intro/dexcom_product.jpg">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h3 class="text-2xl font-bold text-green-300">1 in 10 Americans</h3>
            <p class="text-lg text-gray-300 mt-2">
                have diabetes, with many unaware of daily management needs
            </p>
        </div>
        <div>
            <h3 class="text-2xl font-bold text-green-300">Dexcom CGM Technology</h3>
            <p class="text-lg text-gray-300 mt-2">
                Revolutionary continuous glucose monitoring that remains underutilized
            </p>
        </div>
    </div>
</div>

<div class="divider"></div>


<div class="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 mt-10">
    <div class="bg-green-800 rounded-3xl shadow-lg p-6 text-center">
        <h4 class="text-2xl font-bold text-green-300">👥 Teens/Young Adults</h4>
        <p class="text-lg text-gray-300 mt-2">
            Highest rate of new diabetes cases
        </p>
    </div>
    <div class="bg-green-800 rounded-3xl shadow-lg p-6 text-center">
        <h4 class="text-2xl font-bold text-green-300">🏫 Schools & Families</h4>
        <p class="text-lg text-gray-300 mt-2">
            Safe, scalable learning environment
        </p>
    </div>
</div>

<div class="bg-green-900 rounded-3xl shadow-xl p-10 mx-auto max-w-4xl mt-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
            <h4 class="text-xl font-bold text-green-300">📊 90% Better Retention</h4>
            <p class="text-lg text-gray-300">Games vs. lectures (NIH study)</p>
            
            <h4 class="text-xl font-bold text-green-300 mt-4">⚡ Immediate Feedback</h4>
            <p class="text-lg text-gray-300">Leads to faster habit formation</p>
        </div>
        <img src="{{site.baseurl}}/images/intro/game_stats.png">
    </div>
</div>

<div class="divider"></div>


<div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 mt-10">
    <div class="feature-card rounded-3xl shadow-lg p-6">
        <h3 class="text-2xl font-bold text-green-300">🎯 For Users</h3>
        <ul class="list-disc pl-5 mt-2 space-y-2">
            <li class="text-lg text-gray-300">Learn through engaging mini-games</li>
            <li class="text-lg text-gray-300">"Pin the Needle" simulation</li>
            <li class="text-lg text-gray-300">"What Do You Eat?" nutrition game</li>
            <li class="text-lg text-gray-300">Interactive glucose tracking</li>
        </ul>
    </div>
    
    <div class="feature-card rounded-3xl shadow-lg p-6">
        <h3 class="text-2xl font-bold text-green-300">💼 For Dexcom</h3>
        <ul class="list-disc pl-5 mt-2 space-y-2">
            <li class="text-lg text-gray-300">ML Diabetes Risk prediction model</li>
            <li class="text-lg text-gray-300">Promotes premium CGM plans</li>
            <li class="text-lg text-gray-300">Increases technology adoption</li>
            <li class="text-lg text-gray-300">Data-driven user insights</li>
        </ul>
    </div>
</div>

<div class="divider"></div>


<div class="bg-green-900 rounded-3xl shadow-xl p-10 mx-auto max-w-6xl mt-6">
    <h3 class="text-2xl font-bold text-green-300">Data Foundation</h3>
    <ul class="list-disc pl-5 mt-2 space-y-2">
        <li class="text-lg text-gray-300"><strong>Dataset:</strong> CDC Diabetes Health Indicators (40K+ records)</li>
        <li class="text-lg text-gray-300"><strong>Features:</strong> 21 key metrics including BMI, activity levels, hypertension</li>
        <li class="text-lg text-gray-300"><strong>Processing:</strong> Cleaned/imputed data with optimal feature selection</li>
    </ul>

    <h3 class="text-2xl font-bold text-green-300 mt-8">Model Performance</h3>
    <img src="{{site.baseurl}}/images/intro/ml-data.png">

    <h3 class="text-2xl font-bold text-green-300 mt-8">Integration</h3>
    <ul class="list-disc pl-5 mt-2 space-y-2">
        <li class="text-lg text-gray-300"><strong>Architecture:</strong> Flask API backend</li>
        <li class="text-lg text-gray-300"><strong>Input:</strong> User health metrics</li>
        <li class="text-lg text-gray-300"><strong>Output:</strong> Personalized risk score (0-100%)</li>
    </ul>
</div>

<div class="divider"></div>

<h2 class="text-4xl font-bold text-center">
    Dexcom Sensor Training Simulator
</h2>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mt-10">
    <div class="bg-green-800 rounded-3xl shadow-lg p-6 text-center">
        <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎯</div>
        <h4 class="text-xl font-bold text-green-300">Learn by Doing</h4>
        <p class="text-lg text-gray-300 mt-2">
            Risk-free practice in virtual environment
        </p>
    </div>
    <div class="bg-green-800 rounded-3xl shadow-lg p-6 text-center">
        <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🧠</div>
        <h4 class="text-xl font-bold text-green-300">Enhanced Retention</h4>
        <p class="text-lg text-gray-300 mt-2">
            Gamification improves learning outcomes
        </p>
    </div>
    <div class="bg-green-800 rounded-3xl shadow-lg p-6 text-center">
        <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💪</div>
        <h4 class="text-xl font-bold text-green-300">Build Confidence</h4>
        <p class="text-lg text-gray-300 mt-2">
            Repeat until mastery achieved
        </p>
    </div>
</div>

<div class="divider"></div>