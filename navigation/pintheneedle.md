---
layout: post
title: Dexcom Sensor Simulator
permalink: /test2/
comment: true
---
<link href='https://fonts.googleapis.com/css?family=Oxygen Mono' rel='stylesheet'>
<style>
  .container {
    font-family: 'Oxygen Mono';
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1e1e1e;
    color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
  .step-indicator {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    counter-reset: step;
  }
  .step {
    flex: 1;
    text-align: center;
    position: relative;
    counter-increment: step;
    font-size: 14px;
    color: #e2e8f0;
  }
  .step::before {
    content: counter(step);
    width: 35px;
    height: 35px;
    background: #3a3a3a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    font-size: 16px;
    transition: all 0.3s;
  }
  .step.active::before {
    background: #3b82f6;
    color: white;
    transform: scale(1.1);
  }
  .step.completed::before {
    background: #10b981;
    color: white;
  }
  /* Enhanced Arm Area */
  .dexcom-arm-area {
    position: relative;
    height: 450px;
    width: 90%;
    max-width: 500px;
    margin: 0 auto 30px;
    background-color: #3a3a3a;
    border-radius: 20px;
    overflow: hidden;
    border: 3px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arm-image {
    width: 320px;      /* Set this to your original arm image's width */
    height: 240px;     /* Set this to your original arm image's height */
    object-fit: contain;
    display: block;
    margin: 0 auto;
    transition: filter 0.2s, transform 0.2s;
  }
  .target-zone {
    position: absolute;
    width: 100px;
    height: 150px;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 3px dashed rgba(58, 134, 255, 0.7);
    border-radius: 15px;
    pointer-events: none;
    box-shadow: 0 0 20px rgba(58, 134, 255, 0.5);
  }
/* Enhanced Equipment Panel */
.equipment-panel {
  background: #2c2c2c;
  border-radius: 15px;
  padding: 15px;
  margin: 0 auto 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.equipment-items {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
.equipment-icon {
  width: 70px;
  height: 70px;
  cursor: grab;
  transition: transform 0.2s;
}
.equipment-icon:hover {
  transform: scale(1.1);
}
.equipment-icon.dragging {
  opacity: 0.6;
  transform: scale(0.9);
}
  .equipment-item:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }
  .equipment-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    object-fit: contain;
  }
  .equipment-label {
    font-size: 14px;
    text-align: center;
    color: #e2e8f0;
  }
  /* Enhanced Stickers */
  .sticker {
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 10;
    transition: transform 0.3s;
  }
  .alcohol-wipe-sticker {
    width: 80px;
    height: 80px;
  }
  .cotton-tip-sticker {
    width: 70px;
    height: 70px;
  }
  .dexcom-sensor-sticker {
    width: 100px;
    height: 100px;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  /* Status indicators */
  .status-normal { color: #10b981; }
  .status-high { color: #f59e0b; }
  .status-low { color: #ef4444; }
  .glucose-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #3b82f6;
    margin: 10px 0;
  }
  .records-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;
    background: #2c2c2c;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
  .records-table th {
    background: #3a3a3a;
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #4a5568;
    font-weight: 600;
  }
  .records-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #4a5568;
  }
  /* Feedback Styles */
  .feedback {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    z-index: 1000;
    display: none;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .feedback-success {
    background-color: #10b981;
  }
  .feedback-error {
    background-color: #ef4444;
    animation: shake 0.5s;
  }
  .simulator-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #3a3a3a;
}
  .simulator-tab {
    padding: 10px 20px;
    cursor: pointer;
    background: #2c2c2c;
    border: 1px solid #3a3a3a;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
    color: #e2e8f0;
  }
  .simulator-tab.active {
    background: #3a3a3a;
    border-color: #3b82f6;
    color: #3b82f6;
  }
  .simulator-content { display: none; }
  .simulator-content.active { display: block; }
  .about-bar {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: #e2e8f0;
  }
  .about-bar h2 { color: #3b82f6; margin-bottom: 15px; }
  .about-bar p { margin-bottom: 10px; line-height: 1.6; }
  .about-bar ul { margin-left: 1.5em; }
</style>

<div class="simulator-tabs">
    <div class="simulator-tab active" data-tab="about">About</div>
    <div class="simulator-tab" data-tab="dexcom-sensor">Dexcom Sensor Application</div>
  </div>
  <div class="simulator-content active" id="about">
  <div class="about-bar">
    <h2>Engaging Introduction to the Dexcom Sensor Simulator Game</h2>
    <p><strong>Learning Made Interactive – No Manual Required!</strong></p>
    <p>Mastering new medical devices like the <strong>Dexcom Continuous Glucose Monitoring (CGM) System</strong> can feel overwhelming—especially when faced with lengthy manuals or complex instructions. That’s why we’ve created this <strong>interactive simulator game</strong>—a hands-on, stress-free way to learn how to use the Dexcom sensor correctly and confidently!</p>
    <h3>Why This Simulator?</h3>
    <ul>
      <li><strong>Learn by Doing</strong>: Forget passive reading—practice applying the sensor step-by-step in a <strong>risk-free virtual environment</strong>.</li>
      <li><strong>Memorable & Fun</strong>: Games enhance retention! By simulating real-world scenarios, you’ll internalize the process more effectively than with text alone.</li>
      <li><strong>Build Confidence</strong>: Repeat the steps until they feel natural, ensuring you’re prepared for real-life application.</li>
      <li><strong>For Everyone</strong>: Whether you’re a patient, caregiver, or healthcare professional, this tool simplifies the learning curve.</li>
    </ul>
  </div>
</div>

<div class="container">
  <div class="simulator-content" id="dexcom-sensor">
  <div class="step-indicator">
    <div class="step active" id="step1">Prepare</div>
    <div class="step" id="step2">Clean</div>
    <div class="step" id="step3">Apply Sensor</div>
    <div class="step" id="step4">Insert Needle</div>
    <div class="step" id="step5">Complete</div>
  </div>

  <div class="instructions">
    <h3>Proper Skin Preparation Steps:</h3>
    <div class="instruction-step">Wash the area with warm water and soap, then dry thoroughly.</div>
    <div class="instruction-step">Use an alcohol wipe to clean the application site and let it dry completely.</div>
    <div class="instruction-step">Optional: Apply skin barrier film (like Skin Tac) if needed.</div>
    <div class="instruction-step">Shave any hair if necessary for better adhesion.</div>
    <div class="instruction-step">Optional: Warm the skin slightly in cold environments.</div>
  </div>

  <!-- Enhanced Equipment Panel -->
  <div class="equipment-panel">
    <h3>Equipment</h3>
    <div class="equipment-items">
      <img src="{{site.baseurl}}/images/needlepin/wipes.png" class="equipment-icon" draggable="true" data-type="alcohol-wipe" data-sound="wipe">
      <img src="{{site.baseurl}}/images/needlepin/cotton-tip.png" class="equipment-icon" draggable="true" data-type="cotton-tip" data-sound="cotton">
      <img src="{{site.baseurl}}/images/needlepin/dexcom.png" class="equipment-icon" draggable="true" data-type="dexcom-sensor" data-sound="sensor">
    </div>
</div>

  <!-- Enhanced Arm Area -->
  <div class="dexcom-arm-area" id="dexcom-arm-area">
    <img class="arm-image" src="{{site.baseurl}}/images/needlepin/arm.png" alt="Arm" />
    <div class="target-zone"></div>
  </div>

  <div class="glucose-display" id="dexcom-glucose-display" style="display: none;">
    <h3>Current Glucose Reading</h3>
    <div class="glucose-value" id="dexcom-glucose-value">--</div>
    <div id="dexcom-glucose-status">Sensor warming up...</div>
    <div id="dexcom-glucose-trend" style="margin-top: 10px;"></div>
  </div>

  <table class="records-table" id="dexcom-data-table">
    <thead>
      <tr>
        <th>Time</th>
        <th>Glucose</th>
        <th>Status</th>
        <th>Trend</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data will be inserted here -->
    </tbody>
  </table>
</div>
</div>

<script>
document.querySelectorAll('.simulator-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.simulator-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.simulator-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
  });
});
</script>

<script type="module">
  // Audio elements for sound effects
  const soundEffects = {
    wipe: new Audio('{{site.baseurl}}/sounds/wipe.mp3'),
    cotton: new Audio('{{site.baseurl}}/sounds/cotton.mp3'),
    sensor: new Audio('{{site.baseurl}}/sounds/sensor.mp3'),
    success: new Audio('{{site.baseurl}}/sounds/success.mp3'),
    error: new Audio('{{site.baseurl}}/sounds/error.mp3')
  };

  // Preload sounds
  Object.values(soundEffects).forEach(sound => {
    sound.load();
    sound.volume = 0.6;
  });

  const dexcomArmArea = document.getElementById('dexcom-arm-area');
  const dexcomSteps = document.querySelectorAll('.step');
  const dexcomGlucoseDisplay = document.getElementById('dexcom-glucose-display');
  const dexcomGlucoseValue = document.getElementById('dexcom-glucose-value');
  const dexcomGlucoseStatus = document.getElementById('dexcom-glucose-status');
  const dexcomGlucoseTrend = document.getElementById('dexcom-glucose-trend');
  const dexcomDataTable = document.getElementById('dexcom-data-table').querySelector('tbody');
  const armImage = document.querySelector('.arm-image');
  
  let currentStep = 1;
  let dexcomGlucoseReadings = [];
  
  // Initialize drag and drop for Dexcom simulator
  document.querySelectorAll('.equipment-icon').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('type', item.dataset.type);
      e.dataTransfer.setData('sound', item.dataset.sound);
      item.classList.add('dragging');
      item.style.transform = 'scale(0.95)';
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      item.style.transform = '';
    });
  });

  dexcomArmArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    dexcomArmArea.style.borderColor = '#3b82f6';
    dexcomArmArea.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
  });

  dexcomArmArea.addEventListener('dragleave', () => {
    dexcomArmArea.style.borderColor = '#ffffff';
    dexcomArmArea.style.boxShadow = 'none';
  });

  dexcomArmArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dexcomArmArea.style.borderColor = '#ffffff';
    dexcomArmArea.style.boxShadow = 'none';
    
    const type = e.dataTransfer.getData('type');
    const soundType = e.dataTransfer.getData('sound');
    const rect = dexcomArmArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if dropped in target zone
    const targetZone = document.querySelector('.target-zone');
    const targetRect = targetZone.getBoundingClientRect();
    const isInTarget = x > targetRect.left - rect.left && 
                      x < targetRect.right - rect.left && 
                      y > targetRect.top - rect.top && 
                      y < targetRect.bottom - rect.top;
    
    if (!isInTarget) {
      showFeedback('Please drop in the highlighted target zone', 'error');
      soundEffects.error.play();
      return;
    }
    
    // Play corresponding sound effect
    if (soundEffects[soundType]) {
      soundEffects[soundType].currentTime = 0;
      soundEffects[soundType].play();
    }
    
    switch(currentStep) {
      case 1:
        if (type === 'alcohol-wipe') {
          applySticker('alcohol-wipe', x, y);
          updateDexcomStep(2);
        }
        break;
      case 2:
        if (type === 'cotton-tip') {
          applySticker('cotton-tip', x, y);
          updateDexcomStep(3);
        }
        break;
      case 3:
        if (type === 'dexcom-sensor') {
          applySticker('dexcom-sensor', x, y);
          completeDexcomApplication(x, y);
          updateDexcomStep(4);
          soundEffects.success.play();
        }
        break;
      default:
        showFeedback('Please complete the current step first', 'error');
        soundEffects.error.play();
    }
  });

  function applySticker(type, x, y) {
    // Remove any existing sticker of this type
    document.querySelectorAll(`.${type}-sticker`).forEach(el => el.remove());
    
    const sticker = document.createElement('div');
    sticker.className = `sticker ${type}-sticker`;
    
    // Position adjustments based on type
    let posX = x;
    let posY = y;
    
    switch(type) {
      case 'alcohol-wipe':
        posX -= 40;
        posY -= 40;
        break;
      case 'cotton-tip':
        posX -= 35;
        posY -= 35;
        break;
      case 'dexcom-sensor':
        posX -= 50;
        posY -= 50;
        break;
    }
    
    sticker.style.left = `${posX}px`;
    sticker.style.top = `${posY}px`;
    
    // Add pulsing animation when placed
    sticker.style.animation = 'pulse 0.5s ease-in-out';
    
    dexcomArmArea.appendChild(sticker);
    
    // Remove animation after it completes
    setTimeout(() => {
      sticker.style.animation = '';
    }, 500);
  }

  function completeDexcomApplication(x, y) {
    // Show needle insertion
    const needle = document.createElement('div');
    needle.className = 'sticker';
    needle.style.left = `${x - 2}px`;
    needle.style.top = `${y}px`;
    needle.style.width = '4px';
    needle.style.height = '20px';
    needle.style.background = '#e63946';
    needle.style.borderRadius = '2px';
    dexcomArmArea.appendChild(needle);
    
    showFeedback('Sensor application complete! Starting warm-up...', 'success');
    
    // Simulate warm-up period
    setTimeout(() => {
      updateDexcomStep(5);
      dexcomGlucoseDisplay.style.display = 'block';
      startDexcomGlucoseMonitoring();
    }, 3000);
  }

  function startDexcomGlucoseMonitoring() {
    // Generate initial reading
    updateDexcomGlucoseReading();
    
    // Update every 30 seconds (simulated)
    setInterval(updateDexcomGlucoseReading, 30000);
  }

  function updateDexcomGlucoseReading() {
    const glucose = generateGlucoseReading();
    const status = getGlucoseStatus(glucose);
    const trend = getGlucoseTrend();
    
    // Update display
    dexcomGlucoseValue.textContent = glucose;
    dexcomGlucoseStatus.textContent = status;
    dexcomGlucoseStatus.className = `status-${status.toLowerCase()}`;
    dexcomGlucoseTrend.textContent = `Trend: ${trend}`;
    
    // Add to records
    const reading = {
      time: new Date().toLocaleTimeString(),
      glucose: glucose,
      status: status,
      trend: trend
    };
    
    dexcomGlucoseReadings.unshift(reading);
    updateDexcomDataTable();
  }

  function getGlucoseTrend() {
    const trends = ['↑↑ Rapidly Rising', '↑ Rising', '→ Steady', '↓ Falling', '↓↓ Rapidly Falling'];
    return trends[Math.floor(Math.random() * trends.length)];
  }

  function updateDexcomDataTable() {
    dexcomDataTable.innerHTML = '';
    
    dexcomGlucoseReadings.slice(0, 10).forEach(reading => {
      const row = dexcomDataTable.insertRow();
      row.innerHTML = `
        <td>${reading.time}</td>
        <td>${reading.glucose} mmol/L</td>
        <td class="status-${reading.status.toLowerCase()}">${reading.status}</td>
        <td>${reading.trend}</td>
      `;
    });
  }

  function updateDexcomStep(step) {
    dexcomSteps[currentStep-1].classList.remove('active');
    dexcomSteps[currentStep-1].classList.add('completed');

    currentStep = step;
    dexcomSteps[currentStep-1].classList.add('active');

    // Switch arm image based on step
    if (currentStep === 2) {
      armImage.src = "{{site.baseurl}}/images/needlepin/arm2.png";
    } else if (currentStep === 3) {
      armImage.src = "{{site.baseurl}}/images/needlepin/arm3.png";
    } else if (currentStep === 1) {
      armImage.src = "{{site.baseurl}}/images/needlepin/arm.png";
    }
  }

  function generateGlucoseReading() {
    if (Math.random() < 0.7) {
      return (4 + Math.random() * 3.8).toFixed(1);
    } else {
      return Math.random() < 0.5 
        ? (2 + Math.random() * 2).toFixed(1)
        : (7.8 + Math.random() * 5).toFixed(1);
    }
  }

  function getGlucoseStatus(glucose) {
    glucose = parseFloat(glucose);
    if (glucose < 4) return 'Low';
    if (glucose > 7.8) return 'High';
    return 'Normal';
  }

  function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.className = `feedback feedback-${type}`;
    document.body.appendChild(feedback);
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.remove();
    }, 3000);
  }
</script>