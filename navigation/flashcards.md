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
      padding: 30px;
      border-radius: 10px;
      font-size: 18px;
      margin: 20px auto;
      width: 80%;
      text-align: center;
      transition: background 0.3s ease;
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
  <div class="flashcard" id="flashcard">Click to Flip</div>
  <div class="controls">
    <button onclick="prevCard()">Previous</button>
    <button onclick="nextCard()">Next</button>
    <button onclick="startQuiz()">Quiz Me</button>
  </div>

  <script>
    let currentCard = 0;
    let showingTerm = true;
    let flashcards = [];

    const flashcardEl = document.getElementById("flashcard");

    async function fetchFlashcards() {
      try {
        const response = await fetch("http://localhost:8520/api/flashcards");
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

    flashcardEl.addEventListener("click", () => {
      showingTerm = !showingTerm;
      displayCard();
    });

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

    function startQuiz() {
      if (flashcards.length === 0) return;
      let score = 0;
      for (let i = 0; i < flashcards.length; i++) {
        let userAnswer = prompt(`What is: ${flashcards[i].term}?`);
        if (userAnswer && userAnswer.toLowerCase().includes(flashcards[i].definition.toLowerCase().split(" ")[0])) {
          alert("Correct!");
          score++;
        } else {
          alert(`Oops! The correct answer was: ${flashcards[i].definition}`);
        }
      }
      alert(`You got ${score} out of ${flashcards.length} correct!`);
    }

    // Initialize
    fetchFlashcards();
    </script>
</html>

