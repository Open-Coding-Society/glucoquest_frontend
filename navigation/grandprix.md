---
permalink: /grandprix/
title: Glucose Grand Prix
show_reading_time: false
categories: [Game]
---
<style>
#canvasContainer {
  position: relative;
  width: 360px;
  height: 639px;
  margin: 0 auto;
}

canvas {
  display: block;
  margin: 0 auto;
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
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
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
  font-size: 1.2rem;
  font-weight: bold;
}

.popup-content button {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  top: 10px;
  right: 10px;
  z-index: 5;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

#nameInputContainer {
  display: none;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}

#leaderboardModal {
  display: none;
}

.leaderboard-modal-content {
  background: #e8f5e9; /* Light green background */
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  animation: modalFadeIn 0.3s;
  margin: 0 auto; /* This helps with centering */
}


@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.leaderboard-title {
  color: #000 !important; /* Force black color */
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
  width: 100%; /* Ensure full width for proper centering */
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem auto; /* Center the table */
}

.leaderboard-table th,
.leaderboard-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.leaderboard-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.leaderboard-table tr:first-child td {
  font-weight: bold;
  color: #58A618;
}

.medal-gold {
  color: gold;
  font-weight: bold;
}

.medal-silver {
  color: silver;
  font-weight: bold;
}

.medal-bronze {
  color: #cd7f32; /* bronze color */
  font-weight: bold;
}

.close-leaderboard {
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.close-leaderboard:hover {
  background-color: #1a252f;
}
</style>

<div id="help">
  Dodge obstacles and answer diabetes trivia questions while you ride your way to the finish line!
</div>

<div id="canvasContainer">
  <div id="startButtonContainer" class="center-overlay">
    <button id="startButton">Start Game</button>
  </div>
  <button id="pauseButton">
    <svg id="pauseIcon" width="32" height="32" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  </button>
  <canvas id="gameCanvas" width="360" height="639"></canvas>

  <div id="nameInputContainer">
    <input id="playerName" type="text" placeholder="Your Name" maxlength="64"/>
    <button id="submitScore">Submit</button>
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
    // Handle car movement
    if (keys.a) carX -= 5;
    if (keys.d) carX += 5;
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
  // In your update() function, change the collision check to:
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
    
    // Draw obstacles
    obstacles.forEach(o => o.draw(ctx));
    
    // Draw car
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
    
    // Draw UI
    drawTextWithBackground(`Lives: ${lives}`, 10, 30);
    drawTextWithBackground(`Score: ${points}`, 10, 60);
    
    // Game over screen
    if (isGameOver && !gameOverPopupShown) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
      
      nameInputContainer.style.display = "block";
      gameOverPopupShown = true;
    }
  }

  function drawTextWithBackground(text, x, y) {
    ctx.font = "20px Arial";
    const padding = 6;
    const metrics = ctx.measureText(text);
    
    ctx.fillStyle = "black";
    ctx.fillRect(
      x - padding,
      y - 20 + 4,
      metrics.width + padding * 2,
      24
    );
    
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
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
        finalScoreDisplay.textContent = `Your Score: ${points}`;
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
    this.hitboxWidth = this.width * 0.6;  // 60% of visual width
    this.hitboxHeight = this.height * 0.6; // 60% of visual height
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
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
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