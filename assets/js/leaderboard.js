// /assets/js/leaderboard.js
import { pythonURI, fetchOptions } from './api/config.js';

// Score Submission Function
export async function submitScore(scoreData) {
    try {
        const response = await fetch(`${pythonURI}/api/score`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify(scoreData)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Score submission failed:', error.message);
            return false;
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting score:', error);
        return false;
    }
}

// Leaderboard Fetch Function
export async function fetchLeaderboard() {
    try {
        const response = await fetch(`${pythonURI}/api/scores/leaderboard?limit=10`, fetchOptions);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Display Leaderboard
export async function displayLeaderboard() {
    const container = document.getElementById('leaderboard');
    if (!container) {
        console.error('Leaderboard container not found');
        return;
    }
    
    container.innerHTML = '<p class="loading-message">Loading leaderboard...</p>';
    
    const leaderboard = await fetchLeaderboard();
    
    if (!leaderboard || leaderboard.length === 0) {
        container.innerHTML = '<p class="loading-message">No scores yet! Be the first!</p>';
        return;
    }

    const table = document.createElement('table');
    
    // Create header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    ['Rank', 'Player', 'Score', 'Level'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create rows
    const tbody = table.createTBody();
    leaderboard.forEach((entry, index) => {
        const row = tbody.insertRow();
        
        [index + 1, entry.username || `Player ${entry.user_id}`, entry.points, entry.level].forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });

    container.innerHTML = '';
    container.appendChild(table);
}

// Create leaderboard container
export function createLeaderboardContainer() {
    const progressContainer = document.getElementById('progress-container');
    if (!progressContainer) return;
    
    // Check if leaderboard already exists
    if (document.getElementById('leaderboard-container')) return;
    
    progressContainer.innerHTML += `
        <div id="leaderboard-container">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="color: #FFD700; margin: 0;">Leaderboard</h3>
                <button id="refresh-leaderboard">Refresh</button>
            </div>
            <div id="leaderboard"></div>
        </div>
    `;
    
    // Add refresh button event
    document.getElementById('refresh-leaderboard').addEventListener('click', displayLeaderboard);
}