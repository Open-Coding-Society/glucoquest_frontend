---
layout: post
title: Pin the Needle
permalink: /needle
menu: nav/home.html
author: anyi
---

<style>
    body {
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f8ff;
            padding: 20px;
        }
        
    .game-container {
            display: flex;
            width: 800px;
            gap: 20px;
        }
    #arm-container {
            width: 60%;
            height: 400px;
            background-color: #ffdbac;
            border-radius: 15px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
    #vein {
            position: absolute;
            width: 15px;
            height: 80px;
            background-color: #4682b4;
            left: 45%;
            top: 35%;
            border-radius: 8px;
        }
    #needle {
            position: absolute;
            width: 20px;
            height: 100px;
            background-color: #e74c3c;
            cursor: grab;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 0 0 5px 5px;
            z-index: 10;
            transition: transform 0.1s;
        }
        #results-panel {
            width: 40%;
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        #current-reading {
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .feedback {
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            display: none;
        }
        .success {
            background-color: #2ecc71;
            color: white;
        }
        .error {
            background-color: #e74c3c;
            color: white;
        }
        button {
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>

<div class="game-container">
        <div id="arm-container">
            <div id="vein"></div>
            <div id="needle" draggable="true"></div>
        </div>
        <div id="results-panel">
            <div id="current-reading">
                <h3>Current Reading</h3>
                <p id="glucose-value">-- mmol/L</p>
                <p id="glucose-status">Drag needle to vein</p>
                <div id="feedback" class="feedback"></div>
            </div>
            <h3>Test History</h3>
            <table id="results-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Glucose</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Rows will be added dynamically -->
                </tbody>
            </table>
            <button id="reset-btn">Reset History</button>
        </div>
    </div>

<script>
        // Game elements
        const needle = document.getElementById('needle');
        const vein = document.getElementById('vein');
        const feedback = document.getElementById('feedback');
        const glucoseValue = document.getElementById('glucose-value');
        const glucoseStatus = document.getElementById('glucose-status');
        const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
        const resetBtn = document.getElementById('reset-btn');

        // Game state
        let testCount = 0;
        let records = [];

        // Initialize drag and drop
        needle.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', needle.id);
            needle.style.opacity = '0.5';
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            needle.style.opacity = '1';
            
            // Get drop position
            const armRect = document.getElementById('arm-container').getBoundingClientRect();
            const dropX = e.clientX - armRect.left;
            const dropY = e.clientY - armRect.top;

            // Position the needle
            needle.style.left = `${dropX - needle.offsetWidth/2}px`;
            needle.style.top = `${dropY - needle.offsetHeight/2}px`;

            // Check if dropped on vein
            const veinRect = vein.getBoundingClientRect();
            if (
                e.clientX > veinRect.left && 
                e.clientX < veinRect.right &&
                e.clientY > veinRect.top && 
                e.clientY < veinRect.bottom
            ) {
                handleSuccess();
            } else {
                handleError();
            }
        });

        // Game functions
        function handleSuccess() {
            testCount++;
            const glucose = generateGlucoseReading();
            const status = getGlucoseStatus(glucose);
            
            // Update display
            glucoseValue.textContent = `${glucose} mmol/L`;
            glucoseStatus.textContent = status;
            glucoseStatus.style.color = getStatusColor(status);
            
            feedback.textContent = 'Success! Measurement complete.';
            feedback.className = 'feedback success';
            feedback.style.display = 'block';
            
            // Add to records
            const record = {
                id: testCount,
                time: new Date().toLocaleTimeString(),
                glucose: glucose,
                status: status
            };
            records.push(record);
            updateResultsTable();
        }

        function handleError() {
            feedback.textContent = 'Missed the vein! Please try again.';
            feedback.className = 'feedback error';
            feedback.style.display = 'block';
        }

        function generateGlucoseReading() {
            // 70% chance normal, 30% chance abnormal
            if (Math.random() < 0.7) {
                return (4 + Math.random() * 3.8).toFixed(1); // Normal range
            } else {
                // Randomly choose low or high
                return Math.random() < 0.5 
                    ? (2 + Math.random() * 2).toFixed(1) // Low
                    : (7.8 + Math.random() * 5).toFixed(1); // High
            }
        }

        function getGlucoseStatus(glucose) {
            glucose = parseFloat(glucose);
            if (glucose < 4) return 'Low';
            if (glucose > 7.8) return 'High';
            return 'Normal';
        }

        function getStatusColor(status) {
            switch(status) {
                case 'Low': return '#e74c3c';
                case 'High': return '#f39c12';
                default: return '#2ecc71';
            }
        }

        function updateResultsTable() {
            resultsTable.innerHTML = '';
            records.forEach(record => {
                const row = resultsTable.insertRow();
                row.insertCell(0).textContent = record.id;
                row.insertCell(1).textContent = record.time;
                row.insertCell(2).textContent = record.glucose;
                const statusCell = row.insertCell(3);
                statusCell.textContent = record.status;
                statusCell.style.color = getStatusColor(record.status);
            });
        }

        // Reset button
        resetBtn.addEventListener('click', () => {
            records = [];
            testCount = 0;
            updateResultsTable();
            glucoseValue.textContent = '-- mmol/L';
            glucoseStatus.textContent = 'Drag needle to vein';
            feedback.style.display = 'none';
            needle.style.left = '50%';
            needle.style.top = '20px';
        });
    </script>
