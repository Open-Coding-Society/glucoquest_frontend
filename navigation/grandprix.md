---
permalink: /grandprix/
title: Glucose Grand Prix
show_reading_time: false
categories: [Game]
---
<style>
@import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');

:root {
  --dexcom-green: #5fb617;
  --dexcom-dark: #1a2c3b;
  --dexcom-light: #e8f5e9;
  --dexcom-accent: #3498db;
  --dexcom-alert: #e74c3c;
}

body {
  font-family: 'Oxygen Mono', monospace;
  background-color: var(--dexcom-dark);
  color: white;
}

#canvasContainer {
  position: relative;
  width: 360px;
  height: 639px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border-radius: 10px;
  overflow: hidden;
}

canvas {
  display: block;
  margin: 0 auto;
  background-color: var(--dexcom-dark);
}

#startButtonContainer {
  z-index: 7;
  display: inline-block;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.popup-content {
  background: var(--dexcom-dark);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  border-top: 4px solid var(--dexcom-green);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.popup-content p {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.popup-content button {
  margin-top: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--dexcom-green);
  color: var(--dexcom-dark);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.popup-content button:hover {
  background-color: var(--dexcom-accent);
  transform: translateY(-2px);
}

.center-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

#pauseButton {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5;
  background: rgba(0,0,0,0.5);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

#pauseButton:hover {
  background: var(--dexcom-green);
  transform: scale(1.1);
}

#nameInputContainer {
  display: none;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  background: var(--dexcom-dark);
  padding: 1.5rem;
  border-radius: 8px;
  border-top: 4px solid var(--dexcom-green);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

#playerName {
  padding: 10px;
  font-size: 16px;
  width: 200px;
  margin-bottom: 1rem;
  border: 2px solid var(--dexcom-green);
  border-radius: 4px;
  background: rgba(255,255,255,0.1);
  color: white;
}

#submitScore {
  padding: 10px 20px;
  background-color: var(--dexcom-green);
  color: var(--dexcom-dark);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

#submitScore:hover {
  background-color: var(--dexcom-accent);
}

.leaderboard-modal-content {
  background: var(--dexcom-dark);
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: modalFadeIn 0.3s;
  margin: 0 auto;
  border-top: 4px solid var(--dexcom-green);
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.leaderboard-title {
  color: var(--dexcom-green) !important;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.leaderboard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem auto;
}

.leaderboard-table th {
  background: var(--dexcom-green);
  color: var(--dexcom-dark);
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
}

.leaderboard-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: white;
}

.leaderboard-table tr:nth-child(even) {
  background-color: rgba(255,255,255,0.05);
}

.leaderboard-table tr:first-child td {
  font-weight: bold;
  color: var(--dexcom-green);
}

.medal-gold {
  color: #f1c40f;
  font-weight: bold;
}

.medal-silver {
  color: #bdc3c7;
  font-weight: bold;
}

.medal-bronze {
  color: #e67e22;
  font-weight: bold;
}

.close-leaderboard {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--dexcom-green);
  color: var(--dexcom-dark);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.close-leaderboard:hover {
  background-color: var(--dexcom-accent);
}

#postGameContainer {
  display: none;
  text-align: center;
  margin-top: 2rem;
  background: var(--dexcom-dark);
  padding: 2rem;
  border-radius: 10px;
  border-top: 4px solid var(--dexcom-green);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

#finalScoreDisplay {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--dexcom-green);
  font-weight: bold;
}

#playAgain {
  padding: 0.75rem 1.5rem;
  background-color: var(--dexcom-green);
  color: var(--dexcom-dark);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

#playAgain:hover {
  background-color: var(--dexcom-accent);
}
</style>

<div id="help" class="text-center mb-8">
  <p class="text-gray-300">Dodge obstacles and answer diabetes trivia questions while you ride your way to the finish line!</p>
</div>

<div id="canvasContainer">
  <div id="startButtonContainer" class="center-overlay">
    <button id="startButton" class="bg-green-500 hover:bg-green-400 text-dexcom-dark font-bold py-3 px-6 rounded-lg transition duration-200">
      Start Game
    </button>
  </div>
  <button id="pauseButton" aria-label="Pause/Play">
    <svg id="pauseIcon" width="32" height="32" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  </button>
  <canvas id="gameCanvas" width="360" height="639"></canvas>

  <div id="nameInputContainer">
    <input id="playerName" type="text" placeholder="Your Name" maxlength="64"/>
    <button id="submitScore">Submit Score</button>
  </div>
