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
    .flashcard {
      cursor: pointer;
      user-select: none;
      background: transparent;
      padding: 0;
      border-radius: 10px;
      font-size: 18px;
      margin: 20px auto;
      width: 80%;
      text-align: center;
      transition: box-shadow 0.3s ease;
      perspective: 1000px;
      height: 200px;
      position: relative;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      min-height: 180px;
      max-width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /*.flashcard:hover {
      /*transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }*/
    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(.4,2,.6,1);
      transform-style: preserve-3d;
    }
    .flashcard.flipped .flashcard-inner {
      transform: rotateY(180deg);
    }
    .flashcard-front, .flashcard-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background: #1a3a1e;
      color: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      /*font-size: 22px;*/
      font-family: 'Oxygen Mono', monospace;
      box-sizing: border-box;
      padding: 40px 20px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .flashcard-front {
      font-size: 22px;
    }
    .flashcard-back {
      transform: rotateY(180deg);
      background: #2a4a2e;
      color: #b6ffb6;
      font-size: 18px;
    }
</style>

  <h1 style="text-align:center">Diabetes Flashcards</h1>
  <div class="divider"></div>
  <div id="flashcardContainer">
    <div class="flashcard" id="flashcard">
      <div class="flashcard-inner">
        <div class="flashcard-front" id="flashcardFront">Click to Flip</div>
        <div class="flashcard-back" id="flashcardBack"></div>
      </div>
    </div>
    <div id="cardCounter" style="text-align:center; font-family:'Oxygen Mono'; margin-top:10px; color:#5fb617;"></div>
    <div class="controls">
      <button id="prevBtn">Previous</button>
      <button id="nextBtn">Next</button>
      <button id="quizBtn">Quiz Me</button>
    </div>
  </div>
  <div id="quizSection"></div>

<script type="module">
document.addEventListener("DOMContentLoaded", async () => {
  // Import config
  const { pythonURI, fetchOptions } = await import('{{ site.baseurl }}/assets/js/api/config.js');

  let currentCard = 0;
  let showingTerm = true;
  let flashcards = [];

  const flashcardEl = document.getElementById("flashcard");
  const flashcardFront = document.getElementById("flashcardFront");
  const flashcardBack = document.getElementById("flashcardBack");
  const quizSection = document.getElementById("quizSection");
  const flashcardContainer = document.getElementById("flashcardContainer");
  const cardCounter = document.getElementById("cardCounter");

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

  flashcardEl.addEventListener("click", () => {
    flashcardEl.classList.toggle("flipped");
    showingTerm = !showingTerm;
  });

  function displayCard() {
    if (flashcards.length === 0) return;
    const card = flashcards[currentCard];
    flashcardFront.innerText = card.term;
    flashcardBack.innerText = card.definition;
    flashcardEl.classList.remove("flipped");
    showingTerm = true;
    cardCounter.innerText = `Card ${currentCard + 1} of ${flashcards.length}`;
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

  function getRandomSample(arr, n) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  let quizCards = [];

  function renderQuiz() {
    flashcardContainer.style.display = "none";
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

  async function handleQuizSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let emptyCount = 0;
    const answersPayload = quizCards.map((card, idx) => {
      const val = form[`answer${idx}`].value.trim();
      if (!val) emptyCount++;
      return {
        user_answer: val,
        correct_term: card.term
      };
    });

    if (emptyCount > 0) {
      document.getElementById("quizWarning").innerText =
        "Are you sure you want to submit? You haven't answered all the questions.";
      if (!form.dataset.warned) {
        form.dataset.warned = "true";
        return;
      }
    }

    try {
      const res = await fetch(`${pythonURI}/api/flashcards/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersPayload })
      });
      const data = await res.json();
      let score = 0;
      let resultsHtml = `<div class="feature-card"><h2>Quiz Results</h2><ul style="text-align:left;">`;
      data.results.forEach((result, idx) => {
        if (result.is_correct) score++;
        resultsHtml += `<li>
          <b>Q${idx + 1}:</b> ${quizCards[idx].definition}<br>
            <span style="color:${result.is_correct ? 'limegreen' : 'red'}">
              Your answer: ${result.user_answer || "(no answer)"} ${result.is_correct ? "✓" : "✗"}
            </span><br>
            <span style="color:#b6ffb6;">Correct answer: ${result.correct_term}</span>
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
      flashcardContainer.style.display = "";
    } catch (err) {
      quizSection.innerHTML = `<div style="color:red;">Error grading quiz. Please try again.</div>`;
      flashcardContainer.style.display = "";
    }
  }

  function startQuiz() {
    if (flashcards.length === 0) return;
    renderQuiz();
  }

  document.getElementById("nextBtn").addEventListener("click", nextCard);
  document.getElementById("prevBtn").addEventListener("click", prevCard);
  document.getElementById("quizBtn").addEventListener("click", startQuiz);

  fetchFlashcards();
});
</script>

