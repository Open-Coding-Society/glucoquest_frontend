---
permalink: /grandprix/
title: Glucose Grand Prix
show_reading_time: false
categories: [Game]
---
<style>
#canvasContainer {
    align-items: center;
}
    
canvas {
    display: block;
    margin: 0 auto;
}
</style>

<button id="startButton">Start Game</button>
<button id="pauseButton">Pause</button>

<div id="canvasContainer">
    <div id="help">
        Dodge obstacles and answer diabetes trivia questions while you ride your way to the finish line!
    </div><br>
  <canvas id="gameCanvas" width="360" height="639"></canvas>
</div>

<div id="triviaModal" style="display: none; position: absolute; top: 10%; left: 5%; width: 90%; background: white; padding: 20px; border: 2px solid black; z-index: 100;">
  <p id="triviaQuestion"></p>
  <div id="triviaOptions"></div>
</div>


<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");

  const assets = {
    background: {
      src: "{{site.baseurl}}/images/grandprix/road.jpg",
    },
    obstacles: {
      pothole: {
        src: "{{site.baseurl}}/images/grandprix/pothole.png",
      },
      cone: {
        src: "{{site.baseurl}}/images/grandprix/cone.png",
      }
    },
    cars: {
      default: {
        src: "{{site.baseurl}}/images/grandprix/default.png",
        width: 256,
        height: 256
      },
      audi: {
        src: "{{site.baseurl}}/images/grandprix/audi.png",
        width: 256,
        height: 256
      },
      viper: {
        src: "{{site.baseurl}}/images/grandprix/viper.png",
        width: 256,
        height: 256
      },
      truck: {
        src: "{{site.baseurl}}/images/grandprix/truck.png",
        width: 256,
        height: 256
      }
    }
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // Game state
  let bgImg, carImg;
  const carScale = 0.4;
  const carWidth = assets.cars.default.width * carScale;
  const carHeight = assets.cars.default.height * carScale;
  let carX, carY;

  let obstacles = [];
  const obstacleWidth = 40;
  const obstacleHeight = 40;
  let obstacleSpawnThreshold = 200;
  let distanceSinceLastObstacle = 0;
  let obstacleImages = {};

  const carSpeed = 5;
  let backgroundY;
  const backgroundSpeed = 2;

  let keys = { a: false, d: false };
  let isRunning = false;
  let isPaused = false;

  let lives = 3;
  let isGameOver = false;
  let collisionCooldown = 5; // Prevent multiple hits from one obstacle
  let wobbleFrames = 0;
  let wobbleDirection = 1;

  let triviaInterval;
  let triviaIndex = 1;
  let showingTrivia = false;

  function resetGameState() {
    carX = canvas.width / 2 - carWidth / 2;
    carY = canvas.height - carHeight - 20;
    backgroundY = 0;
    obstacles = [];
    distanceSinceLastObstacle = 0;
    keys = { a: false, d: false };
    lives = 3;
    isGameOver = false;
    wobbleFrames = 0;
  }


  class Obstacle {
    constructor(x, y, image) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = obstacleWidth;
      this.height = obstacleHeight;
      this.hasCollided = false;
    }

    update() {
      this.y += backgroundSpeed;
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  function setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "a") keys.a = true;
      if (e.key.toLowerCase() === "d") keys.d = true;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "a") keys.a = false;
      if (e.key.toLowerCase() === "d") keys.d = false;
    });
  }

  startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    setupKeyboard();
    startTriviaTimer();
    requestAnimationFrame(gameLoop);
    startButton.textContent = "Restart Game";
  } else {
    resetGameState();
    isPaused = false;
    pauseButton.textContent = "Pause";
    drawStaticScene();
    triviaIndex = 1; // reset questions
    startTriviaTimer();
    requestAnimationFrame(gameLoop);
  }
});


  pauseButton.addEventListener("click", () => {
    if (isRunning) {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? "Resume" : "Pause";
      if (!isPaused) {
        requestAnimationFrame(gameLoop);
      }
    }
  });

  async function initGame() {
    try {
      bgImg = await loadImage(assets.background.src);
      carImg = await loadImage(assets.cars.default.src);

      const obstacleNames = Object.keys(assets.obstacles);
      for (const name of obstacleNames) {
        obstacleImages[name] = await loadImage(assets.obstacles[name].src);
      }

      resetGameState();
      drawStaticScene();
    } catch (e) {
      console.error("Image loading error:", e);
    }
  }

  function startTriviaTimer() {
  triviaInterval = setInterval(() => {
    if (!isPaused && !isGameOver && !showingTrivia) {
      showTrivia();
    }
  }, 10000); // every 10 seconds
}

