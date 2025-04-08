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
            --dexcom-green: #4CAF50;
            --dexcom-red: #F44336;
            --dexcom-yellow: #FFEB3B;
            --cell-size: 30px;
        }
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background:rgb(81, 81, 82);
            color: #333;
            line-height: 1.6;
            padding: 0;
            margin: 0;
        }
        header {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, var(--dexcom-blue), var(--dexcom-dark));
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }
        h1 {
            margin: 0;
            font-size: 2.5rem;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }
        .game-container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
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
            color: #333;
            font-size: 1.1rem;
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
            background: var(--dexcom-yellow);
            z-index: 2;
            box-shadow: 0 0 0 2px var(--dexcom-blue);
        }
        .cell.highlighted {
            background: var(--dexcom-light);
        }
        .clues-container {
            display: flex;
            gap: 20px;
            flex: 1 1 400px;
            min-width: 300px;
        }
        .clue-section {
        flex: 1;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        max-height: 600px;
        overflow-y: auto;
        border: 1px solid #e0e0e0;
        padding-top: 0;
        }
        #across-clues, #down-clues {
        padding-top: 0;
        margin-top: 0;
        }
        .clue-section h2 {
        color: var(--dexcom-blue);
        border-bottom: 2px solid var(--dexcom-light);
        padding-bottom: 8px;
        font-size: 1.5rem;
        margin-bottom: 15px;
        position: sticky;
        top: 0;
        background: white;
        z-index: 2;
        padding: 10px 0;
        margin-top: 0;
        }
         .clue {
        padding: 8px 12px;
        margin: 8px 0;
        border-left: 3px solid var(--dexcom-light);
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1rem;
        transition: all 0.2s;
        border-radius: 4px;
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
        margin-right: 8px;
        color: var(--dexcom-blue);
        }
        .clue-text {
        color: #333;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        button {
            padding: 10px 20px;
            background-color: var(--dexcom-blue);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: bold;
            font-size: 1rem;
        }
        button:hover {
            background-color: var(--dexcom-dark);
            transform: translateY(-2px);
        }
        button:active {
            transform: translateY(0);
        }
        .message {
            text-align: center;
            margin: 20px auto;
            min-height: 24px;
            font-size: 1.2rem;
            max-width: 800px;
            padding: 10px;
            border-radius: 5px;
        }
        .instructions {
            background: var(--dexcom-light);
            padding: 15px;
            border-radius: 8px;
            margin: 20px auto;
            max-width: 800px;
            font-size: 0.95rem;
        }
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 500px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            position: relative;
        }
        .close {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: var(--dexcom-dark);
        }
        .close:hover {
            color: var(--dexcom-blue);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: var(--dexcom-dark);
        }
        .form-group input[type="number"],
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
        }
        .form-group textarea {
            resize: vertical;
        }
        #comment-form button {
            width: 100%;
            padding: 12px;
            background-color: var(--dexcom-blue);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }
        #comment-form button:hover {
            background-color: var(--dexcom-dark);
        }
        @media (max-width: 768px) {
            .game-container {
                flex-direction: column;
            }
            .clues-container {
                flex-direction: column;
            }
            #crossword {
                grid-template-columns: repeat(20, calc(var(--cell-size) * 0.8));
            }
            .cell {
                width: calc(var(--cell-size) * 0.8);
                height: calc(var(--cell-size) * 0.8);
                font-size: 0.9rem;
            }
            .modal-content {
                margin: 20% auto;
                width: 90%;
            }
        }
        .modal-content h2 {
            margin-top: 0;
            color: var(--dexcom-blue); /* Change to a visible color */
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
        }
        #feedback-items li {
            color: var(--dexcom-blue); /* Match the "User Feedback" header color */
            font-size: 1rem; /* Ensure readability */
        }
    </style>