</div>

<div id="postGameContainer">
  <div id="finalScoreDisplay"></div>
  <button id="playAgain">Play Again</button>
</div>

<!-- Leaderboard Modal -->
<div id="leaderboardModal" class="popup-overlay">
  <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
    <div class="leaderboard-modal-content">
      <h2 class="leaderboard-title">🏆 Top Scores 🏆</h2>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id="leaderboardBody">
        </tbody>
      </table>
      <button class="close-leaderboard">Close</button>
    </div>
  </div>
</div>

<!-- Trivia Modal -->
<div id="triviaModal" class="popup-overlay" style="display: none;">
  <div class="popup-content">
    <p id="triviaQuestion"></p>
    <div id="triviaOptions"></div>
    <button id="close-popup" style="display: none;">OK</button>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  // Game elements
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const nameInputContainer = document.getElementById("nameInputContainer");
  const postGameContainer = document.getElementById("postGameContainer");
  const finalScoreDisplay = document.getElementById("finalScoreDisplay");
  const playAgainBtn = document.getElementById("playAgain");
  const leaderboardModal = document.getElementById("leaderboardModal");
  const closeLeaderboardBtn = document.querySelector(".close-leaderboard");

  // Game assets
  const assets = {
    background: { src: "{{site.baseurl}}/images/grandprix/road.jpg" },
    obstacles: {
      blood: { src: "{{site.baseurl}}/images/grandprix/blood.png" },
      sugar: { src: "{{site.baseurl}}/images/grandprix/sugar.png" },
      cupcake: { src: "{{site.baseurl}}/images/grandprix/cupcake.png" }
    },
    cars: {
      default: { 
        src: "{{site.baseurl}}/images/grandprix/default.png",
        width: 256,
        height: 256
      }
    }
  };

  // Game state
  let bgImg, carImg;
  const carScale = 0.4;
  const carWidth = assets.cars.default.width * carScale;
  const carHeight = assets.cars.default.height * carScale;
  let carX, carY;
  let obstacles = [];
  let lives = 3;
  let points = 0;
  let isRunning = false;
  let isPaused = false;
  let isGameOver = false;
  let gameOverPopupShown = false;
  let keys = { a: false, d: false };
  let backgroundY = 0;
  const backgroundSpeed = 2;
  let obstacleImages = {};
  let triviaIndex = 1;
  let showingTrivia = false;

  // Initialize game
  async function initGame() {
    try {
      // Show loading state
      ctx.fillStyle = "var(--dexcom-dark)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "var(--dexcom-green)";
      ctx.font = "24px 'Oxygen Mono'";
      ctx.textAlign = "center";
      ctx.fillText("LOADING...", canvas.width/2, canvas.height/2);
      
      bgImg = await loadImage(assets.background.src);
      carImg = await loadImage(assets.cars.default.src);
      
      // Load obstacle images
      for (const name in assets.obstacles) {
        obstacleImages[name] = await loadImage(assets.obstacles[name].src);
      }

      resetGameState();
      setupEventListeners();
      drawStaticScene();
      
      // Set up trivia interval
      setInterval(() => {
        if (isRunning && !isPaused && !showingTrivia && !isGameOver) {
          showTrivia();
        }
      }, 10000);

      // Score increment interval
      setInterval(() => {
        if (isRunning && !isPaused && !isGameOver && !showingTrivia) {
          points += 5;
        }
      }, 1000);

    } catch (e) {
      console.error("Image loading error:", e);
    }
  }

  function resetGameState() {
    carX = canvas.width / 2 - carWidth / 2;
    carY = canvas.height - carHeight - 20;
    backgroundY = 0;
    obstacles = [];
    lives = 3;
    points = 0;
    isGameOver = false;
    gameOverPopupShown = false;
    nameInputContainer.style.display = "none";
    postGameContainer.style.display = "none";
    leaderboardModal.style.display = "none";
  }

  function setupEventListeners() {
    startButton.addEventListener("click", startGame);
    pauseButton.addEventListener("click", togglePause);
    document.getElementById("submitScore").addEventListener("click", submitScore);
    playAgainBtn.addEventListener("click", resetAndStartGame);
    document.getElementById("close-popup").addEventListener("click", closeTrivia);
    closeLeaderboardBtn.addEventListener("click", () => {
      leaderboardModal.style.display = "none";
    });
    
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "a") keys.a = true;
      if (e.key.toLowerCase() === "d") keys.d = true;
    });
    document.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "a") keys.a = false;
      if (e.key.toLowerCase() === "d") keys.d = false;
    });
  }

  function startGame() {
    document.getElementById("startButtonContainer").style.display = "none";
    isRunning = true;
    isPaused = false;
    requestAnimationFrame(gameLoop);
  }

  function togglePause() {
    if (!isRunning) return;
    isPaused = !isPaused;
    
    const pauseIcon = document.getElementById("pauseIcon");
    pauseIcon.innerHTML = isPaused
      ? `<polygon points="6,4 20,12 6,20" />`
      : `<rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />`;
    
    if (!isPaused) requestAnimationFrame(gameLoop);
  }

  function gameLoop() {
    if (!isRunning || isPaused) return;
    
    update();
    draw();
    
    if (!isGameOver) {
      requestAnimationFrame(gameLoop);
    }
  }

  function update() {
    // Handle car movement with smooth acceleration
    const carAcceleration = 2; // Increased from 0.5
    let carVelocity = 0;
    const maxSpeed = 15; // Increased from 8
    
    if (keys.a) carVelocity = Math.max(-maxSpeed, carVelocity - carAcceleration);
    else if (keys.d) carVelocity = Math.min(maxSpeed, carVelocity + carAcceleration);
    else carVelocity *= 0.7; // Reduced friction (from 0.9) for quicker stopping
    
    carX += carVelocity;
    carX = Math.max(0, Math.min(canvas.width - carWidth, carX));
    
    // Update background
    backgroundY += backgroundSpeed;
    if (backgroundY >= canvas.height) backgroundY = 0;
    
    // Update obstacles
    obstacles.forEach(o => o.update());
    obstacles = obstacles.filter(o => o.y < canvas.height);
    
    // Spawn new obstacles
    if (Math.random() < 0.02) {
      const types = Object.keys(obstacleImages);
      const type = types[Math.floor(Math.random() * types.length)];
      obstacles.push(new Obstacle(
        Math.random() * (canvas.width - 40),
        -40,
        obstacleImages[type]
      ));
    }
    
    // Check collisions
    for (const o of obstacles) {
      if (!o.hasCollided && checkCollision(carX, carY, carWidth, carHeight, o)) {
        o.hasCollided = true;
        lives--;
        if (lives <= 0) isGameOver = true;
      }
    }
  }

  function draw() {
    // Draw background
    ctx.drawImage(bgImg, 0, backgroundY - canvas.height, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, backgroundY, canvas.width, canvas.height);
    
    // Add road markings
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/3, backgroundY % 40);
    ctx.lineTo(canvas.width/3, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width*2/3, backgroundY % 40);
    ctx.lineTo(canvas.width*2/3, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw obstacles with shadow
    obstacles.forEach(o => {
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 3;
      o.draw(ctx);
      ctx.shadowColor = 'transparent';
    });
    
    // Draw car with shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
    ctx.shadowColor = 'transparent';
    
    // Draw UI
    ctx.font = "600 18px 'Oxygen Mono'";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(`SCORE: ${points}`, canvas.width - 120, 40);
    ctx.fillText(`LIVES: ${lives}`, 20, 40);
    
    // Game over screen
    if (isGameOver && !gameOverPopupShown) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "var(--dexcom-green)";
      ctx.font = "700 36px 'Oxygen Mono'";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
      
      ctx.font = "600 24px 'Oxygen Mono'";
      ctx.fillText(`FINAL SCORE: ${points}`, canvas.width / 2, canvas.height / 2 + 20);
      
      nameInputContainer.style.display = "block";
      gameOverPopupShown = true;
    }
  }

  async function submitScore() {
    const name = document.getElementById("playerName").value.trim() || "Anonymous";
    
    try {
      const res = await fetch(`${pythonURI}/api/racing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          score: points, 
          date: new Date().toISOString().split("T")[0] 
        }),
      });

      if (res.ok) {
        nameInputContainer.style.display = "none";
        finalScoreDisplay.textContent = `YOUR SCORE: ${points}`;
        postGameContainer.style.display = "block";
        await showLeaderboardModal();
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  async function showLeaderboardModal() {
    try {
      const res = await fetch(`${pythonURI}/api/racing`);
      const data = await res.json();
      const topScores = data.sort((a, b) => b.score - a.score).slice(0, 5);
      const leaderboardBody = document.getElementById("leaderboardBody");
      
      leaderboardBody.innerHTML = topScores.map((entry, index) => {
        let rankClass = "";
        if (index === 0) rankClass = "medal-gold";
        else if (index === 1) rankClass = "medal-silver";
        else if (index === 2) rankClass = "medal-bronze";
        
        return `
          <tr>
            <td class="${rankClass}">${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
          </tr>
        `;
      }).join("");
      
      leaderboardModal.style.display = "flex";
    } catch (err) {
      console.error("Leaderboard error:", err);
    }
  }

  function resetAndStartGame() {
    resetGameState();
    document.getElementById("startButtonContainer").style.display = "block";
    startButton.textContent = "Start Game";
  }

  class Obstacle {
    constructor(x, y, image) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = 40;
      this.height = 40;
      this.hasCollided = false;
      // Define hitbox that's smaller than the visual representation
      this.hitboxWidth = this.width * 0.6;
      this.hitboxHeight = this.height * 0.6;
      this.hitboxOffsetX = (this.width - this.hitboxWidth) / 2;
      this.hitboxOffsetY = (this.height - this.hitboxHeight) / 2;
    }

    update() {
      this.y += backgroundSpeed;
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
      // Uncomment this to visualize hitboxes (for debugging)
      /*
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.x + this.hitboxOffsetX, 
        this.y + this.hitboxOffsetY, 
        this.hitboxWidth, 
        this.hitboxHeight
      );
      */
    }
  }

  function checkCollision(carX, carY, carW, carH, obstacle) {
    // Car hitbox (smaller than visual)
    const carHitboxWidth = carW * 0.7;
    const carHitboxHeight = carH * 0.7;
    const carHitboxOffsetX = (carW - carHitboxWidth) / 2;
    const carHitboxOffsetY = (carH - carHitboxHeight) / 2;
    
    return carX + carHitboxOffsetX < obstacle.x + obstacle.hitboxOffsetX + obstacle.hitboxWidth && 
           carX + carHitboxOffsetX + carHitboxWidth > obstacle.x + obstacle.hitboxOffsetX && 
           carY + carHitboxOffsetY < obstacle.y + obstacle.hitboxOffsetY + obstacle.hitboxHeight && 
           carY + carHitboxOffsetY + carHitboxHeight > obstacle.y + obstacle.hitboxOffsetY;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawStaticScene() {
    ctx.fillStyle = "var(--dexcom-dark)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
  }

  // Trivia functions
  async function showTrivia() {
    if (isGameOver || isPaused || showingTrivia) return;
    
    try {
      showingTrivia = true;
      isPaused = true;

      const res = await fetch(`${pythonURI}/api/trivia/${triviaIndex}`, fetchOptions);
      const data = await res.json();
      triviaIndex++;

      document.getElementById("triviaQuestion").textContent = data.question;
      const optionsContainer = document.getElementById("triviaOptions");
      optionsContainer.innerHTML = "";

      data.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = `${ans.answer_id}: ${ans.answer}`;
        btn.addEventListener("click", () => handleTriviaAnswer(ans.answer_id, data.correct_answer));
        optionsContainer.appendChild(btn);
      });

      document.getElementById("triviaModal").style.display = "flex";
      document.getElementById("close-popup").style.display = "none";
    } catch (err) {
      console.error("Trivia error:", err);
      showingTrivia = false;
      isPaused = false;
    }
  }

  function handleTriviaAnswer(selectedId, correctId) {
    const isCorrect = selectedId === correctId;
    document.getElementById("triviaQuestion").textContent = 
      isCorrect ? "Correct!" : "Wrong! You lost a life.";
    document.getElementById("triviaOptions").innerHTML = "";
    document.getElementById("close-popup").style.display = "inline-block";
    
    if (!isCorrect) {
      lives--;
      if (lives <= 0) isGameOver = true;
    }
  }

  function closeTrivia() {
    document.getElementById("triviaModal").style.display = "none";
    showingTrivia = false;
    isPaused = false;
    if (!isGameOver) requestAnimationFrame(gameLoop);
  }

  // Initialize the game
  window.addEventListener("DOMContentLoaded", initGame);
</script>