async function showTrivia() {
  try {
    showingTrivia = true;
    isPaused = true;

    const res = await fetch(`${pythonURI}/api/trivia/${triviaIndex}`, fetchOptions);
    if (!res.ok) throw new Error("Failed to fetch trivia");
    const data = await res.json();

    triviaIndex++; // Increment for next question

    document.getElementById("triviaQuestion").textContent = data.question;

    const optionsContainer = document.getElementById("triviaOptions");
    optionsContainer.innerHTML = "";

    data.answers.forEach((ans) => {
      const btn = document.createElement("button");
      btn.textContent = `${ans.answer_id}: ${ans.answer}`;
      btn.onclick = () => handleTriviaAnswer(ans.answer_id, data.correct_answer);
      optionsContainer.appendChild(btn);
    });

    document.getElementById("triviaModal").style.display = "block";

  } catch (err) {
    console.error("Trivia error:", err);
    showingTrivia = false;
    isPaused = false;
  }
}


function handleTriviaAnswer(selectedId, correctId) {
  document.getElementById("triviaModal").style.display = "none";

  if (selectedId !== correctId) {
    lives--;
    wobbleFrames = 30;
    if (lives <= 0) isGameOver = true;
  }

  showingTrivia = false;
  isPaused = false;
  requestAnimationFrame(gameLoop); // resume
}


  function drawStaticScene() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
  }

  function update() {
    if (keys.a) carX -= carSpeed;
    if (keys.d) carX += carSpeed;

    carX = Math.max(0, Math.min(canvas.width - carWidth, carX));
    
    distanceSinceLastObstacle += backgroundSpeed;

    if (distanceSinceLastObstacle >= obstacleSpawnThreshold) {
      distanceSinceLastObstacle = 0;

      const types = Object.keys(obstacleImages);
      const randomType = types[Math.floor(Math.random() * types.length)];
      const image = obstacleImages[randomType];

      const x = Math.random() * (canvas.width - obstacleWidth);
      const y = -obstacleHeight;

      obstacles.push(new Obstacle(x, y, image));
    }

    obstacles.forEach((o) => o.update());

    // Check collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
  const o = obstacles[i];

  if (o.y > canvas.height) {
    obstacles.splice(i, 1);
    continue;
  }

  const collision = !(
    carX + carWidth < o.x ||
    carX > o.x + o.width ||
    carY + carHeight < o.y ||
    carY > o.y + o.height
  );

  if (collision && !o.hasCollided) {
    o.hasCollided = true;
    lives--;
    wobbleFrames = 30;

    if (lives <= 0) {
      isGameOver = true;
    }
  }
}

    // Wobble effect
  if (wobbleFrames > 0) {
    carX += wobbleDirection * 2;
    wobbleDirection *= -1;
    wobbleFrames--;
  }

    backgroundY += backgroundSpeed;
    if (backgroundY >= canvas.height) {
      backgroundY = 0;
    }
  }

  function draw() {
    ctx.drawImage(bgImg, 0, backgroundY - canvas.height, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, backgroundY, canvas.width, canvas.height);

    obstacles.forEach((o) => o.draw(ctx));

    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);

        // Draw lives
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Lives: ${lives}`, 10, 30);

    // Game over
    if (isGameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.font = "40px Arial";
      ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    }
  }

  function gameLoop() {
  if (!isRunning || isPaused || isGameOver) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

  initGame();
</script>