</head>
<body>
    <header>
        <h1>Dexcom Glucose Crossword</h1>
    </header>
    <div class="instructions">
        <p><strong>How to play:</strong> Click on a cell to select it, then type your answer. Press SPACE to switch between Across and Down. Click on clues to jump to that word.</p>
    </div>
    <div class="game-container">
        <div class="puzzle-section">
            <div id="crossword"></div>
        </div>
        <div class="clues-container">
            <div class="clue-section">
                <h2>Across</h2>
                <div id="across-clues"></div>
            </div>
            <div class="clue-section">
                <h2>Down</h2>
                <div id="down-clues"></div>
            </div>
        </div>
    </div>
    <div class="controls">
        <button id="check-btn">Check Answers</button>
        <button id="reset-btn">Reset Puzzle</button>
        <button id="comment-btn">Submit Feedback</button>
    </div>
    <div class="message" id="message"></div>
    <!-- Comment Popup Modal -->
    <div id="comment-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Submit Your Feedback</h2>
            <form id="comment-form">
                <div class="form-group">
                    <label for="accuracy">Percentage Accuracy:</label>
                    <input type="number" id="accuracy" name="accuracy" min="0" max="100" required>
                    <span>%</span>
                </div>
                <div class="form-group">
                    <label for="comment">Additional Comments:</label>
                    <textarea id="comment" name="comment" rows="4"></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <!-- Feedback List -->
    <div id="feedback-list" style="margin: 20px auto; max-width: 800px; padding: 10px; border-radius: 5px; background: #f8f9fa; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h3 style="text-align: center; color: var(--dexcom-blue);">User Feedback</h3>
        <ul id="feedback-items" style="list-style: none; padding: 0;"></ul>
    </div>
    <script>
        // Crossword grid structure (1 = white cell, 0 = black cell)
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
        // SOLUTION KEY - ADD YOUR ANSWERS HERE
        const solution = Array(20).fill().map(() => Array(20).fill(''));
        // Clues
        const acrossClues = {
            1: "Dexcom detects low glucose early to prevent emergencies. (5)",
            2: "The system displays glucose patterns over hours and days. (9)",
            3: "It notifies users of dangerous highs or lows promptly. (6)",
            4: "It supports better control of blood sugar levels. (7)",
            5: "Dexcom delivers precise measurements for reliable decision-making. (8)",
            6: "Dexcom tracks glucose levels without breaks, 24/7. (9)",
            7: "The device is discreetly attached to the body. (6)",
            8: "Dexcom shares glucose insights with users and healthcare providers. (7)"
        };
        const downClues = {
            10: "It monitors high glucose to avoid complications. ",
            11: "It provides instant glucose readings, updating every few minutes. (6)",
            12: "The system observes blood sugar levels in real time. (6)",
            13: "A small, wearable device that detects interstitial glucose."
        };
        // Game state
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
        const resetBtn = document.getElementById('reset-btn');
        const commentBtn = document.getElementById('comment-btn');
        const messageDiv = document.getElementById('message');
        const commentModal = document.getElementById('comment-modal');
        const closeBtn = document.querySelector('.close');
        const commentForm = document.getElementById('comment-form');
        const feedbackList = document.getElementById('feedback-items');
        // Initialize the crossword
        function initializeCrossword() {
            assignNumbers();
            renderGrid();
            renderClues();
            selectCell(7, 0);
        }
        // Assign numbers to word starts
        function assignNumbers() {
            wordNumbers = {};
            currentNumber = 1;
            // Assign numbers to across words
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (
                        grid[y][x] === 1 && // Current cell is white
                        (x === 0 || grid[y][x - 1] === 0) && // Start of a word (no white cell to the left)
                        (x < grid[0].length - 1 && grid[y][x + 1] === 1) // Word continues to the right
                    ) {
                        wordNumbers[`${x},${y}`] = currentNumber;
                        currentNumber++;
                    }
                }
            }
            // Assign numbers to down words
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (
                        grid[y][x] === 1 && // Current cell is white
                        (y === 0 || grid[y - 1][x] === 0) && // Start of a word (no white cell above)
                        (y < grid.length - 1 && grid[y + 1][x] === 1) // Word continues downward
                    ) {
                        if (!wordNumbers[`${x},${y}`]) {
                            wordNumbers[`${x},${y}`] = currentNumber;
                            currentNumber++;
                        }
                    }
                }
            }
        }
        // Render the crossword grid
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
                            const letterSpan = document.createElement('span');
                            letterSpan.textContent = playerGrid[y][x];
                            cell.appendChild(letterSpan);
                        }
                    }
                    crossword.appendChild(cell);
                }
            }
        }
        // Render the clue lists
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
        // Select a cell
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
        // Highlight the entire word containing the selected cell
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
        // Highlight a clue and its corresponding word
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
        // Check player's answers against the solution
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
                        if (solution[y][x] && playerGrid[y][x] === solution[y][x]) {
                            correct++;
                            if (cell) cell.style.color = 'var(--dexcom-green)';
                        } else if (playerGrid[y][x] && playerGrid[y][x] !== 1) {
                            if (cell) cell.style.color = 'var(--dexcom-red)';
                        }
                    }
                }
            }
            // Show results
            const percentage = Math.round((correct / total) * 100);
            if (percentage === 100) {
                messageDiv.textContent = '🎉 Congratulations! All answers are correct!';
                messageDiv.style.color = 'var(--dexcom-green)';
            } else {
                messageDiv.textContent = `You have ${correct} correct out of ${total} (${percentage}%)`;
                messageDiv.style.color = percentage > 70 ? 'var(--dexcom-blue)' : 'var(--dexcom-red)';
            }
            return percentage;
        }
        // Reset the puzzle
        function resetPuzzle() {
            playerGrid = JSON.parse(JSON.stringify(grid));
            renderGrid();
            selectCell(7, 0);
            messageDiv.textContent = 'Puzzle reset!';
            messageDiv.style.color = 'var(--dexcom-blue)';
        }
        // Handle keyboard input
        document.addEventListener('keydown', e => {
            if (!selectedCell) return;
            const { x, y } = selectedCell;
            const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if (e.key === 'Backspace' || e.key === 'Delete') {
                // Clear cell
                playerGrid[y][x] = 1;
                if (cell) {
                    cell.innerHTML = '';
                    if (wordNumbers[`${x},${y}`]) {
                        const numSpan = document.createElement('span');
                        numSpan.className = 'cell-number';
                        numSpan.textContent = wordNumbers[`${x},${y}`];
                        cell.appendChild(numSpan);
                    }
                }
                moveToPreviousCell();
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                // Enter letter
                playerGrid[y][x] = e.key.toUpperCase();
                if (cell) {
                    cell.innerHTML = '';
                    if (wordNumbers[`${x},${y}`]) {
                        const numSpan = document.createElement('span');
                        numSpan.className = 'cell-number';
                        numSpan.textContent = wordNumbers[`${x},${y}`];
                        cell.appendChild(numSpan);
                    }
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = e.key.toUpperCase();
                    cell.appendChild(letterSpan);
                }
                moveToNextCell();
            } else if (e.key === ' ' || e.key === 'Tab') {
                // Toggle direction
                currentDirection = currentDirection === 'across' ? 'down' : 'across';
                highlightWord(x, y);
            } else if (e.key === 'ArrowUp') {
                moveToCell(x, y - 1);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                moveToCell(x, y + 1);
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                moveToCell(x - 1, y);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                moveToCell(x + 1, y);
                e.preventDefault();
            }
        });
        // Move to the next cell in the current direction
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
        // Move to the previous cell in the current direction
        function moveToPreviousCell() {
            if (!selectedCell) return;
            let { x, y } = selectedCell;
            if (currentDirection === 'across') {
                x--;
                while (x >= 0 && grid[y][x] !== 1) x--;
            } else {
                y--;
                while (y >= 0 && grid[y][x] !== 1) y--;
            }
            if (x >= 0 && y >= 0 && grid[y][x] === 1) {
                selectCell(x, y);
            }
        }
        // Move to a specific cell if it's valid
        function moveToCell(x, y) {
            if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] === 1) {
                selectCell(x, y);
            }
        }
        // Comment modal functionality
        commentBtn.addEventListener('click', () => {
            commentModal.style.display = 'block';
            // Pre-fill accuracy if available
            const accuracyInput = document.getElementById('accuracy');
            const percentageText = messageDiv.textContent.match(/\d+(?=%)/);
            if (percentageText) {
                accuracyInput.value = percentageText[0];
            } else {
                // If no percentage shown, check answers to get one
                const percentage = checkAnswers();
                accuracyInput.value = percentage;
            }
        });
        // Close modal
        closeBtn.addEventListener('click', () => {
            commentModal.style.display = 'none';
        });
        // Close when clicking outside modal
        window.addEventListener('click', (e) => {
            if (e.target === commentModal) {
                commentModal.style.display = 'none';
            }
        });
        // Handle form submission
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const accuracy = document.getElementById('accuracy').value;
            const comment = document.getElementById('comment').value;
            if (comment.trim() === '') {
                alert('Please enter a comment before submitting.');
                return;
            }
            // Create a new list item for the feedback
            const feedbackItem = document.createElement('li');
            feedbackItem.style.padding = '10px';
            feedbackItem.style.borderBottom = '1px solid #ccc';
            feedbackItem.style.marginBottom = '10px';
            // Add the feedback text with accuracy
            feedbackItem.textContent = `${comment} (Accuracy: ${accuracy}%)`;
            // Append the feedback to the list
            feedbackList.appendChild(feedbackItem);
            // Reset form and close modal
            commentForm.reset();
            commentModal.style.display = 'none';
        });
        // Initialize the game
        initializeCrossword();
        // Event listeners
        checkBtn.addEventListener('click', checkAnswers);
        resetBtn.addEventListener('click', resetPuzzle);
    </script>
</body>
</html>