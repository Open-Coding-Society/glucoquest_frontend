<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dexcom Device Matching</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f9fc;
      margin: 0;
      padding: 20px;
      color: #2c3e50;
    }
    .game-container {
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
    }
    h1 {
      color: #0066cc;
      margin-bottom: 30px;
    }
    .game-board {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    .slots {
      width: 45%;
      background-color: #e8f4fc;
      border-radius: 10px;
      padding: 20px;
      min-height: 400px;
      border: 2px dashed #0066cc;
    }
    .cards {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      cursor: grab;
      transition: all 0.3s;
      border: 2px solid #0066cc;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    .slot {
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      min-height: 50px;
      border: 2px solid #bdc3c7;
    }
    .slot.highlight {
      background-color: #e8f4fc;
      border-color: #0066cc;
    }
    .slot.correct {
      background-color: #e6f7e6;
      border-color: #2ecc71;
    }
    .timer {
      font-size: 24px;
      margin: 20px 0;
      color: #0066cc;
      font-weight: bold;
    }
    .start-screen, .end-screen {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 50px auto;
    }
    button {
      background-color: #0066cc;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0052a3;
    }
    .hidden {
      display: none;
    }
    .body-outline {
      width: 200px;
      height: 400px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200"><path d="M50 10 Q70 30 50 50 Q30 70 50 90 L50 150 Q30 170 50 190 Q70 170 50 150 L50 90 Q70 70 50 50 Q30 30 50 10 Z" fill="none" stroke="%230066cc" stroke-width="2"/></svg>');
      background-repeat: no-repeat;
      margin: 0 auto 30px;
      position: relative;
    }
    .slot-label {
      font-weight: bold;
      color: #0066cc;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <!-- Start Screen -->
    <div class="start-screen" id="startScreen">
      <h1>Dexcom Device Matching</h1>
      <div class="body-outline"></div>
      <p>Match all the medical devices to their correct placement on the body as fast as you can!</p>
      <p>Avoid wrong matches - they add 5 seconds to your time!</p>
      <button id="startButton">Start Game</button>
    </div>
    <!-- Game Screen -->
    <div class="game-screen hidden" id="gameScreen">
      <h1>Dexcom Device Matching</h1>
      <div class="timer" id="timer">00:00</div>
      <div class="game-board">
        <div class="slots">
          <h3>Body Placement Zones</h3>
          <div class="slot-label">Upper Arm</div>
          <div class="slot" data-correct="sensor"></div>
          <div class="slot-label">Abdomen</div>
          <div class="slot" data-correct="transmitter"></div>
          <div class="slot-label">Pocket/Hand</div>
          <div class="slot" data-correct="app"></div>
          <div class="slot-label">Thigh (Alternative)</div>
          <div class="slot" data-correct="sensor"></div>
        </div>
        <div class="cards">
          <h3>Dexcom Devices</h3>
          <div class="card" draggable="true" data-device="sensor">📟 Glucose Sensor</div>
          <div class="card" draggable="true" data-device="transmitter">📡 Transmitter</div>
          <div class="card" draggable="true" data-device="app">📱 Mobile App</div>
          <div class="card" draggable="true" data-device="sensor">📟 Backup Sensor</div>
        </div>
      </div>
    </div>
    <!-- End Screen -->
    <div class="end-screen hidden" id="endScreen">
      <h1>Congratulations!</h1>
      <div class="body-outline"></div>
      <p>You completed the Dexcom device matching in <span id="finalTime"></span> seconds!</p>
      <p>All devices were placed correctly for optimal glucose monitoring.</p>
      <button id="restartButton">Play Again</button>
    </div>
  </div>

  <script>
    // Game elements
    const startScreen = document.getElementById('startScreen');
    const gameScreen = document.getElementById('gameScreen');
    const endScreen = document.getElementById('endScreen');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const timerElement = document.getElementById('timer');
    const finalTimeElement = document.getElementById('finalTime');

    // Game variables
    let startTime;
    let timerInterval;
    let matchedPairs = 0;
    const totalPairs = 4; // Total number of matches to make
    const penaltySeconds = 5;

    // Start game
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    function startGame() {
      // Reset game state
      matchedPairs = 0;
      
      // Show game screen
      startScreen.classList.add('hidden');
      endScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      
      // Reset all slots
      document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('correct');
        slot.innerHTML = '';
      });
      
      // Reset all cards
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'block';
      });
      
      // Start timer
      startTime = new Date();
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
      
      // Setup drag and drop
      setupDragAndDrop();
    }

    function updateTimer() {
      const currentTime = new Date();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      timerElement.textContent = `${minutes}:${seconds}`;
    }

    function setupDragAndDrop() {
      const cards = document.querySelectorAll('.card');
      const slots = document.querySelectorAll('.slot');
      
      // Add drag events to cards
      cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
      });
      
      // Add drop events to slots
      slots.forEach(slot => {
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('dragenter', dragEnter);
        slot.addEventListener('dragleave', dragLeave);
        slot.addEventListener('drop', drop);
      });
    }

    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.device);
      e.dataTransfer.setData('source-id', e.target.id || e.target.dataset.device);
      setTimeout(() => {
        e.target.classList.add('dragging');
      }, 0);
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragEnter(e) {
      e.preventDefault();
      e.target.classList.add('highlight');
    }

    function dragLeave(e) {
      e.target.classList.remove('highlight');
    }

    function drop(e) {
      e.preventDefault();
      e.target.classList.remove('highlight');
      
      const deviceType = e.dataTransfer.getData('text/plain');
      const sourceId = e.dataTransfer.getData('source-id');
      const card = document.querySelector(`[data-device="${deviceType}"]:not(.dragging)`);
      
      // Check if correct match
      if (e.target.dataset.correct === deviceType) {
        // Correct match
        e.target.classList.add('correct');
        e.target.innerHTML = card.innerHTML;
        card.style.display = 'none';
        matchedPairs++;
        
        // Check if game is complete
        if (matchedPairs === totalPairs) {
          endGame();
        }
      } else {
        // Incorrect match - add time penalty
        startTime = new Date(startTime.getTime() - penaltySeconds * 1000);
        updateTimer();
        
        // Shake animation for wrong match
        e.target.classList.add('shake');
        setTimeout(() => {
          e.target.classList.remove('shake');
        }, 500);
      }
    }

    function endGame() {
      clearInterval(timerInterval);
      
      // Calculate final time
      const endTime = new Date();
      const totalSeconds = Math.floor((endTime - startTime) / 1000);
      
      // Show end screen
      gameScreen.classList.add('hidden');
      endScreen.classList.remove('hidden');
      finalTimeElement.textContent = totalSeconds;
      
      // In a real app, you would save the score to a leaderboard here
      // saveScore(totalSeconds);
    }

    // Remove dragging class when drag ends
    document.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-5px); }
        40% { transform: translateX(5px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      .shake {
        animation: shake 0.5s;
        background-color: #ffebee !important;
        border-color: #f44336 !important;
      }
      .dragging {
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);
  </script>
</body>
</html>