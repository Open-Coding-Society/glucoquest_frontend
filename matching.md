<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dexcom CGM Training Game</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --dexcom-blue: #0066cc;
      --dexcom-light: #e8f4fc;
      --dexcom-dark: #003366;
      --success: #27ae60;
      --error: #e74c3c;
      --gold: #f1c40f;
    }
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #f5f9fc 0%, #e0eef9 100%);
      margin: 0;
      padding: 0;
      min-height: 100vh;
      color: #2c3e50;
    }
    .game-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    /* Screen Styling */
    .screen {
      display: none;
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.08);
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
    }
    .screen.active {
      display: block;
    }
    /* Header Styling */
    .game-header {
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
    }
    .game-header h1 {
      color: var(--dexcom-dark);
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      position: relative;
      display: inline-block;
    }
    .game-header h1:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--dexcom-blue);
      border-radius: 2px;
    }
    /* Body Outline */
    .body-outline {
      width: 220px;
      height: 440px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 220"><path d="M55 15 Q75 35 55 55 Q35 75 55 95 L55 155 Q35 175 55 195 Q75 175 55 155 L55 95 Q75 75 55 55 Q35 35 55 15 Z" fill="none" stroke="%230066cc" stroke-width="2" stroke-linecap="round"/></svg>');
      background-repeat: no-repeat;
      margin: 2rem auto;
      position: relative;
      filter: drop-shadow(0 4px 8px rgba(0,102,204,0.2));
    }
    /* Button Styling */
    .btn {
      background: var(--dexcom-blue);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0,102,204,0.3);
      margin: 0.5rem;
    }
    .btn:hover {
      background: var(--dexcom-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,102,204,0.4);
    }
    .btn-outline {
      background: white;
      color: var(--dexcom-blue);
      border: 2px solid var(--dexcom-blue);
    }
    /* Game Board Styling */
    .game-board {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      gap: 2rem;
    }
    .slots, .cards {
      width: 48%;
      background: rgba(255,255,255,0.7);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(0,0,0,0.05);
    }
    /* Card Styling */
    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      cursor: grab;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      margin-bottom: 1rem;
      position: relative;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }
    /* Slot Styling */
    .slot {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      min-height: 60px;
      border: 2px solid #ecf0f1;
      transition: all 0.3s ease;
    }
    .slot.highlight {
      background: rgba(0,102,204,0.05);
      border-color: var(--dexcom-blue);
      transform: scale(1.02);
    }
    .slot.correct {
      background: rgba(39,174,96,0.08);
      border-color: var(--success);
      box-shadow: 0 0 0 2px rgba(39,174,96,0.3);
    }
    .slot-label {
      font-weight: 600;
      color: var(--dexcom-dark);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    /* Timer Styling */
    .timer {
      font-size: 1.8rem;
      margin: 2rem 0;
      color: var(--dexcom-dark);
      font-weight: 700;
      text-align: center;
      background: white;
      padding: 1rem;
      border-radius: 50px;
      display: inline-block;
      min-width: 180px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    /* Leaderboard Styling */
    .leaderboard {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
    }
    .leaderboard th {
      background: var(--dexcom-blue);
      color: white;
      padding: 12px;
      text-align: left;
    }
    .leaderboard td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
    }
    .leaderboard tr:nth-child(even) {
      background-color: #f8fafc;
    }
    .leaderboard tr:hover {
      background-color: #f1f7fd;
    }
    /* Input Styling */
    .input-group {
      margin-bottom: 1.5rem;
    }
    .input-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
    }
    /* Animations */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-8px); }
      80% { transform: translateX(8px); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    .shake {
      animation: shake 0.5s;
      background-color: rgba(231,76,60,0.08) !important;
      border-color: var(--error) !important;
    }
    .pulse {
      animation: pulse 1.5s infinite;
    }
    /* Responsive Design */
    @media (max-width: 768px) {
      .game-board {
        flex-direction: column;
      }
      .slots, .cards {
        width: 100%;
      }
      .game-header h1 {
        font-size: 2rem;
      }
      .screen {
        padding: 2rem 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="game-container">
    <!-- Start Screen -->
    <div class="screen active" id="startScreen">
      <div class="game-header">
        <h1>Dexcom CGM Training</h1>
        <p>Master medical device placement through this interactive challenge</p>
      </div>
      <div class="body-outline"></div>
      <div style="max-width: 600px; margin: 0 auto;">
        <p style="color: #34495e; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
          <span style="color: var(--dexcom-blue); font-weight: 600;">Objective:</span> 
          Correctly match all Dexcom CGM components to their proper placement locations on the body.
          Complete the challenge as quickly as possible to earn your spot on the leaderboard!
        </p>
        <button class="btn" id="startButton">Begin Training</button>
      </div> 
    </div>
    <!-- Game Screen -->
    <div class="screen" id="gameScreen">
      <div class="game-header">
        <h1>CGM Placement Challenge</h1>
        <div class="timer" id="timer">00:00</div>
      </div>
      <div class="game-board">
        <div class="slots">
          <h3 style="color: var(--dexcom-dark); margin-bottom: 1.5rem; font-weight: 600;">Placement Zones</h3>
          <div class="slot-label">Upper Arm (Primary)</div>
          <div class="slot" data-correct="sensor"></div>
          <div class="slot-label">Abdomen (Primary)</div>
          <div class="slot" data-correct="transmitter"></div>
          <div class="slot-label">Pocket/Hand</div>
          <div class="slot" data-correct="receiver"></div>
          <div class="slot-label">Thigh (Alternative)</div>
          <div class="slot" data-correct="sensor-alt"></div>
        </div>
        <div class="cards">
          <h3 style="color: var(--dexcom-dark); margin-bottom: 1.5rem; font-weight: 600;">Dexcom Devices</h3>
          <div id="deviceContainer" class="device-column">
            <div class="card pulse" draggable="true" data-device="sensor">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">📟</span>
                <div>
                  <div style="font-weight: 600; color: var(--dexcom-dark);">Glucose Sensor</div>
                  <div style="font-size: 0.9rem; color: #7f8c8d;">Measures interstitial fluid</div>
                </div>
              </div>
            </div>
            <div class="card pulse" draggable="true" data-device="transmitter">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">📡</span>
                <div>
                  <div style="font-weight: 600; color: var(--dexcom-dark);">Transmitter</div>
                  <div style="font-size: 0.9rem; color: #7f8c8d;">Sends data every 5 minutes</div>
                </div>
              </div>
            </div>
            <div class="card pulse" draggable="true" data-device="receiver">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">📱</span>
                <div>
                  <div style="font-weight: 600; color: var(--dexcom-dark);">Receiver/Phone</div>
                  <div style="font-size: 0.9rem; color: #7f8c8d;">Displays glucose data</div>
                </div>
              </div>
            </div>
            <div class="card pulse" draggable="true" data-device="sensor-alt">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">📟</span>
                <div>
                  <div style="font-weight: 600; color: var(--dexcom-dark);">Backup Sensor</div>
                  <div style="font-size: 0.9rem; color: #7f8c8d;">Alternative placement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Add this Continue button container -->
      <div id="continueButtonContainer" style="display:none; text-align:center; margin-top:2rem;">
        <button id="continueButton" class="btn">Continue</button>
      </div>
    </div>
    <!-- Name Input Screen -->
    <div class="screen" id="nameScreen">
      <div class="game-header">
        <h1>Record Your Score</h1>
      </div>
      <div style="max-width: 500px; margin: 0 auto;">
        <p style="color: #34495e; margin-bottom: 2rem; font-size: 1.1rem;">
          You completed the training in <span id="scoreTime" style="font-weight: 600;"></span> seconds!
          Enter your name to save your score to the leaderboard.
        </p>
        <div class="input-group">
          <input type="text" id="playerName" placeholder="Your name or initials">
        </div>
        <button class="btn" id="saveScoreButton">Save Score</button>
      </div>
    </div>
    <!-- End Screen with Leaderboard -->
    <div class="screen" id="endScreen">
      <div class="game-header">
        <h1>Training Complete!</h1>
        <div style="font-size: 1.2rem; color: var(--dexcom-blue); margin: 1rem 0 2rem;">
          Your time: <span id="finalTime" style="font-weight: 700;"></span> seconds
        </div>
      </div>
      <div class="body-outline"></div>
      <div style="margin: 2rem 0;">
        <h3 style="color: var(--dexcom-dark); margin-bottom: 1rem;">Leaderboard</h3>
        <table id="leaderboard">
          <thead>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- JS will insert rows here -->
          </tbody>
        </table>
      </div>
      <div style="margin-top: 2rem;">
        <button class="btn" id="restartButton" style="margin-right: 1rem;">Try Again</button>
        <button class="btn btn-outline" id="newPlayerButton">New Player</button>
      </div>
    </div>
    <!-- Device Container (added) -->
    <div id="deviceContainer" class="device-column">
      <!-- All .card elements are children of this div at game start -->
    </div>
  </div>

  <script>
  // DOM Elements
  const startScreen = document.getElementById('startScreen');
  const gameScreen = document.getElementById('gameScreen');
  const nameScreen = document.getElementById('nameScreen');
  const endScreen = document.getElementById('endScreen');
  const startButton = document.getElementById('startButton');
  const saveScoreButton = document.getElementById('saveScoreButton');
  const restartButton = document.getElementById('restartButton');
  const newPlayerButton = document.getElementById('newPlayerButton');
  const timerElement = document.getElementById('timer');
  const scoreTimeElement = document.getElementById('scoreTime');
  const finalTimeElement = document.getElementById('finalTime');
  const currentPlayerTimeElement = document.getElementById('currentPlayerTime');
  const playerNameInput = document.getElementById('playerName');
  const leaderboard = document.getElementById('leaderboard');
  const continueButton = document.getElementById('continueButton');
  const continueButtonContainer = document.getElementById('continueButtonContainer');

  // Game Variables
  let startTime;
  let timerInterval;
  let matchedPairs = 0;
  const totalPairs = 4;
  const penaltySeconds = 5;
  let currentTime = 0;
  let leaderboardEntries = [];

  // Initialize the game
  function init() {
    startButton.addEventListener('click', showGameScreen);
    saveScoreButton.addEventListener('click', saveScore);
    restartButton.addEventListener('click', showGameScreen);
    newPlayerButton.addEventListener('click', showStartScreen);
    setupDragAndDrop();
    document.getElementById('continueButton').addEventListener('click', endGame);
  }

  // Screen Navigation Functions
  function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  }

  function showStartScreen() {
    hideAllScreens();
    startScreen.classList.add('active');
  }

  function showGameScreen() {
    hideAllScreens();
    gameScreen.classList.add('active');
    resetGameBoard(); // <-- Add this line
    startGame();
  }

  function showNameScreen() {
    hideAllScreens();
    nameScreen.classList.add('active');
    scoreTimeElement.textContent = currentTime;
  }

  function showEndScreen() {
    hideAllScreens();
    endScreen.classList.add('active');
    finalTimeElement.textContent = currentTime;
  }

  // Game Functions
  function startGame() {
    shuffleDeviceBlocks();
    matchedPairs = 0;
    resetSlots();
    resetCards();
    startTime = new Date();
    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    continueButtonContainer.style.display = 'none'; // Hide continue button on start
  }

  function updateTimer() {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
  }

  function setupDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const slots = document.querySelectorAll('.slot');
    cards.forEach(card => {
      card.addEventListener('dragstart', dragStart);
      card.addEventListener('dragend', dragEnd);
    });
    slots.forEach(slot => {
      slot.addEventListener('dragover', dragOver);
      slot.addEventListener('dragenter', dragEnter);
      slot.addEventListener('dragleave', dragLeave);
      slot.addEventListener('drop', drop);
    });
  }

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.device);
    setTimeout(() => {
      e.target.classList.add('dragging');
      e.target.classList.remove('pulse');
    }, 0);
  }

  function dragEnd(e) {
    e.target.classList.remove('dragging');
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
    const card = document.querySelector(`.card[data-device="${deviceType}"]`);
    // Only allow drop if slot is empty
    if (e.target.dataset.correct === deviceType && e.target.children.length === 0) {
      e.target.classList.add('correct');
      // Move the card DOM node into the slot
      card.style.margin = "0 auto";
      card.style.display = "flex";
      card.setAttribute('draggable', 'false');
      e.target.appendChild(card);
      // Optionally, disable pointer events on the card
      card.style.pointerEvents = "none";
      // After each drop, check if all slots are filled
      if (checkAllSlotsFilled()) {
        document.getElementById('continueButtonContainer').style.display = 'block';
      }
    } else {
      // Incorrect match
      startTime = new Date(startTime.getTime() - penaltySeconds * 1000);
      updateTimer();
      e.target.classList.add('shake');
      setTimeout(() => {
        e.target.classList.remove('shake');
      }, 500);
    }
  }

  function endGame() {
    clearInterval(timerInterval);
    const endTime = new Date();
    currentTime = Math.floor((endTime - startTime) / 1000);
    showNameScreen();
  }

  // Fetch leaderboard from backend and render
  async function loadLeaderboard() {
    const response = await fetch('http://127.0.0.1:8520/api/leaderboard');
    leaderboardEntries = await response.json();
    leaderboardEntries.sort((a, b) => a.time - b.time); // Sort by time ascending
    renderLeaderboard();
  }

  // Save score to backend and reload leaderboard
  async function saveScore() {
  const playerName = playerNameInput.value.trim() || 'Anonymous';
  const today = new Date().toISOString().split('T')[0];
  const entry = { name: playerName, time: currentTime, date: today };

  // Always use a relative URL for same-server requests
  const response = await fetch('http://127.0.0.1:8520/api/leaderboard', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(entry)
  });

  if (!response.ok) {
    alert("Failed to record score. Please try again.");
    return;
  }

  // Reload leaderboard from backend so you see the real data
  await loadLeaderboard();
  playerNameInput.value = '';
  showEndScreen();
}
  // Render leaderboard table
  function renderLeaderboard() {
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = '';
    leaderboardEntries.forEach((entry, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${idx + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.time}</td>
        <td>${entry.date}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Call loadLeaderboard() when the end screen is shown or on page load
  window.addEventListener('DOMContentLoaded', loadLeaderboard);

  // Add this function to check if all slots are filled
  function checkAllSlotsFilled() {
    const slots = document.querySelectorAll('.slot');
    return Array.from(slots).every(slot => slot.children.length > 0);
  }

  function resetSlots() {
    document.querySelectorAll('.slot').forEach(slot => {
      slot.classList.remove('correct', 'shake');
      // Remove all children (labels) from the slot
      while (slot.firstChild) {
        slot.removeChild(slot.firstChild);
      }
    });
  }

  function resetCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.style.display = 'flex';
      card.classList.add('pulse');
    });
  }

  const originalCardOrder = Array.from(document.querySelectorAll('.card')).map(card => card.id);

  function resetGameBoard() {
    const deviceContainer = document.getElementById('deviceContainer');
    const slots = document.querySelectorAll('.slot');
    const cards = document.querySelectorAll('.card');

    // Move all cards back to deviceContainer and restore properties
    cards.forEach(card => {
      deviceContainer.appendChild(card);
      card.style.display = 'flex';
      card.style.margin = '';
      card.setAttribute('draggable', 'true');
      card.style.pointerEvents = '';
      card.classList.remove('dragging', 'pulse');
    });

    // Clear all slots
    slots.forEach(slot => {
      slot.classList.remove('correct', 'highlight', 'shake');
      while (slot.firstChild) {
        slot.removeChild(slot.firstChild);
      }
    });

    // Hide the continue button if visible
    document.getElementById('continueButtonContainer').style.display = 'none';

    // Re-attach drag-and-drop listeners
    setupDragAndDrop();
  }

  function shuffleDeviceBlocks() {
    const container = document.getElementById('deviceContainer');
    const cards = Array.from(container.children);
    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // Remove all cards and re-append in shuffled order
    cards.forEach(card => container.appendChild(card));
  }

  // Initialize the game when the page loads
  window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>