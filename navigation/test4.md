---
layout: post
title: Glucose Test Simulator
permalink: /test4/
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
  
  /* 新增图表样式 */
  .chart-container {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    height: 300px;
  }
  
  .chart-title {
    text-align: center;
    margin-bottom: 10px;
    color: #3b82f6;
  }
</style>

<div class="container">
  <h1>Glucose Test Simulator</h1>
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
    <div class="chart-container">
        <h3 class="chart-title">Last 3 Days Glucose Trend</h3>
        <canvas id="glucose-chart"></canvas>
      </div>
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
import Chart from 'chart.js/auto';

let glucoseChart = null;

function initChart(records) {
  // 仅显示最近3天
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const recentRecords = records.filter(r => new Date(r.time) >= threeDaysAgo)
    .sort((a, b) => new Date(a.time) - new Date(b.time));
  const ctx = document.getElementById('glucose-chart').getContext('2d');
  if (glucoseChart) glucoseChart.destroy();
  const labels = recentRecords.map(r => {
    const d = new Date(r.time);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });
  const data = recentRecords.map(r => r.value);
  glucoseChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Glucose (mmol/L)',
        data: data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: data.map(v => v < 4 ? '#ef4444' : v > 7.8 ? '#f59e0b' : '#10b981')
      }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#e2e8f0' } }
      },
    scales: {
        y: {
          beginAtZero: false,
          min: Math.max(0, Math.min(...data, 4) - 2),
          max: Math.max(...data, 8) + 2,
          ticks: { color: '#e2e8f0' },
          grid: { color: '#4a5568' }
        },
        x: {
          ticks: { color: '#e2e8f0', maxRotation: 45, minRotation: 45 },
          grid: { color: '#4a5568' }
        }
      }
    }
  });
}

// ==================== Utility Functions ====================
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `feedback feedback-${type}`;
    feedback.style.display = 'block';
    setTimeout(() => { feedback.style.display = 'none'; }, 2500);
}

function formatDateTime(datetimeStr) {
    if (!datetimeStr) return '-';
    const dt = new Date(datetimeStr);
    return dt.toLocaleString();
}

function getGlucoseStatus(glucose) {
    glucose = parseFloat(glucose);
    if (glucose < 4) return 'Low';
    if (glucose > 7.8) return 'High';
    return 'Normal';
}

// ==================== Game Logic ====================
const needle = document.getElementById('needle');
const vein = document.querySelector('.vein-target');
const armSimulator = document.getElementById('arm-simulator');
const glucoseValue = document.getElementById('glucose-value');
const glucoseStatus = document.getElementById('glucose-status');
const glucoseInput = document.getElementById('manual-glucose');
const timeInput = document.getElementById('manual-time');

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
    // 自动填充表单
    glucoseInput.value = glucose;
    timeInput.value = new Date().toISOString().slice(0, 16);
    document.getElementById('glucose-form').scrollIntoView({ behavior: 'smooth' });
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

// ==================== CRUD Operations ====================
let currentEditId = null;
const form = document.getElementById('glucose-form');
const recordIdInput = document.getElementById('record-id');
const notesInput = document.getElementById('manual-notes');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const recordsTable = document.getElementById('records-table').querySelector('tbody');

window.fetchGlucoseRecords = async function() {
    try {
        const response = await fetch(`${pythonURI}/api/glucose`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
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
};

async function createGlucoseRecord(recordData) {
    try {
        const response = await fetch(`${pythonURI}/api/glucose`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

async function updateGlucoseRecord(id, recordData) {
    try {
        const response = await fetch(`${pythonURI}/api/glucose`, {
            ...fetchOptions,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...recordData })
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

async function deleteGlucoseRecord(id) {
    try {
        const response = await fetch(`${pythonURI}/api/glucose`, {
            ...fetchOptions,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
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

// ==================== Record Display ====================
function displayRecords(records) {
    recordsTable.innerHTML = '';
    const sortedRecords = [...records].sort((a, b) => new Date(b.time) - new Date(a.time));
    sortedRecords.forEach(record => {
        const row = recordsTable.insertRow();
        row.innerHTML = `
            <td>${record.id.slice(-4)}</td>
            <td>${record.value} mmol/L</td>
            <td>${formatDateTime(record.time)}</td>
            <td><span class="status-${getGlucoseStatus(record.value).toLowerCase()}">${getGlucoseStatus(record.value)}</span></td>
            <td>${record.notes || '-'}</td>
            <td class="table-actions">
                <button class="action-btn edit-btn" data-id="${record.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${record.id}">Delete</button>
            </td>
        `;
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editRecordHandler(btn.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteRecordHandler(btn.dataset.id));
    });
    // 渲染折线图
    initChart(records);
}


// ==================== Event Handlers ====================
async function editRecordHandler(id) {
    try {
        const response = await fetch(`${pythonURI}/api/glucose`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
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

async function deleteRecordHandler(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            await deleteGlucoseRecord(id);
            await fetchGlucoseRecords();
            showFeedback('Record deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting record:', error);
            showFeedback('Failed to delete record.', 'error');
        }
    }
}

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const recordData = {
            value: parseFloat(glucoseInput.value),
            time: timeInput.value,
            notes: notesInput.value
        };
        if (currentEditId) {
            await updateGlucoseRecord(currentEditId, recordData);
            showFeedback('Record updated successfully!', 'success');
        } else {
            await createGlucoseRecord(recordData);
            showFeedback('Record created successfully!', 'success');
        }
        await fetchGlucoseRecords();
        resetForm();
    } catch (error) {
        console.error('Error saving record:', error);
        showFeedback('Failed to save record. Please try again.', 'error');
    }
});

// Clear form handler
function resetForm() {
    currentEditId = null;
    form.reset();
    saveBtn.textContent = 'Save Record';
    timeInput.value = new Date().toISOString().slice(0, 16);
}
clearBtn.addEventListener('click', resetForm);

// 初始化
fetchGlucoseRecords();
timeInput.value = new Date().toISOString().slice(0, 16);
</script>