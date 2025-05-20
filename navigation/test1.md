---
layout: post
title: Dexcom Sensor Simulator
permalink: /test1/
comment: true
---
<style>
        .instruction-section {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .equipment-section {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
            padding: 15px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .equipment-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .equipment-item:hover {
            transform: scale(1.05);
        }
        
        .equipment-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 10px;
            object-fit: contain;
        }
        
        .arm-area {
            width: 100%;
            height: 300px;
            background-color: #e9f5ff;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .arm-image {
            max-height: 90%;
            max-width: 90%;
            object-fit: contain;
        }
        
        .target-zone {
            position: absolute;
            width: 100px;
            height: 150px;
            border: 2px dashed #3a86ff;
            border-radius: 10px;
            opacity: 0.7;
            pointer-events: none;
        }
        
        .applied-item {
            position: absolute;
            z-index: 10;
            pointer-events: none;
        }
        
        .alcohol-wipe {
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            border: 2px solid #ccc;
        }
        
        .dexcom-sensor {
            width: 70px;
            height: 40px;
            background-color: #3a86ff;
            border-radius: 15px;
        }
        
        .feedback {
            margin-top: 15px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            display: none;
        }
        
        .success {
            background-color: #d4edda;
            color: #155724;
        }
        
        .error {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>

<div class="instruction-section">
        <h2>Proper Skin Preparation Steps:</h2>
        <ul>
            <li>Wash the area with warm water and soap, then dry thoroughly.</li>
            <li>Use an alcohol wipe to clean the application site and let it dry completely.</li>
            <li>Optional: Apply skin barrier film (Like Skin Tac) if needed.</li>
            <li>Shave any hair if necessary for better adhesion.</li>
            <li>Optional: Warm the skin slightly in cold environments.</li>
        </ul>
    </div>
    
<div class="equipment-section">
        <div class="equipment-item" data-type="alcohol-wipe">
            <img src="{{site.baseurl}}/images/needlepin/wipes.png" class="equipment-icon" alt="Alcohol Wipe"> 
        </div>
        <div class="equipment-item" data-type="cotton-tip">
        <img src="{{site.baseurl}}/images/needlepin/cotton-tip.png" class="equipment-icon" alt="Cotton Tip">
        </div>
        <div class="equipment-item" data-type="dexcom-sensor">
            <img src="{{site.baseurl}}/images/needlepin/dexcom.png" class="equipment-icon" alt="Dexcom Sensor">
        </div>
    </div>
    
<div class="arm-area" id="arm-area">
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Farm-pain-cartoon&psig=AOvVaw2Y2Vzf1Y9oKyAUqcbrVbmW&ust=1747865211661000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC0-LuHs40DFQAAAAAdAAAAABAL" class="arm-image" alt="Arm">
        <div class="target-zone"></div>
    </div>
    
<div id="feedback" class="feedback"></div>
    
<script>
        // Get DOM elements
        const equipmentItems = document.querySelectorAll('.equipment-item');
        const armArea = document.getElementById('arm-area');
        const feedback = document.getElementById('feedback');
        
        // Current step
        let currentStep = 1;
        
        // Add drag functionality to equipment items
        equipmentItems.forEach(item => {
            item.setAttribute('draggable', 'true');
            
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('type', item.dataset.type);
            });
        });
        
        // Set up drop functionality for arm area
        armArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        armArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            const rect = armArea.getBoundingClientRect();
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
                showFeedback('Please drop the item within the target area (blue dashed box)', 'error');
                return;
            }
            
            // Handle different items based on current step
            if (currentStep === 1 && type === 'alcohol-wipe') {
                applyAlcoholWipe(x, y);
                currentStep = 3; // Skip step 2 and go directly to step 3
            } else if (currentStep === 3 && type === 'dexcom-sensor') {
                applyDexcomSensor(x, y);
                currentStep = 4;
            } else {
                showFeedback('Please use the items in the correct order', 'error');
            }
        });
        
        // Apply alcohol wipe
        function applyAlcoholWipe(x, y) {
            // Remove any existing alcohol wipes
            document.querySelectorAll('.alcohol-wipe').forEach(el => el.remove());
            
            const wipe = document.createElement('div');
            wipe.className = 'applied-item alcohol-wipe';
            wipe.style.left = `${x - 30}px`;
            wipe.style.top = `${y - 30}px`;
            armArea.appendChild(wipe);
            
            showFeedback('Alcohol wipe applied successfully!', 'success');
            
            // Automatically fade out after 3 seconds
            setTimeout(() => {
                wipe.style.opacity = '0';
                setTimeout(() => wipe.remove(), 500);
            }, 3000);
        }
        
        // Apply Dexcom sensor
        function applyDexcomSensor(x, y) {
            // Remove any existing sensors
            document.querySelectorAll('.dexcom-sensor').forEach(el => el.remove());
            
            const sensor = document.createElement('div');
            sensor.className = 'applied-item dexcom-sensor';
            sensor.style.left = `${x - 35}px`;
            sensor.style.top = `${y - 20}px`;
            armArea.appendChild(sensor);
            
            showFeedback('Dexcom sensor applied successfully!', 'success');
        }
        
        // Show feedback message
        function showFeedback(message, type) {
            feedback.textContent = message;
            feedback.className = `feedback ${type}`;
            feedback.style.display = 'block';
            
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 3000);
        }
    </script>