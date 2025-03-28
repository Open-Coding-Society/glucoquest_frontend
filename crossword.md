<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dexcom Glucose Crossword</title>
    <style>
        :root {
            --dexcom-blue: #00B0CA;
            --dexcom-dark: #005F6B;
            --dexcom-light: #E0F7FA;
            --cell-size: 30px;
        }
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, var(--dexcom-blue), var(--dexcom-dark));
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin: 0;
            font-size: 2.5rem;
        }
        .game-container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
        }
        .puzzle-section {
            flex: 1 1 700px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            overflow: auto;
        }
        #crossword {
            display: grid;
            grid-template-columns: repeat(20, var(--cell-size));
            gap: 2px;
            background: var(--dexcom-dark);
            padding: 5px;
            border-radius: 8px;
            margin: 0 auto;
            width: max-content;
        }
        .cell {
            width: var(--cell-size);
            height: var(--cell-size);
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            position: relative;
            cursor: pointer;
            border-radius: 3px;
        }
        .cell.black {
            background: var(--dexcom-dark);
            cursor: default;
        }
        .cell-number {
            position: absolute;
            top: 2px;
            left: 2px;
            font-size: 0.6rem;
            color: var(--dexcom-blue);
        }
        .cell.selected {
            background: #FFEB3B;
            z-index: 2;
            box-shadow: 0 0 0 2px var(--dexcom-blue);
        }
        .cell.highlighted {
            background: var(--dexcom-light);
        }
        .clue-section {
            flex: 1 1 300px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .clue-section h2 {
            color: var(--dexcom-blue);
            border-bottom: 2px solid var(--dexcom-light);
            padding-bottom: 8px;
        }
        .clue {
            padding: 8px 12px;
            margin: 8px 0;
            border-left: 3px solid transparent;
            cursor: pointer;
            display: flex;
        }
        .clue:hover {
            background: var(--dexcom-light);
            border-left-color: var(--dexcom-blue);
        }
        .clue.active {
            background: var(--dexcom-blue);
            color: white;
        }
        .clue-number {
            font-weight: bold;
            min-width: 25px;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            background-color: var(--dexcom-blue);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
        }
        button:hover {
            background-color: var(--dexcom-dark);
        }
        .message {
            text-align: center;
            margin-top: 20px;
            min-height: 24px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Dexcom Glucose Crossword</h1>
    </header>
    <div class="game-container">
        <div class="puzzle-section">
            <div id="crossword"></div>
        </div>
        <div class="clue-section">
            <h2>Across</h2>
            <div id="across-clues"></div>
        </div>
        <div class="clue-section">
            <h2>Down</h2>
            <div id="down-clues"></div>
        </div>
    </div>
    <div class="controls">
        <button id="check-btn">Check Answers</button>
    </div>
    <div class="message" id="message"></div>

    <script>
        // Your exact 20x20 grid structure
        const grid = [
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], // Row 1
            [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0], // Row 2
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], // Row 3
            [0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0], // Row 4
            [0,0,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0], // Row 5
            [0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1], // Row 6
            [0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0], // Row 7
            [1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0], // Row 8
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0], // Row 9
            [1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0], // Row 10
            [0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0], // Row 11
            [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0], // Row 12
            [0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0], // Row 13
            [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0], // Row 14
            [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0], // Row 15
            [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0], // Row 16
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], // Row 17
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]  // Row 18
        ];

        // Your exact clues
        const acrossClues = {
            1: "It monitors high glucose to avoid complications.",
            3: "The system displays glucose patterns over hours and days.",
            4: "It provides instant glucose readings, updating every few minutes.",
            5: "It notifies users of dangerous highs or lows promptly.",
            7: "The system observes blood sugar levels in real time.",
            9: "Dexcom tracks glucose levels without breaks, 24/7.",
            10: "The device is discreetly attached to the body.",
            11: "Dexcom shares glucose insights with users and healthcare providers."
        };

        const downClues = {
            1: "Dexcom detects low glucose early to prevent emergencies.",
            2: "It supports better control of blood sugar levels.",
            6: "A small, wearable device that detects interstitial glucose.",
            8: "Dexcom delivers precise measurements for reliable decision-making."
        };

        // Initialize empty solution grid
        let solution = Array(20).fill().map(() => Array(20).fill(''));
        let playerGrid = JSON.parse(JSON.stringify(grid));
        let wordNumbers = {};
        let currentNumber = 1;
        let selectedCell = null;
        let currentDirection = 'across';

        // DOM elements
        const crossword = document.getElementById('crossword');
        const acrossCluesDiv = document.getElementById('across-clues');
        const downCluesDiv = document.getElementById('down-clues');
        const checkBtn = document.getElementById('check-btn');
        const messageDiv = document.getElementById('message');

        function assignNumbers() {
            wordNumbers = {};
            currentNumber = 1;

            // Assign numbers to across words
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (grid[y][x] === 1 && 
                        (x === 0 || grid[y][x-1] === 0) && 
                        (x < grid[0].length - 1 && grid[y][x+1] === 1)) {
                        wordNumbers[`${x},${y}`] = currentNumber;
                        currentNumber++;
                    }
                }
            }

            // Assign numbers to down words
            currentNumber = 1;
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (grid[y][x] === 1 && 
                        (y === 0 || grid[y-1][x] === 0) && 
                        (y < grid.length - 1 && grid[y+1][x] === 1)) {
                        if (!wordNumbers[`${x},${y}`]) {
                            wordNumbers[`${x},${y}`] = currentNumber;
                        }
                        currentNumber++;
                    }
                }
            }
        }

        function renderGrid() {
            crossword.innerHTML = '';
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    const cell = document.createElement('div');
                    cell.className = grid[y][x] ? 'cell' : 'cell black';
                    
                    if (grid[y][x]) {
                        cell.dataset.x = x;
                        cell.dataset.y = y;
                        cell.addEventListener('click', () => selectCell(x, y));
                        
                        // Add number if this is the start of a word
                        if (wordNumbers[`${x},${y}`]) {
                            const numSpan = document.createElement('span');
                            numSpan.className = 'cell-number';
                            numSpan.textContent = wordNumbers[`${x},${y}`];
                            cell.appendChild(numSpan);
                        }
                        
                        // Add player's letter if exists
                        if (playerGrid[y][x] && playerGrid[y][x] !== 1) {
                            cell.textContent = playerGrid[y][x];
                        }
                    }
                    
                    crossword.appendChild(cell);
                }
            }
        }

        function renderClues() {
            acrossCluesDiv.innerHTML = '';
            downCluesDiv.innerHTML = '';

            // Render across clues
            Object.entries(acrossClues).forEach(([num, clue]) => {
                const clueDiv = document.createElement('div');
                clueDiv.className = 'clue';
                clueDiv.innerHTML = `
                    <span class="clue-number">${num}.</span>
                    <span class="clue-text">${clue}</span>
                `;
                clueDiv.dataset.num = num;
                clueDiv.dataset.dir = 'across';
                clueDiv.addEventListener('click', () => highlightClue(num, 'across'));
                acrossCluesDiv.appendChild(clueDiv);
            });

            // Render down clues
            Object.entries(downClues).forEach(([num, clue]) => {
                const clueDiv = document.createElement('div');
                clueDiv.className = 'clue';
                clueDiv.innerHTML = `
                    <span class="clue-number">${num}.</span>
                    <span class="clue-text">${clue}</span>
                `;
                clueDiv.dataset.num = num;
                clueDiv.dataset.dir = 'down';
                clueDiv.addEventListener('click', () => highlightClue(num, 'down'));
                downCluesDiv.appendChild(clueDiv);
            });
        }

        function selectCell(x, y) {
            // Deselect previous cell
            document.querySelectorAll('.cell.selected').forEach(c => {
                c.classList.remove('selected');
            });

            selectedCell = { x, y };
            const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if (cell) {
                cell.classList.add('selected');
                highlightWord(x, y);
            }
        }

        function highlightWord(x, y) {
            // Remove previous highlights
            document.querySelectorAll('.cell.highlighted').forEach(c => {
                c.classList.remove('highlighted');
            });

            if (currentDirection === 'across') {
                // Find start of word
                let startX = x;
                while (startX > 0 && grid[y][startX - 1] === 1) startX--;

                // Highlight entire word
                for (let i = startX; i < grid[0].length && grid[y][i] === 1; i++) {
                    const cell = document.querySelector(`.cell[data-x="${i}"][data-y="${y}"]`);
                    if (cell) cell.classList.add('highlighted');
                }
            } else {
                // Find start of word
                let startY = y;
                while (startY > 0 && grid[startY - 1][x] === 1) startY--;

                // Highlight entire word
                for (let i = startY; i < grid.length && grid[i][x] === 1; i++) {
                    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${i}"]`);
                    if (cell) cell.classList.add('highlighted');
                }
            }
        }

        function highlightClue(num, dir) {
            // Remove active state from all clues
            document.querySelectorAll('.clue.active').forEach(c => {
                c.classList.remove('active');
            });

            // Find and activate the clicked clue
            const clue = document.querySelector(`.clue[data-num="${num}"][data-dir="${dir}"]`);
            if (clue) {
                clue.classList.add('active');
                currentDirection = dir;

                // Find and select the first cell of this word
                for (let y = 0; y < grid.length; y++) {
                    for (let x = 0; x < grid[0].length; x++) {
                        if (wordNumbers[`${x},${y}`] == num) {
                            if ((dir === 'across' && (x === 0 || grid[y][x-1] === 0)) ||
                                (dir === 'down' && (y === 0 || grid[y-1][x] === 0))) {
                                selectCell(x, y);
                                return;
                            }
                        }
                    }
                }
            }
        }

        function checkAnswers() {
            let correct = 0;
            let total = 0;

            // Reset colors
            document.querySelectorAll('.cell').forEach(cell => {
                cell.style.color = '';
            });

            // Check each cell
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (grid[y][x] === 1) {
                        total++;
                        const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                        if (playerGrid[y][x] === solution[y][x]) {
                            correct++;
                            if (cell) cell.style.color = 'green';
                        } else if (playerGrid[y][x] && playerGrid[y][x] !== 1) {
                            if (cell) cell.style.color = 'red';
                        }
                    }
                }
            }

            // Show results
            const percentage = Math.round((correct / total) * 100);
            if (percentage === 100) {
                messageDiv.textContent = '🎉 Congratulations! All answers are correct!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = `You have ${correct} correct out of ${total} (${percentage}%)`;
                messageDiv.style.color = percentage > 70 ? 'orange' : 'red';
            }
        }

        // Handle keyboard input
        document.addEventListener('keydown', e => {
            if (!selectedCell) return;

            const { x, y } = selectedCell;
            const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);

            if (e.key === 'Backspace') {
                // Clear cell
                playerGrid[y][x] = 1;
                if (cell) cell.textContent = '';
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                // Enter letter
                playerGrid[y][x] = e.key.toUpperCase();
                if (cell) cell.textContent = e.key.toUpperCase();
                moveToNextCell();
            } else if (e.key === ' ') {
                // Toggle direction
                currentDirection = currentDirection === 'across' ? 'down' : 'across';
                highlightWord(x, y);
            }
        });

        function moveToNextCell() {
            if (!selectedCell) return;

            let { x, y } = selectedCell;
            if (currentDirection === 'across') {
                x++;
                while (x < grid[0].length && grid[y][x] !== 1) x++;
            } else {
                y++;
                while (y < grid.length && grid[y][x] !== 1) y++;
            }

            if (x < grid[0].length && y < grid.length && grid[y][x] === 1) {
                selectCell(x, y);
            }
        }

        // Initialize the game
        assignNumbers();
        renderGrid();
        renderClues();
        checkBtn.addEventListener('click', checkAnswers);
    </script>
</body>
</html>