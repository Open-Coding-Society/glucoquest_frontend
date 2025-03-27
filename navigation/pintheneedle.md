---
layout: post
title: Pin the Needle
permalink: /needle/
menu: nav/home.html
author: anyi
---
<style>
  /* 游戏主体样式 */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .game-section {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .game-panel {
    flex: 1;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .arm-simulator {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #ffdbac;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
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
  }
  
  .game-result {
    text-align: center;
    margin: 20px 0;
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
  
  /* 手动记录表单样式 */
  .record-form {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    margin-bottom: 30px;
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
    background: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
  }
  
  /* 记录表格样式 */
  .records-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .records-table th {
    background: #f8fafc;
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
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .game-section {
      flex-direction: column;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="container">
  <div class="game-section">
    <div class="game-panel">
      <h2>Glucose Monitoring Game</h2>
      <p>Practice proper needle insertion technique</p>
      
  <div class="arm-simulator">
        <div class="vein-target"></div>
        <div class="needle" draggable="true"></div>
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
            <input type="number" step="0.1" class="form-control" id="manual-glucose" required>
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
  // ==================== 游戏逻辑部分 ====================
  const needle = document.querySelector('.needle');
  const vein = document.querySelector('.vein-target');
  const feedback = document.getElementById('feedback');
  const glucoseValue = document.getElementById('glucose-value');
  const glucoseStatus = document.getElementById('glucose-status');
  
  // 初始化拖拽功能
  needle.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'needle');
    needle.style.opacity = '0.7';
  });
  
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    needle.style.opacity = '1';
    
    // 定位针头位置
    const armRect = document.querySelector('.arm-simulator').getBoundingClientRect();
    const dropX = e.clientX - armRect.left - needle.offsetWidth/2;
    const dropY = e.clientY - armRect.top - needle.offsetHeight/2;
    
    needle.style.left = `${dropX}px`;
    needle.style.top = `${dropY}px`;
    
    // 检查是否扎中静脉
    const veinRect = vein.getBoundingClientRect();
    if (isColliding(needle.getBoundingClientRect(), veinRect)) {
      handleSuccess();
    } else {
      handleError();
    }
  });
  
  function isColliding(rect1, rect2) {
    return !(
      rect1.right < rect2.left || 
      rect1.left > rect2.right || 
      rect1.bottom < rect2.top || 
      rect1.top > rect2.bottom
    );
  }
  
  function handleSuccess() {
    const glucose = generateGlucoseReading();
    const status = getGlucoseStatus(glucose);
    
    // 更新显示
    glucoseValue.textContent = `${glucose} mmol/L`;
    glucoseStatus.textContent = status;
    glucoseStatus.className = `status-${status.toLowerCase()}`;
    
    feedback.textContent = 'Measurement successful!';
    feedback.className = 'feedback-success';
    feedback.style.backgroundColor = '#ecfdf5';
    feedback.style.color = '#10b981';
    feedback.style.borderLeft = '3px solid #10b981';
    feedback.style.display = 'block';
    
    // 3秒后隐藏反馈
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  }
  
  function handleError() {
    feedback.textContent = 'Please aim for the blue vein area';
    feedback.className = 'feedback-error';
    feedback.style.backgroundColor = '#fef2f2';
    feedback.style.color = '#ef4444';
    feedback.style.borderLeft = '3px solid #ef4444';
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 2000);
  }
  
  function generateGlucoseReading() {
    // 70% 正常值, 30% 异常值
    if (Math.random() < 0.7) {
      return (4 + Math.random() * 3.8).toFixed(1); // 正常范围
    } else {
      // 随机选择低或高
      return Math.random() < 0.5 
        ? (2 + Math.random() * 2).toFixed(1) // 低
        : (7.8 + Math.random() * 5).toFixed(1); // 高
    }
  }
  
  function getGlucoseStatus(glucose) {
    glucose = parseFloat(glucose);
    if (glucose < 4) return 'Low';
    if (glucose > 7.8) return 'High';
    return 'Normal';
  }
  
  // ==================== 手动记录CRUD部分 ====================
  let records = [];
  let currentEditId = null;
  
  // 表单元素
  const form = document.getElementById('glucose-form');
  const recordIdInput = document.getElementById('record-id');
  const glucoseInput = document.getElementById('manual-glucose');
  const timeInput = document.getElementById('manual-time');
  const notesInput = document.getElementById('manual-notes');
  const saveBtn = document.getElementById('save-btn');
  const clearBtn = document.getElementById('clear-btn');
  const recordsTable = document.getElementById('records-table').querySelector('tbody');
  
  // 表单提交
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
      // 更新现有记录
      const index = records.findIndex(r => r.id === currentEditId);
      if (index !== -1) {
        records[index] = record;
      }
    } else {
      // 添加新记录
      records.push(record);
    }
    
    updateTable();
    resetForm();
  });
  
  // 清除表单
  clearBtn.addEventListener('click', resetForm);
  
  // 更新记录表格
  function updateTable() {
    recordsTable.innerHTML = '';
    
    // 按时间降序排序
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
    
    // 为操作按钮添加事件监听器
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => editRecord(btn.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteRecord(btn.dataset.id));
    });
  }
  
  // 编辑记录
  function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (record) {
      currentEditId = record.id;
      recordIdInput.value = record.id;
      glucoseInput.value = record.value;
      timeInput.value = record.time;
      notesInput.value = record.notes || '';
      saveBtn.textContent = 'Update Record';
    }
  }
  
  // 删除记录
  function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
      records = records.filter(r => r.id !== id);
      updateTable();
    }
  }
  
  // 重置表单
  function resetForm() {
    currentEditId = null;
    form.reset();
    saveBtn.textContent = 'Save Record';
    timeInput.value = new Date().toISOString().slice(0, 16);
  }
  
  // 格式化日期时间显示
  function formatDateTime(datetimeStr) {
    if (!datetimeStr) return '-';
    const dt = new Date(datetimeStr);
    return dt.toLocaleString();
  }
  
  // 初始化时间字段为当前时间
  timeInput.value = new Date().toISOString().slice(0, 16);
</script>