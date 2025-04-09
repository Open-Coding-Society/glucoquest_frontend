---
layout: post
title: Glucose Hero
search_exclude: true
permalink: /Dexcom-lifestyle-minigame/
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Glucose Hero</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background:rgb(255, 255, 255);
      color: #000000;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background:rgb(255, 255, 255);
      color: #000000;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
    }
    .title {
      font-size: 2rem;
      font-weight: bold;
      color: #2563eb;
      text-align: center;
      margin-bottom: 1rem;
    }
    .glucose-bar {
      height: 20px;
      background-color: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 1rem;
      color: #000000;
    }
    .glucose-fill {
      height: 100%;
      transition: width 0.3s ease;
      color: #000000;
    }
    .card {
      background: #f3f4f6;
      padding: 1rem;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      color: #000000;
    }
    .card p {
  color: #000000 !important;
  opacity: 1 !important;
}
    .btn {
      display: block;
      width: 100%;
      padding: 0.5rem;
      background: #3b82f6;
      color: #000000;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      margin-top: 0.5rem;
    }
    .btn:hover {
      background: #2563eb;
      color: #000000;
    }
    .status {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      color: #000000;
    }
    .status-high { background: #ef4444; }
    .status-low { background: #facc15; }
    .status-stable { background: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">✨ Glucose Hero</div>
    <div id="game"></div>
  </div>

  <script>
    const choices = {
      morning: [
        { text: "🥞 Eat pancakes with syrup", impact: 30, tip: "High-sugar breakfast may spike your glucose." },
        { text: "🍳 Eat eggs and whole wheat toast", impact: 10, tip: "Balanced breakfast with protein helps steady glucose." }
      ],
      afternoon: [
        { text: "🚶‍♂️ Take a walk", impact: -15, tip: "Light activity helps lower glucose." },
        { text: "🥤 Drink a sugary soda", impact: 25, tip: "Sugary drinks can cause sharp glucose spikes." }
      ],
      evening: [
        { text: "🍝 Eat a large bowl of pasta", impact: 20, tip: "Heavy carbs at night can raise overnight glucose." },
        { text: "🍗 Have grilled chicken and veggies", impact: 5, tip: "Lean proteins and veggies help keep glucose steady." }
      ]
    };

    let glucoseLevel = 100;
    let timeOfDay = 'morning';

    function getStatus(level) {
      if (level > 140) return { label: 'High', class: 'status-high' };
      if (level < 70) return { label: 'Low', class: 'status-low' };
      return { label: 'Stable', class: 'status-stable' };
    }

    function renderGame() {
      const game = document.getElementById('game');
      const status = getStatus(glucoseLevel);
      let html = `
        <div class="card">
          <p style="text-align:center; font-weight:bold;">Glucose Level: <span class="status ${status.class}">${glucoseLevel} mg/dL (${status.label})</span></p>
          <div class="glucose-bar"><div class="glucose-fill" style="width: ${glucoseLevel / 2}%; background: ${status.class === 'status-high' ? '#ef4444' : status.class === 'status-low' ? '#facc15' : '#10b981'}"></div></div>
        </div>
      `;

      if (timeOfDay === 'done') {
        html += `
          <div class="card" style="text-align:center;">
            <h2>🎉 Day Complete!</h2>
            <p>Your final glucose level was <span class="status ${status.class}">${glucoseLevel} mg/dL</span>.</p>
            <button class="btn" onclick="restartGame()">Play Again</button>
          </div>
        `;
      } else {
        html += `<h3 style="text-align:center;">☀️ It's ${timeOfDay}! What would you like to do?</h3>`;
        choices[timeOfDay].forEach(choice => {
          html += `
            <div class="card">
              <p>${choice.text}</p>
              <button class="btn" onclick='choose(${choice.impact}, "${choice.tip}")'>Select</button>
            </div>
          `;
        });
      }

      game.innerHTML = html;
    }

    function choose(impact, tip) {
      glucoseLevel += impact;
      alert(tip);
      if (timeOfDay === 'morning') timeOfDay = 'afternoon';
      else if (timeOfDay === 'afternoon') timeOfDay = 'evening';
      else timeOfDay = 'done';
      renderGame();
    }

    function restartGame() {
      glucoseLevel = 100;
      timeOfDay = 'morning';
      renderGame();
    }

    renderGame();
  </script>
</body>
</html>



