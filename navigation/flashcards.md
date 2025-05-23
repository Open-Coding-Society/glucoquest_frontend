---
layout: tailwind
permalink: /flashcards/
title: Diabetes Flashcards
show_reading_time: false
comments: true
categories: [Education]
---

  <link href="https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap" rel="stylesheet">
<style>
    html, body, select {
      color: white !important;
      background-color: #1A281A !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    p {
      font-family: 'Oxygen Mono';
      font-size: 15px;
      color: white;
    }
    /*h1, h2, h3, h4 {
      font-family: 'Oxygen Mono';
      color:#5fb617;
    }*/
    .feature-card {
      background: #1a3a1e;
      transition: all 0.3s ease;
      padding: 20px;
      border-radius: 10px;
      margin: 10px;
      text-align: center;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .divider {
      width: 100px;
      height: 2px;
      background: #5fb617;
      margin: 30px auto;
    }
    .flashcard {
      cursor: pointer;
      user-select: none;
      background: #1a3a1e;
      padding: 100px;
      border-radius: 10px;
      font-size: 18px;
      margin: 20px auto;
      width: 80%;
      text-align: center;
      transition: background 0.3s ease;
    }
    .flashcard:hover {
      /*transform: translateY(-5px);*/
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px;
    }
    button {
      background-color: #5fb617;
      border: none;
      color: white;
      padding: 10px 20px;
      font-family: 'Oxygen Mono';
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    button:hover {
      background-color: #4da514;
    }
</style>
<html>
  <h1 style="text-align:center">Diabetes Flashcards</h1>
  <div class="divider"></div>
  <div id="flashcardContainer">
    <div class="flashcard" id="flashcard">Click to Flip</div>
    <div class="controls">
      <button id="prevBtn">Previous</button>
      <button id="nextBtn">Next</button>
      <button id="quizBtn">Quiz Me</button>
    </div>
  </div>
  <div id="quizSection"></div>

  <script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    let currentCard = 0;
    let showingTerm = true;
    let flashcards = [];

    const flashcardEl = document.getElementById("flashcard");
    const quizSection = document.getElementById("quizSection");
    const flashcardContainer = document.getElementById("flashcardContainer");

    async function fetchFlashcards() {
      try {
        const response = await fetch(`${pythonURI}/api/flashcards`);
        flashcards = await response.json();
        displayCard();
      } catch (error) {
        flashcardEl.innerText = "Failed to load flashcards. Please try again later.";
        console.error("Error fetching flashcards:", error);
      }
    }

    function displayCard() {
      if (flashcards.length === 0) return;
      const card = flashcards[currentCard];
      flashcardEl.innerText = showingTerm ? card.term : card.definition;
    }

    function nextCard() {
      if (flashcards.length === 0) return;
      currentCard = (currentCard + 1) % flashcards.length;
      showingTerm = true;
      displayCard();
    }

    function prevCard() {
      if (flashcards.length === 0) return;
      currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
      showingTerm = true;
      displayCard();
    }

    // ...existing code...

    // Utility to get N random elements from an array
    function getRandomSample(arr, n) {
      const copy = arr.slice();
      for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      } 
      return copy.slice(0, n);
    }

    let quizCards = []; // Store the random 10 cards for the current quiz

    function renderQuiz() {
      // Hide flashcards
      flashcardContainer.style.display = "none";
      // Pick 10 random cards for this quiz
      quizCards = getRandomSample(flashcards, Math.min(10, flashcards.length));
      let quizHtml = `
        <form id="quizForm" class="feature-card">
          <h2>Quiz: Type the correct term for each definition</h2>
          <div style="display:flex; flex-direction:column; gap:15px;">
      `;
      quizCards.forEach((card, idx) => {
        quizHtml += `
          <div>
            <label><b>${idx + 1}.</b> ${card.definition}</label><br>
            <input type="text" name="answer${idx}" style="width:100%;padding:5px;margin-top:5px;" autocomplete="off"/>
          </div>
        `;
      });
      quizHtml += `
          </div>
          <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
            <button type="button" id="cancelQuizBtn">Cancel</button>
            <button type="submit" id="submitQuizBtn">Submit Quiz</button>
          </div>
          <div id="quizWarning" style="color:orange; margin-top:10px;"></div>
        </form>
      `;
      quizSection.innerHTML = quizHtml;

      document.getElementById("cancelQuizBtn").onclick = () => {
        quizSection.innerHTML = "";
        flashcardContainer.style.display = "";
      };
      document.getElementById("quizForm").onsubmit = handleQuizSubmit;
    }

    function handleQuizSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const answers = [];
      let emptyCount = 0;
      for (let i = 0; i < quizCards.length; i++) {
        const val = form[`answer${i}`].value.trim();
        answers.push(val);
        if (!val) emptyCount++;
      }
      if (emptyCount > 0) {
        document.getElementById("quizWarning").innerText =
          "Are you sure you want to submit? You haven't answered all the questions.";
        // Only submit if user clicks submit again with warning shown
        if (!form.dataset.warned) {
          form.dataset.warned = "true";
          return;
        }
      }
      // Grade quiz
      let score = 0;
      let resultsHtml = `<div class="feature-card"><h2>Quiz Results</h2><ul style="text-align:left;">`;
      quizCards.forEach((card, idx) => {
        const userAns = answers[idx] || "(no answer)";
        const correct = userAns.toLowerCase().trim() === card.term.toLowerCase().trim();
        if (correct) score++;
        resultsHtml += `<li>
          <b>Q${idx + 1}:</b> ${card.definition}<br>
          <span style="color:${correct ? 'limegreen' : 'red'}">
            Your answer: ${userAns}
            ${correct ? "✓" : `✗ (Correct: ${card.term})`}
          </span>
        </li>`;
      });
      resultsHtml += `</ul>
        <h3 style="text-align:center;">Score: ${score} / ${quizCards.length}</h3>
        <div style="text-align:center;">
          <button id="retakeQuizBtn">Retake Quiz</button>
        </div>
      </div>`;
      quizSection.innerHTML = resultsHtml;
      document.getElementById("retakeQuizBtn").onclick = () => {
        renderQuiz();
      };
      // Show flashcards again after quiz is submitted
      flashcardContainer.style.display = "";
    }

    function startQuiz() {
      if (flashcards.length === 0) return;
      renderQuiz();
    }

    flashcardEl.addEventListener("click", () => {
      showingTerm = !showingTerm;
      displayCard();
    });

    document.getElementById("nextBtn").addEventListener("click", nextCard);
    document.getElementById("prevBtn").addEventListener("click", prevCard);
    document.getElementById("quizBtn").addEventListener("click", startQuiz);

    fetchFlashcards();
  </script>
</html>

