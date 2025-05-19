<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Build Your Own CGM</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f0f9ff;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    h1 {
      color: #00695c;
      text-align: center;
    }
    #parts-container {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .part {
      width: 100px;
      padding: 10px;
      margin: 10px;
      background: #ffffff;
      border: 2px solid #00838f;
      border-radius: 10px;
      cursor: grab;
      text-align: center;
      transition: transform 0.2s;
    }
    .part:hover {
      transform: scale(1.05);
      background: #e0f7fa;
    }
    #play-area {
      position: relative;
      width: 600px;
      height: 500px;
      background: #e0f7fa;
      border: 2px solid #00acc1;
      margin-top: 20px;
      border-radius: 10px;
    }
    .drop-zone {
      position: absolute;
      border: 2px dashed #00838f;
      border-radius: 10px;
      width: 120px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-weight: bold;
      transition: all 0.3s;
      background: rgba(255, 255, 255, 0.7);
    }
    .drop-zone.highlight {
      background: #b2ebf2;
      border-color: #ff5722;
      transform: scale(1.05);
    }
    #sensor-zone { top: 100px; left: 50px; }
    #transmitter-zone { top: 200px; left: 250px; }
    #app-zone { top: 350px; left: 400px; }
    #message {
      margin-top: 20px;
      font-weight: bold;
      color: #00695c;
      min-height: 60px;
      text-align: center;
      padding: 10px;
      width: 80%;
    }
    #reset {
      margin-top: 20px;
      padding: 10px 20px;
      background: #00838f;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }
    #reset:hover {
      background: #00695c;
    }
    .success-message {
      font-size: 1.2em;
      color: #00838f;
      animation: celebrate 0.5s ease-in-out;
    }
    @keyframes celebrate {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @media (max-width: 650px) {
      #play-area {
        width: 95%;
        height: 400px;
      }
      .drop-zone {
        width: 100px;
        font-size: 14px;
      }
      #sensor-zone { top: 80px; left: 20px; }
      #transmitter-zone { top: 180px; left: 150px; }
      #app-zone { top: 280px; left: 250px; }
    }
  </style>
</head>
<body>

  <h1>Build Your Own CGM System</h1>
  <div id="parts-container">
    <div class="part" draggable="true" id="sensor" aria-label="Sensor component">
      <span aria-hidden="true">📟</span> Sensor
    </div>
    <div class="part" draggable="true" id="transmitter" aria-label="Transmitter component">
      <span aria-hidden="true">📡</span> Transmitter
    </div>
    <div class="part" draggable="true" id="app" aria-label="App component">
      <span aria-hidden="true">📱</span> App
    </div>
  </div>

  <div id="play-area">
    <div class="drop-zone" id="sensor-zone" data-expect="sensor">Drop Sensor Here</div>
    <div class="drop-zone" id="transmitter-zone" data-expect="transmitter">Drop Transmitter Here</div>
    <div class="drop-zone" id="app-zone" data-expect="app">Drop App Here</div>
  </div>

  <div id="message">Drag parts to assemble the system!</div>
  <button id="reset">Reset Game</button>

  <script>
    const parts = document.querySelectorAll('.part');
    const zones = document.querySelectorAll('.drop-zone');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('reset');
    let placedParts = 0;

    // Drag and drop functionality
    parts.forEach(part => {
      part.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', part.id);
        e.target.style.opacity = '0.5';
      });
      
      part.addEventListener('dragend', e => {
        e.target.style.opacity = '1';
      });
    });

    zones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
      });

      zone.addEventListener('dragenter', e => {
        e.preventDefault();
        zone.classList.add('highlight');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('highlight');
      });

      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('highlight');
        
        const draggedId = e.dataTransfer.getData('text/plain');
        const expected = zone.getAttribute('data-expect');

        if (draggedId === expected) {
          zone.textContent = draggedId.charAt(0).toUpperCase() + draggedId.slice(1) + ' Connected!';
          zone.style.background = '#b2dfdb';
          document.getElementById(draggedId).style.display = 'none';
          giveFeedback(draggedId);
          placedParts++;
          
          if (placedParts === 3) {
            message.innerHTML = `
              <div class="success-message">🎉 Great job! You've built a Dexcom CGM system!</div>
              <div style="margin-top:10px;">
                The sensor measures glucose, transmitter sends data, and app shows results!
              </div>
            `;
          }
        } else {
          message.textContent = "⚠️ That doesn't go there! Try again.";
          setTimeout(() => giveFeedback('wrong'), 1000);
        }
      });
    });

    function giveFeedback(part) {
      const hints = {
        sensor: "✅ The sensor goes on your body and checks glucose every 5 minutes!",
        transmitter: "✅ The transmitter sends the data wirelessly to your device!",
        app: "✅ The app receives and displays your glucose data in real-time!",
        wrong: "💡 Hint: Match the component names to the drop zones!"
      };
      message.textContent = hints[part];
    }

    // Reset functionality
    resetBtn.addEventListener('click', () => {
      zones.forEach(zone => {
        zone.textContent = 'Drop ' + zone.getAttribute('data-expect').charAt(0).toUpperCase() 
                          + zone.getAttribute('data-expect').slice(1) + ' Here';
        zone.style.background = '';
      });
      
      parts.forEach(part => {
        part.style.display = 'block';
        part.style.opacity = '1';
      });
      
      placedParts = 0;
      message.textContent = "Drag parts to assemble the system!";
    });
  </script>

</body>
</html>