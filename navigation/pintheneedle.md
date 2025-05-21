---
layout: post
title: Diabetes Simulator
permalink: /needle/
comment: true
---
<link href='https://fonts.googleapis.com/css?family=Oxygen Mono' rel='stylesheet'>
<style>
  /* 原有样式保持不变 */
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
  
  /* 新增样式 - Dexcom 模拟器部分 */
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
  }
  
  .simulator-tab.active {
    background: #3a3a3a;
    border-color: #3b82f6;
    color: #3b82f6;
  }
  
  .simulator-content {
    display: none;
  }
  
  .simulator-content.active {
    display: block;
  }
  
  /* Dexcom 模拟器特定样式 */
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
    width: 28px;
    height: 28px;
    background: #3a3a3a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    font-size: 14px;
  }
  
  .step.active::before {
    background: #3b82f6;
    color: white;
  }
  
  .step.completed::before {
    background: #10b981;
    color: white;
  }

  .dexcom-arm-area {
    position: relative;
    height: 400px;
    background-color: #3a3a3a;
    margin-bottom: 30px;
    border-radius: 15px;
    overflow: hidden;
    border: 2px solid #ffffff;
  }

  .target-zone {
    position: absolute;
    width: 80px;
    height: 120px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px dashed rgba(58, 134, 255, 0.7);
    border-radius: 10px;
    pointer-events: none;
  }

  .equipment-panel {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .equipment-items {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .equipment-item {
    padding: 10px 15px;
    background: #3a3a3a;
    border-radius: 8px;
    cursor: grab;
    border: 2px dashed #4a5568;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    color: white;
  }

  .equipment-item:hover {
    background: #4a5568;
  }

  .equipment-item.dragging {
    opacity: 0.6;
    background: #4a5568;
  }

  .equipment-icon {
    width: 20px;
    height: 20px;
    stroke: white;
  }

  .sticker {
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 10;
  }

  .instructions {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .instruction-step {
    margin-bottom: 15px;
    padding-left: 25px;
    position: relative;
    color: #e2e8f0;
  }

  .instruction-step::before {
    content: "•";
    position: absolute;
    left: 10px;
    color: #3b82f6;
    font-weight: bold;
  }

  /* 原有样式保持不变 */
  .game-section {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  
  .game-panel {
    flex: 1;
    background: #2c2c2c;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
  
  .arm-simulator {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #3a3a3a;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    touch-action: none;
    border: 2px solid #ffffff;
  }
  
  .vein-target {
    position: absolute;
    width: 15px;
    height: 80px;
    background-color: #3a86ff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(58, 134, 255, 0.6);
  }
  
  .needle {
    position: absolute;
    width: 20px;
    height: 100px;
    background: linear-gradient(to bottom, #e63946, #ff758f);
    cursor: grab;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0 0 8px 8px;
    z-index: 10;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
    touch-action: none;
  }
  
  .game-result {
    text-align: center;
    margin: 20px 0;
    color: #ffffff;
  }
  
  .glucose-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #3b82f6;
    margin: 10px 0;
  }
  
  .status-normal { color: #10b981; }
  .status-high { color: #f59e0b; }
  .status-low { color: #ef4444; }
  
  .record-form {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 30px;
    color: #ffffff;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #4a5568;
    border-radius: 6px;
    font-size: 14px;
    background-color: #3a3a3a;
    color: #ffffff;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #3b82f6;
    color: white;
    border: none;
  }
  
  .btn-outline {
    background: #2c2c2c;
    border: 1px solid #e2e8f0;
    color: #ffffff;
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
  
  .table-actions {
    display: flex;
    gap: 8px;
  }
  
  .action-btn {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    border: none;
  }
  
  .edit-btn {
    background: #e0f2fe;
    color: #0369a1;
  }
  
  .delete-btn {
    background: #fee2e2;
    color: #b91c1c;
  }
  
  .feedback {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    z-index: 1000;
    display: none;
  }
  
  .feedback-success {
    background-color: #10b981;
  }
  
  .feedback-error {
    background-color: #ef4444;
  }
</style>

<div class="container">
  <h1>Diabetes Management Simulator</h1>
  
  <!-- 新增标签导航 -->
  <div class="simulator-tabs">
    <div class="simulator-tab" data-tab="introduction">Introduction</div>
    <div class="simulator-tab" data-tab="dexcom-sensor">Dexcom Sensor Application</div>
    <div class="simulator-tab active" data-tab="blood-test">Blood Glucose Test</div>
  </div>
  
  <!-- Introduction 内容 -->
  <div class="simulator-content active" id="introduction">
    <div class="introduction-bar">
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
   <!-- Dexcom 传感器模拟器 (新增内容) -->
  <div class="simulator-content" id="dexcom-sensor">
    <h2>Dexcom Sensor Application Simulator</h2>
    
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

  <div class="equipment-panel">
  <h3>Equipment</h3>
  <div class="equipment-items">
    <div class="equipment-item" draggable="true" data-type="alcohol-wipe">
      <img src="{{site.baseurl}}/images/needlepin/wipes.png" class="equipment-icon" alt="Alcohol Wipe">
      Alcohol Wipe
    </div>
    <div class="equipment-item" draggable="true" data-type="sensor">
      <img src="{{site.baseurl}}/images/needlepin/cotton-tip.png" class="equipment-icon" alt="Cotton Tip">
      Cotton Tip
    </div>
    <div class="equipment-item" draggable="true" data-type="applicator">
      <img src="{{site.baseurl}}/images/needlepin/dexcom.png" class="equipment-icon" alt="Dexcom Sensor">
      Dexcom Sensor
    </div>
  </div>
</div>

<div class="dexcom-arm-area" id="dexcom-arm-area">
        <img src="{{site.baseurl}}/images/needlepin/arm.png" class="arm-image" alt="Arm">
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

  <!-- 血糖测试模拟器 (原有内容) -->
  <div class="simulator-content active" id="blood-test">
    <div class="game-section">
      <div class="game-panel">
        <h2>Glucose Monitoring Game</h2>
        <p>Practice proper needle insertion technique</p>
        
  <div class="arm-simulator" id="arm-simulator">
          <div class="vein-target"></div>
          <div class="needle" id="needle"></div>
        </div>
        
  <div class="game-result">
          <h3>CURRENT READING</h3>
          <div class="glucose-value" id="glucose-value">--</div>
          <div id="glucose-status">Insert needle to measure</div>
          <div id="feedback" style="display: none; margin-top: 10px; padding: 8px; border-radius: 4px;"></div>
        </div>
      </div>
      
  <div class="game-panel">
        <h2>Manual Record</h2>
        <p>Enter your glucose measurements manually</p>
        
  <form id="glucose-form" class="record-form">
          <input type="hidden" id="record-id" value="">
          
  <div class="form-grid">
            <div class="form-group">
              <label for="manual-glucose">Glucose Value (mmol/L)</label>
              <input type="number" step="0.1" class="form-control" id="manual-glucose" required min="1" max="30">
            </div>
            
  <div class="form-group">
              <label for="manual-time">Measurement Time</label>
              <input type="datetime-local" class="form-control" id="manual-time" required>
            </div>
          </div>
          
  <div class="form-group">
            <label for="manual-notes">Notes</label>
            <textarea class="form-control" id="manual-notes" rows="2"></textarea>
          </div>
          
  <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="save-btn">Save Record</button>
            <button type="button" class="btn btn-outline" id="clear-btn">Clear Form</button>
          </div>
        </form>
        
<h3>Your Records</h3>
        <table class="records-table" id="records-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Value</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Records will be added here dynamically -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

<script type="module">
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    const API_BASE_URL = pythonURI + '/glucose';

    // ==================== 标签切换逻辑 ====================
    document.querySelectorAll('.simulator-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // 更新标签状态
        document.querySelectorAll('.simulator-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 更新内容显示
        const tabId = tab.dataset.tab;
        document.querySelectorAll('.simulator-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
      });
    });

    // ==================== 血糖测试游戏逻辑 ====================
    const needle = document.getElementById('needle');
    const vein = document.querySelector('.vein-target');
    const armSimulator = document.getElementById('arm-simulator');
    const feedback = document.getElementById('feedback');
    const glucoseValue = document.getElementById('glucose-value');
    const glucoseStatus = document.getElementById('glucose-status');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    needle.addEventListener('mousedown', startDrag);
    needle.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        const rect = needle.getBoundingClientRect();
        
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        } else if (e.type === 'touchstart') {
            e.preventDefault();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
        
        needle.style.cursor = 'grabbing';
        needle.style.opacity = '0.8';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const armRect = armSimulator.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        let newLeft = clientX - armRect.left - offsetX;
        let newTop = clientY - armRect.top - offsetY;
        
        newLeft = Math.max(0, Math.min(newLeft, armRect.width - needle.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, armRect.height - needle.offsetHeight));
        
        needle.style.left = `${newLeft}px`;
        needle.style.top = `${newTop}px`;
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        needle.style.cursor = 'grab';
        needle.style.opacity = '1';
        
        if (isColliding(needle.getBoundingClientRect(), vein.getBoundingClientRect())) {
            handleSuccess();
        } else {
            handleError();
        }
    }
    
    function isColliding(rect1, rect2) {
        const center1 = {
            x: rect1.left + rect1.width / 2,
            y: rect1.top + rect1.height / 2
        };
        
        const center2 = {
            x: rect2.left + rect2.width / 2,
            y: rect2.top + rect2.height / 2
        };
        
        return (
            Math.abs(center1.x - center2.x) < rect2.width / 2 &&
            Math.abs(center1.y - center2.y) < rect2.height / 2
        );
    }
    
    function handleSuccess() {
        const glucose = generateGlucoseReading();
        const status = getGlucoseStatus(glucose);
        
        glucoseValue.textContent = `${glucose} mmol/L`;
        glucoseStatus.textContent = status;
        glucoseStatus.className = `status-${status.toLowerCase()}`;
        
        showFeedback('Measurement successful!', 'success');
    }
    
    function handleError() {
        showFeedback('Please aim for the blue vein area', 'error');
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

    // ==================== Dexcom 传感器模拟器逻辑 ====================
    const dexcomArmArea = document.getElementById('dexcom-arm-area');
    const dexcomSteps = document.querySelectorAll('.step');
    const dexcomGlucoseDisplay = document.getElementById('dexcom-glucose-display');
    const dexcomGlucoseValue = document.getElementById('dexcom-glucose-value');
    const dexcomGlucoseStatus = document.getElementById('dexcom-glucose-status');
    const dexcomGlucoseTrend = document.getElementById('dexcom-glucose-trend');
    const dexcomDataTable = document.getElementById('dexcom-data-table').querySelector('tbody');
    
    let currentStep = 1;
    let dexcomGlucoseReadings = [];
    
    // Initialize drag and drop for Dexcom simulator
    document.querySelectorAll('.equipment-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', item.dataset.type);
        item.classList.add('dragging');
      });
      
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    dexcomArmArea.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    dexcomArmArea.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('type');
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
        showFeedback('Please drop in the target zone', 'error');
        return;
      }
      
      switch(currentStep) {
        case 1:
          if (type === 'alcohol-wipe') {
            applySticker('alcohol-wipe', x, y);
            updateDexcomStep(2);
          }
          break;
        case 2:
          if (type === 'sensor') {
            applySticker('sensor', x, y);
            updateDexcomStep(3);
          }
          break;
        case 3:
          if (type === 'applicator') {
            applySticker('applicator', x, y);
            completeDexcomApplication(x, y);
            updateDexcomStep(4);
          }
          break;
        default:
          showFeedback('Please complete the current step first', 'error');
      }
    });

    function applySticker(type, x, y) {
      // Remove any existing sticker of this type
      document.querySelectorAll(`.${type}-sticker`).forEach(el => el.remove());
      
      const sticker = document.createElement('div');
      sticker.className = `sticker ${type}-sticker`;
      sticker.style.left = `${x - (type === 'applicator' ? 20 : 30)}px`;
      sticker.style.top = `${y - (type === 'applicator' ? 40 : 30)}px`;
      dexcomArmArea.appendChild(sticker);
      
      showFeedback(`${type.replace('-', ' ')} applied successfully!`, 'success');
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
    }

    // ==================== 通用函数 ====================
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

    // ==================== CRUD 操作 ====================
    window.fetchGlucoseRecords = async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch records: ' + response.statusText);
            }
            
            const records = await response.json();
            displayRecords(records);
        } catch (error) {
            console.error('Error fetching records:', error);
            showFeedback('Error fetching records.', 'error');
        }
    }

    window.createGlucoseRecord = async function(recordData) {
        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'POST',
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify(recordData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to create record: ' + response.statusText);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    window.updateGlucoseRecord = async function(id, recordData) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify(recordData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update record: ' + response.statusText);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    }

    window.deleteGlucoseRecord = async function(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete record: ' + response.statusText);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }

    // ==================== UI 操作 ====================
    let currentEditId = null;
    const form = document.getElementById('glucose-form');
    const recordIdInput = document.getElementById('record-id');
    const glucoseInput = document.getElementById('manual-glucose');
    const timeInput = document.getElementById('manual-time');
    const notesInput = document.getElementById('manual-notes');
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const recordsTable = document.getElementById('records-table').querySelector('tbody');

    // 初始化
    window.fetchGlucoseRecords();
    timeInput.value = new Date().toISOString().slice(0, 16);

    // 显示记录
    function displayRecords(records) {
        recordsTable.innerHTML = '';
        
        const sortedRecords = [...records].sort((a, b) => new Date(b.time) - new Date(a.time));
        
        sortedRecords.forEach(record => {
            const row = recordsTable.insertRow();
            
            row.innerHTML = `
                <td>${record.id.slice(-4)}</td>
                <td>${record.value} mmol/L</td>
                <td>${formatDateTime(record.time)}</td>
                <td><span class="status-${record.status.toLowerCase()}">${record.status}</span></td>
                <td>${record.notes || '-'}</td>
                <td class="table-actions">
                    <button class="action-btn edit-btn" data-id="${record.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${record.id}">Delete</button>
                </td>
            `;
        });
        
        // 添加事件监听器
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editRecordHandler(btn.dataset.id));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteRecordHandler(btn.dataset.id));
        });
    }

    // 格式化日期时间
    function formatDateTime(datetimeStr) {
        if (!datetimeStr) return '-';
        const dt = new Date(datetimeStr);
        return dt.toLocaleString();
    }

    // 编辑记录处理
    async function editRecordHandler(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch record');
            }
            
            const record = await response.json();
            
            currentEditId = record.id;
            recordIdInput.value = record.id;
            glucoseInput.value = record.value;
            timeInput.value = record.time.slice(0, 16);
            notesInput.value = record.notes || '';
            saveBtn.textContent = 'Update Record';
            
            form.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error fetching record:', error);
            showFeedback('Failed to load record for editing.', 'error');
        }
    }

    // 删除记录处理
    async function deleteRecordHandler(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            try {
                await window.deleteGlucoseRecord(id);
                await window.fetchGlucoseRecords();
            } catch (error) {
                console.error('Error deleting record:', error);
                showFeedback('Failed to delete record.', 'error');
            }
        }
    }

    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const recordData = {
            value: parseFloat(glucoseInput.value),
            time: timeInput.value,
            notes: notesInput.value
        };
        
        try {
            if (currentEditId) {
                await window.updateGlucoseRecord(currentEditId, recordData);
            } else {
                await window.createGlucoseRecord(recordData);
            }
            await window.fetchGlucoseRecords();
            resetForm();
        } catch (error) {
            console.error('Error saving record:', error);
            showFeedback('Failed to save record. Please try again.', 'error');
        }
    });

    // 清除表单
    function resetForm() {
        currentEditId = null;
        form.reset();
        saveBtn.textContent = 'Save Record';
        timeInput.value = new Date().toISOString().slice(0, 16);
    }

    clearBtn.addEventListener('click', resetForm);
</script>
