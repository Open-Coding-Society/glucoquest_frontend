---
layout: post
title: Survey
permalink: /holiday/survey/
author: Soni Dhenuva
menu: nav/home.html
comments: true
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Review Survey</title>
    <style>
        body {
        background-image: url('{{site.baseurl}}/images/present.png');
        background-position: center;
        max-height: 250vh;
        background-size: 950px auto; /* Adjust width */
        }
        .box h1 {
            font-weight: bold !important;
        }
        #review-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 15px;
            background-color: rgb(15, 99, 128) !important;
            color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        #review-button:hover {
            background-color: #008080 !important;
        }
        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        }
        .popup-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        textarea {
            width: 100%;
            height: 80px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            resize: none;
            color: black;
        }
        #submit-review {
            margin-top: 10px;
            padding: 10px 15px;
            background-color: #008080 !important;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #submit-review:hover {
            background-color: #005f5f;
        }
        #survey-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center; /* Centers items */
            gap: 15px; /* Adds space between boxes */
            padding: 20px;
        }
        .survey-box {
            width: calc(33.33% - 20px); /* Keeps 3 per row */
            min-width: 250px;
            background: linear-gradient(135deg,rgb(119, 175, 97),rgb(66, 148, 80)); /* Festive gradient */
            padding: 15px;
            border-radius: 12px; /* Softer rounded corners */
            border: 2px solid rgb(12, 58, 10); /* Holiday red border */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Slight shadow for pop-out effect */
            color:rgb(34, 17, 3); /* Warm brown text for contrast */
            font-size: 16px;
            height: 180px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-align: center;
        }
        /* Add festive styling to review text */
        .review-content {
            flex-grow: 1;
            overflow-y: auto;
            max-height: 100px;
            padding: 5px;
            font-weight: bold;
            font-family: 'Papyrus', sans-serif; /* Playful holiday font */
        }
        /* Style the delete button */
        .delete-button {
            position: absolute;
            top: 5px;
            right: 10px;
            background: #ff3333; /* Bright red delete button */
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            border-radius: 5px;
            padding: 5px;
            transition: background 0.3s ease-in-out;
        }
        .delete-button:hover {
            background: #cc0000; /* Darker red hover effect */
        }
        .textERW{
            color: black !important;
        }
    </style>
</head>
<body>
    <button id="review-button">Give Us a Review</button>
    <div id="review-popup" class="popup">
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h2 class = "textERW">Enter a Review for the Website</h2>
            <textarea id="review-text" placeholder="Write your review here..."></textarea>
            <button id="submit-review">Send</button>
        </div>
    </div>
    <div id="survey-list"></div>
    <script type="module">
        import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
        async function fetchSurveys() {
            try {
                const response = await fetch(`${pythonURI}/api/surveys`, {
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
                        // Create and append the Delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "X";
                        deleteButton.classList.add('delete-button');
                        deleteButton.addEventListener("click", () => deleteSurvey(survey.id));
                        const reviewTitle = document.createElement('div');
                        reviewTitle.textContent = "REVIEW";
                        const reviewContent = document.createElement('div');
                        reviewContent.classList.add('review-content');
                        reviewContent.textContent = survey.message;
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
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    alert("Survey deleted successfully!");
                    fetchSurveys(); // Refresh the list after deletion
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
            if (reviewText.trim() === "") {
                alert("Please enter a review before submitting.");
                return;
            }
            try {
                const response = await fetch(`${pythonURI}/api/survey`, {
                    ...fetchOptions,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: reviewText })
                });
                if (response.ok) {
                    alert("Thank you for your review!");
                    document.getElementById("review-popup").style.display = "none";
                    document.getElementById("review-text").value = "";
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