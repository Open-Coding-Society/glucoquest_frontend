<!DOCTYPE html>
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
    
    /* Enhanced Header */
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
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    
    /* Medical-grade Body Outline */
    .body-outline {
      width: 220px;
      height: 440px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 220"><path d="M55 15 Q75 35 55 55 Q35 75 55 95 L55 155 Q35 175 55 195 Q75 175 55 155 L55 95 Q75 75 55 55 Q35 35 55 15 Z" fill="none" stroke="%230066cc" stroke-width="2" stroke-linecap="round"/></svg>');
      background-repeat: no-repeat;
      margin: 2rem auto;
      position: relative;
      filter: drop-shadow(0 4px 8px rgba(0,102,204,0.2));
    }
    
    /* Premium Card Design */
    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      cursor: grab;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: none;
      position: relative;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    
    .card:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--dexcom-blue);
      transition: width 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }
    
    .card:hover:before {
      width: 8px;
    }
    
    /* Slot Design */
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
    
    /* Professional Timer */
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
    
    /* Medical-grade Button */
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
      position: relative;
      overflow: hidden;
    }
    
    .btn:hover {
      background: var(--dexcom-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,102,204,0.4);
    }
    
    /* Game Board Layout */
    .game-board {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      gap: 2rem;
    }
    
    .slots {
      width: 48%;
      background: rgba(255,255,255,0.7);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(0,0,0,0.05);
    }
    
    .cards {
      width: 48%;
      display: flex;
      flex-direction: column;
    }
    
    /* Screens */
    .screen {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.08);
      max-width: 800px;
      margin: 2rem auto;
      text-align: center;
    }
    
    /* Leaderboard Table */
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
    
    /* Animations */
    @keyframes confetti {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
    }
    
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
    }
  </style>
