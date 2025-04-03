---
layout: post
title: Pin the Needle
permalink: /needle/
comment: true
---
<style>
  /* 调整容器背景和文字颜色 */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1e1e1e; /* 深色背景 */
    color: #ffffff; /* 白色文字 */
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
  
    .game-section {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
    flex-wrap: wrap; /* 让内容在小屏幕上自动换行 */
  }
  
    .game-panel {
    flex: 1;
    background: #2c2c2c; /* 深灰色背景 */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    color: #ffffff; /* 白色文字 */
  }
  
    .arm-simulator {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #3a3a3a; /* 更深的灰色背景 */
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    touch-action: none; /* 改进移动设备支持 */
    border: 2px solid #ffffff; /* 白色边框 */
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
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: transform 0.1s;
    touch-action: none; /* 改进移动设备支持 */
  }
  
  .game-result {
    text-align: center;
    margin: 20px 0;
    color: #ffffff; /* 白色文字 */
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
  
  /* style of the form */
  .record-form {
    background: #2c2c2c; /* 深灰色背景 */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 30px;
    color: #ffffff; /* 白色文字 */
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
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    background-color: #3a3a3a; /* 深灰色背景 */
    color: #ffffff; /* 白色文字 */
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
  
  /* style of recording form */
  .records-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;
    background: #2c2c2c; /* 深灰色背景 */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    color: #ffffff; /* 白色文字 */
  }
  
  .records-table th {
    background: #3a3a3a; /* 更深的灰色背景 */
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    font-weight: 600;
  }
  
  .records-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #f1f5f9;
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
  
  /* feedback messages */
  .feedback-success {
    background-color: #ecfdf5 !important;
    color: #10b981 !important;
    border-left: 3px solid #10b981 !important;
  }
  
  .feedback-error {
    background-color: #fef2f2 !important;
    color: #ef4444 !important;
    border-left: 3px solid #ef4444 !important;
  }
  
  /* responsive design */
  @media (max-width: 768px) {
    .game-section {
      flex-direction: column;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .arm-simulator {
      height: 250px;
    }
  }
</style>

<div class="container">
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

<script>
  // ==================== game logic ====================
  const needle = document.getElementById('needle');
  const vein = document.querySelector('.vein-target');
  const armSimulator = document.getElementById('arm-simulator');
  const feedback = document.getElementById('feedback');
  const glucoseValue = document.getElementById('glucose-value');
  const glucoseStatus = document.getElementById('glucose-status');
  
  let isDragging = false;
  let offsetX, offsetY;
  
  // 改进的拖拽功能 - 支持鼠标和触摸设备
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
    
    // 计算针的新位置，确保不超出边界
    let newLeft = clientX - armRect.left - offsetX;
    let newTop = clientY - armRect.top - offsetY;
    
    // 边界检查
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
    
    // 检查是否命中静脉
    if (isColliding(needle.getBoundingClientRect(), vein.getBoundingClientRect())) {
      handleSuccess();
    } else {
      handleError();
    }
  }
  
  // 改进的碰撞检测
  function isColliding(rect1, rect2) {
    const center1 = {
      x: rect1.left + rect1.width / 2,
      y: rect1.top + rect1.height / 2
    };
    
    const center2 = {
      x: rect2.left + rect2.width / 2,
      y: rect2.top + rect2.height / 2
    };
    
    // 检查针的中心点是否在静脉区域内
    return (
      Math.abs(center1.x - center2.x) < rect2.width / 2 &&
      Math.abs(center1.y - center2.y) < rect2.height / 2
    );
  }
  
  function handleSuccess() {
    const glucose = generateGlucoseReading();
    const status = getGlucoseStatus(glucose);
    
    // Update Display
    glucoseValue.textContent = `${glucose} mmol/L`;
    glucoseStatus.textContent = status;
    glucoseStatus.className = `status-${status.toLowerCase()}`;
    
    feedback.textContent = 'Measurement successful!';
    feedback.className = 'feedback-success';
    feedback.style.display = 'block';
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  }
  
  function handleError() {
    feedback.textContent = 'Please aim for the blue vein area';
    feedback.className = 'feedback-error';
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 2000);
  }
  
  function generateGlucoseReading() {
    // 70% Normal, 30% Abnormal
    if (Math.random() < 0.7) {
      return (4 + Math.random() * 3.8).toFixed(1); // normal range
    } else {
      // random generator
      return Math.random() < 0.5 
        ? (2 + Math.random() * 2).toFixed(1) // low
        : (7.8 + Math.random() * 5).toFixed(1); // high
    }
  }
  
  function getGlucoseStatus(glucose) {
    glucose = parseFloat(glucose);
    if (glucose < 4) return 'Low';
    if (glucose > 7.8) return 'High';
    return 'Normal';
  }
  
  // ==================== CRUD ====================
  let records = JSON.parse(localStorage.getItem('glucoseRecords')) || [];
  let currentEditId = null;
  
  // DOM elements
  const form = document.getElementById('glucose-form');
  const recordIdInput = document.getElementById('record-id');
  const glucoseInput = document.getElementById('manual-glucose');
  const timeInput = document.getElementById('manual-time');
  const notesInput = document.getElementById('manual-notes');
  const saveBtn = document.getElementById('save-btn');
  const clearBtn = document.getElementById('clear-btn');
  const recordsTable = document.getElementById('records-table').querySelector('tbody');
  
  // Initialize the table
  updateTable();
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const record = {
      id: currentEditId || Date.now().toString(),
      value: parseFloat(glucoseInput.value),
      time: timeInput.value,
      notes: notesInput.value,
      status: getGlucoseStatus(glucoseInput.value)
    };
    
    if (currentEditId) {
      // Update existing record
      const index = records.findIndex(r => r.id === currentEditId);
      if (index !== -1) {
        records[index] = record;
      }
    } else {
      // Add new record
      records.push(record);
    }
    
    // Save to localStorage
    localStorage.setItem('glucoseRecords', JSON.stringify(records));
    
    updateTable();
    resetForm();
  });
  
  // Clear form
  clearBtn.addEventListener('click', resetForm);
  
  // Update the records table
  function updateTable() {
    recordsTable.innerHTML = '';
    
    // Sort records by time (newest first)
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
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => editRecord(btn.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteRecord(btn.dataset.id));
    });
  }
  
  // Edit a record
  function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (record) {
      currentEditId = record.id;
      recordIdInput.value = record.id;
      glucoseInput.value = record.value;
      timeInput.value = record.time;
      notesInput.value = record.notes || '';
      saveBtn.textContent = 'Update Record';
      
      // Scroll to form
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Delete a record
  function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
      records = records.filter(r => r.id !== id);
      localStorage.setItem('glucoseRecords', JSON.stringify(records));
      updateTable();
    }
  }
  
  // Reset the form
  function resetForm() {
    currentEditId = null;
    form.reset();
    saveBtn.textContent = 'Save Record';
    timeInput.value = new Date().toISOString().slice(0, 16);
  }
  
  // Format date/time for display
  function formatDateTime(datetimeStr) {
    if (!datetimeStr) return '-';
    const dt = new Date(datetimeStr);
    return dt.toLocaleString();
  }
  
  // Initialize time input with current time
  timeInput.value = new Date().toISOString().slice(0, 16);
</script>