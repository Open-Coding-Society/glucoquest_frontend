---
layout: post
title: Feedback
permalink: /feedback
comments: true
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback</title>
    <link href='https://fonts.googleapis.com/css?family=Oxygen Mono' rel='stylesheet'>
    <style>
        body {
            font-family: 'Oxygen Mono';
            background-color: #0a1a0f;
            color: white;
            min-height: 100vh;
            padding: 20px;
        }
        
        h1, h2, h3 {
            color: #5fb617;
        }
        
        #review-button {
            display: block;
            margin: 40px auto;
            padding: 12px 24px;
            background-color: #5fb617;
            color: #0a1a0f;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #review-button:hover {
            background-color: #4da214;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(95, 182, 23, 0.3);
        }
        
        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1a2e22;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            border: 1px solid #5fb617;
            max-width: 500px;
            width: 90%;
        }
        
        .popup-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .popup-content h2 {
            margin-bottom: 20px;
            font-size: 24px;
            text-align: center;
        }
        
        textarea {
            width: 100%;
            height: 150px;
            padding: 15px;
            background-color: #0f2317;
            border: 1px solid #5fb617;
            border-radius: 8px;
            resize: none;
            color: white;
            font-family: 'Oxygen Mono';
            margin-bottom: 20px;
        }
        
        #submit-review {
            padding: 12px 24px;
            background-color: #5fb617;
            color: #0a1a0f;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #submit-review:hover {
            background-color: #4da214;
            transform: translateY(-2px);
        }
        
        #survey-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px 0;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .survey-box {
            background: linear-gradient(135deg, #1a3a27, #0f2317);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #5fb617;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            color: white;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .survey-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(95, 182, 23, 0.2);
        }
        
        .review-content {
            margin-top: 15px;
            line-height: 1.6;
            overflow-y: auto;
            max-height: 120px;
            padding-right: 5px;
        }
        
        .delete-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #e74c3c;
            color: white;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            transition: all 0.3s ease;
        }
        
        .delete-button:hover {
            background: #c0392b;
            transform: scale(1.1);
        }
        
        .close-popup {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #5fb617;
            font-size: 24px;
            cursor: pointer;
        }
        
        .section-divider {
            width: 80px;
            height: 2px;
            background-color: #5fb617;
            margin: 40px auto;
            border-radius: 2px;
        }
        
        .page-title {
            font-size: 36px;
            text-align: center;
            margin: 40px 0 20px;
            color: #5fb617;
        }
    </style>
</head>
<body>
    <h1 class="page-title">User Feedback</h1>
    <div class="section-divider"></div>
    <button id="review-button">Share Your Feedback</button>
    <div id="review-popup" class="popup">
        <span class="close-popup">&times;</span>
        <div class="popup-content">
            <h2>Share Your Thoughts With Us</h2>
            <input 
                type="text" 
                id="reviewer-name" 
                placeholder="Your name (optional)"
                style="width: 100%; padding: 10px; margin-bottom: 15px; background-color: #0f2317; border: 1px solid #5fb617; border-radius: 8px; color: white; font-family: 'Oxygen Mono';"
            >
            <textarea id="review-text" placeholder="We'd love to hear your feedback about your experience..."></textarea>
            <button id="submit-review">Submit Feedback</button>
        </div>
    </div>
    <h2 class="text-3xl font-bold text-center mt-16 mb-8">Community Feedback</h2>
    <div id="survey-list"></div>
    <div class="section-divider"></div>
    <script type="module">
        // Your existing JavaScript remains unchanged here
        import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
        async function fetchSurveys() {
            try {
                const response = await fetch(`${pythonURI}/api/surveys/public`, {  // Changed to public endpoint
                    ...fetchOptions,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    const surveys = await response.json();
                    const surveyList = document.getElementById("survey-list");
                    surveyList.innerHTML = '';
                    surveys.forEach(survey => {
                        const surveyBox = document.createElement('div');
                        surveyBox.classList.add('survey-box');
                        surveyBox.setAttribute('data-id', survey.id);
                        // Create and append the Delete button (if needed)
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "X";
                        deleteButton.classList.add('delete-button');
                        deleteButton.addEventListener("click", () => deleteSurvey(survey.id));
                        const reviewTitle = document.createElement('div');
                        reviewTitle.textContent = "REVIEW";
                        const reviewContent = document.createElement('div');
                        reviewContent.classList.add('review-content');
                        reviewContent.textContent = survey.content;  // Changed to use formatted content
                        surveyBox.appendChild(deleteButton);
                        surveyBox.appendChild(reviewTitle);
                        surveyBox.appendChild(reviewContent);
                        surveyList.appendChild(surveyBox);
                    });
                } else {
                    alert("Failed to fetch surveys.");
                }
            } catch (error) {
                console.error("Error fetching surveys:", error);
                alert("An error occurred while fetching surveys.");
            }
        }
        async function deleteSurvey(surveyId) {
            try {
                const response = await fetch(`${pythonURI}/api/survey?id=${surveyId}`, {
                    ...fetchOptions,
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    alert("Survey deleted successfully!");
                    fetchSurveys();
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete survey: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error deleting survey:", error);
                alert("An error occurred while deleting the survey.");
            }
        }
        async function updateSurvey(surveyId) {
            const reviewText = document.getElementById("review-text").value;
            if (reviewText.trim() === "") {
                alert("Please enter a review before submitting.");
                return;
            }
            try {
                const response = await fetch(`${pythonURI}/api/survey?id=${surveyId}`, {
                    ...fetchOptions,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: reviewText })
                });
                if (response.ok) {
                    alert("Survey updated successfully!");
                    document.getElementById("review-popup").style.display = "none";
                    document.getElementById("review-text").value = "";
                    fetchSurveys(); // Refresh the list after update
                } else {
                    alert("Failed to update survey.");
                }
            } catch (error) {
                console.error("Error updating survey:", error);
                alert("An error occurred while updating the survey.");
            }
        }
        document.getElementById("review-button").addEventListener("click", function () {
            document.getElementById("review-popup").style.display = "block";
        });
        document.querySelector(".close-popup").addEventListener("click", function () {
            document.getElementById("review-popup").style.display = "none";
        });
        document.getElementById("submit-review").addEventListener("click", async function () {
            let reviewText = document.getElementById("review-text").value;
            let reviewerName = document.getElementById("reviewer-name").value || "Anonymous";
            if (reviewText.trim() === "") {
                alert("Please enter a review before submitting.");
                return;
            }
            try {
                const response = await fetch(`${pythonURI}/api/survey`, {
                    ...fetchOptions,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        message: reviewText,
                        name: reviewerName 
                    })
                });
                if (response.ok) {
                    alert("Thank you for your review!");
                    document.getElementById("review-popup").style.display = "none";
                    document.getElementById("review-text").value = "";
                    document.getElementById("reviewer-name").value = "";
                    fetchSurveys();
                } else {
                    alert("Failed to submit review.");
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                alert("An error occurred while submitting the review.");
            }
        });
        window.onload = fetchSurveys;
    </script>
</body>
</html>