</head>
<body>
  <div class="game-container">
    <!-- Start Screen -->
    <div class="screen" id="startScreen">
      <div class="game-header">
        <h1>Dexcom CGM Training</h1>
        <p>Master medical device placement through this interactive matching challenge</p>
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
    <div class="screen hidden" id="gameScreen">
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

    <!-- End Screen with Leaderboard -->
    <div class="screen hidden" id="endScreen">
      <div class="game-header">
        <h1>Training Complete!</h1>
        <div style="font-size: 1.2rem; color: var(--dexcom-blue); margin: 1rem 0 2rem;">
          Your time: <span id="finalTime" style="font-weight: 700;"></span> seconds
        </div>
      </div>
      
      <div class="body-outline"></div>
      
      <div style="margin: 2rem 0;">
        <h3 style="color: var(--dexcom-dark); margin-bottom: 1rem;">Leaderboard</h3>
        
        <table class="leaderboard" id="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- Sample data - will be replaced with real data when backend is connected -->
            <tr>
              <td>1</td>
              <td>You</td>
              <td id="currentPlayerTime">-</td>
              <td>Today</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Medical Expert</td>
              <td>32</td>
              <td>2023-10-15</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Nurse Sarah</td>
              <td>38</td>
              <td>2023-10-14</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Dr. Chen</td>
              <td>42</td>
              <td>2023-10-12</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Student</td>
              <td>56</td>
              <td>2023-10-10</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 2rem;">
        <button class="btn" id="restartButton" style="margin-right: 1rem;">Try Again</button>
        <button class="btn" id="newPlayerButton" style="background: white; color: var(--dexcom-blue); border: 2px solid var(--dexcom-blue);">New Player</button>
      </div>
    </div>

    <!-- Name Input Screen -->
    <div class="screen hidden" id="nameScreen">
      <div class="game-header">
        <h1>Record Your Score</h1>
      </div>
      
      <div style="max-width: 500px; margin: 0 auto;">
        <p style="color: #34495e; margin-bottom: 2rem; font-size: 1.1rem;">
          You completed the training in <span id="scoreTime" style="font-weight: 600;"></span> seconds!
          Enter your name to save your score to the leaderboard.
        </p>
        
        <div style="margin-bottom: 1.5rem;">
          <input type="text" id="playerName" placeholder="Your name or initials" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <button class="btn" id="saveScoreButton">Save Score</button>
      </div>
    </div>
  </div>

  <script>
    // Game elements
    const startScreen = document.getElementById('startScreen');
    const gameScreen = document.getElementById('gameScreen');
    const endScreen = document.getElementById('endScreen');
    const nameScreen = document.getElementById('nameScreen');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const newPlayerButton = document.getElementById('newPlayerButton');
    const saveScoreButton = document.getElementById('saveScoreButton');
    const timerElement = document.getElementById('timer');
    const finalTimeElement = document.getElementById('finalTime');
    const scoreTimeElement = document.getElementById('scoreTime');
    const currentPlayerTimeElement = document.getElementById('currentPlayerTime');
    const playerNameInput = document.getElementById('playerName');
    const leaderboard = document.getElementById('leaderboard');

    // Game variables
    let startTime;
    let timerInterval;
    let matchedPairs = 0;
    const totalPairs = 4;
    const penaltySeconds = 5;
    let currentTime = 0;

    // Start game
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    newPlayerButton.addEventListener('click', () => {
      endScreen.classList.add('hidden');
      startScreen.classList.remove('hidden');
    });
    saveScoreButton.addEventListener('click', saveScore);

    function startGame() {
      // Reset game state
      matchedPairs = 0;
      
      // Show game screen
      startScreen.classList.add('hidden');
      endScreen.classList.add('hidden');
      nameScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      
      // Reset all slots
      document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('correct', 'shake');
        slot.innerHTML = '';
      });
      
      // Reset all cards
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'flex';
        card.classList.add('pulse');
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
      const card = document.querySelector(`.card[data-device="${deviceType}"]:not(.dragging)`);
      
      if (e.target.dataset.correct === deviceType) {
        // Correct match
        e.target.classList.add('correct');
        e.target.innerHTML = card.innerHTML;
        card.style.display = 'none';
        card.classList.remove('pulse');
        matchedPairs++;
        
        // Visual feedback
        e.target.style.animation = 'none';
        e.target.offsetHeight; // Trigger reflow
        e.target.style.animation = 'pulse 0.5s';
        
        if (matchedPairs === totalPairs) {
          endGame();
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
      
      // Calculate final time
      const endTime = new Date();
      currentTime = Math.floor((endTime - startTime) / 1000);
      
      // Show name input screen
      gameScreen.classList.add('hidden');
      nameScreen.classList.remove('hidden');
      scoreTimeElement.textContent = currentTime;
    }

    function saveScore() {
      const playerName = playerNameInput.value.trim() || 'Anonymous';
      
      // In a real app, you would send this to your backend:
      // Example: await fetch('/api/scores', { method: 'POST', body: JSON.stringify({ name: playerName, time: currentTime }) });
      
      // For now, we'll just update the UI
      finalTimeElement.textContent = currentTime;
      currentPlayerTimeElement.textContent = currentTime;
      
      // Update the leaderboard's first row with the new score
      const firstRow = leaderboard.querySelector('tbody tr:first-child');
      if (firstRow) {
        firstRow.cells[1].textContent = playerName;
        firstRow.cells[2].textContent = currentTime;
        const today = new Date();
        firstRow.cells[3].textContent = today.toISOString().split('T')[0];
      }
      
      // Show end screen with leaderboard
      nameScreen.classList.add('hidden');
      endScreen.classList.remove('hidden');
      
      // Clear the name input for next time
      playerNameInput.value = '';
    }

    // Confetti effect for celebration (would activate on perfect score)
    function createConfetti() {
      const colors = ['#0066cc', '#27ae60', '#f1c40f', '#e74c3c', '#9b59b6'];
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.opacity = '1';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    }
  </script>
</body>
</html>