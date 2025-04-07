---
layout: tailwind
title: Diabetes Prediction
permalink: /prediction
comments: true
---

<div class="container mx-auto px-4 py-8">
    <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Diabetes Risk Prediction</h1>
        <p class="text-gray-600">Assess your risk of diabetes based on health factors</p>
    </header>
    <div class="flex flex-col md:flex-row gap-6">
        <!-- Input Form -->
        <div class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Patient Information</h2>
            <form id="predictionForm" class="space-y-4">
                <div class="flex items-center">
                    <input type="checkbox" id="highbp" name="highbp" class="w-4 h-4 text-blue-600 rounded">
                    <label for="highbp" class="ml-2 text-gray-700">High Blood Pressure</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="highchol" name="highchol" class="w-4 h-4 text-blue-600 rounded">
                    <label for="highchol" class="ml-2 text-gray-700">High Cholesterol</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="cholcheck" name="cholcheck" checked class="w-4 h-4 text-blue-600 rounded">
                    <label for="cholcheck" class="ml-2 text-gray-700">Cholesterol Check in Past 5 Years</label>
                </div>
                <div>
                    <label for="bmi" class="block text-gray-700 mb-1">BMI</label>
                    <input type="number" id="bmi" name="bmi" required min="10" max="60" step="0.1"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="smoker" name="smoker" class="w-4 h-4 text-blue-600 rounded">
                    <label for="smoker" class="ml-2 text-gray-700">Smoker (at least 100 cigarettes in life)</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="stroke" name="stroke" class="w-4 h-4 text-blue-600 rounded">
                    <label for="stroke" class="ml-2 text-gray-700">History of Stroke</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="heartdiseaseorattack" name="heartdiseaseorattack" class="w-4 h-4 text-blue-600 rounded">
                    <label for="heartdiseaseorattack" class="ml-2 text-gray-700">History of Heart Disease or Attack</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="physactivity" name="physactivity" checked class="w-4 h-4 text-blue-600 rounded">
                    <label for="physactivity" class="ml-2 text-gray-700">Physical Activity in Past 30 Days</label>
                </div>

                <div class="flex space-x-3 pt-4">
                    <button type="submit" id="predictBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center min-w-32">
                        <span id="btnText">Predict Diabetes Risk</span>
                        <svg id="loadingSpinner" class="hidden w-5 h-5 ml-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </button>
                    <button type="button" id="validateBtn" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                        Validate Data
                    </button>
                </div>
            </form>
        </div>

        <!-- Results Section -->
        <div class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 relative min-h-[500px]">
            <!-- Loading Overlay -->
            <div id="loadingOverlay" class="hidden absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center rounded-lg">
                <div class="text-center max-w-xs">
                    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                    <h3 class="text-lg font-medium text-gray-700">Analyzing Your Health Data</h3>
                    <p class="text-gray-500 text-sm mt-2">This comprehensive analysis may take 20-30 seconds...</p>
                    
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mt-6">
                        <div id="progressBar" class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    
                    <div id="healthTips" class="mt-6 text-sm text-gray-600 italic animate-pulse">
                        <p>Tip: Regular exercise can reduce diabetes risk by up to 30%</p>
                    </div>
                </div>
            </div>
            
            <h2 class="text-xl font-semibold mb-4">Prediction Result</h2>
            <div id="resultContainer" class="flex flex-col items-center justify-center h-64">
                <p class="text-gray-500">Submit your health information to get a prediction</p>
            </div>
            <div id="validationResult" class="hidden mt-4 p-3 rounded"></div>
            
            <!-- Feature Importance -->
            <div class="mt-8">
                <h3 class="text-lg font-medium mb-3">Feature Importance</h3>
                <div class="h-64">
                    <canvas id="featureChart"></canvas>
                </div>
                <button id="refreshFeatures" class="mt-3 px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                    Refresh Data
                </button>
            </div>
        </div>
    </div>
</div>

<script type="module">
    // Import Chart.js
    import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/+esm';
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    // DOM Elements
    const predictionForm = document.getElementById('predictionForm');
    const predictBtn = document.getElementById('predictBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('progressBar');
    const healthTips = document.getElementById('healthTips');
    const resultContainer = document.getElementById('resultContainer');
    const validationResult = document.getElementById('validationResult');
    const refreshFeaturesBtn = document.getElementById('refreshFeatures');
    let featureChart = null;
    let progressInterval;
    let tipsInterval;

    // Health tips to display during loading
    const tips = [
        "Walking 30 minutes daily reduces diabetes risk",
        "Eating whole grains helps maintain blood sugar levels",
        "Maintaining a healthy BMI is crucial for prevention",
        "Regular checkups can detect prediabetes early",
        "Reducing sugar intake lowers diabetes risk"
    ];

    // Initialize feature chart
    function initFeatureChart() {
        const ctx = document.getElementById('featureChart');
        if (!ctx) return;
        
        featureChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Rotate health tips during loading
    function startTipsRotation() {
        let counter = 0;
        healthTips.innerHTML = `<p>Tip: ${tips[counter]}</p>`;
        
        tipsInterval = setInterval(() => {
            counter = (counter + 1) % tips.length;
            healthTips.innerHTML = `<p>Tip: ${tips[counter]}</p>`;
        }, 5000);
    }

    // Form submission
    predictionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading states
        predictBtn.disabled = true;
        btnText.textContent = 'Processing...';
        loadingSpinner.classList.remove('hidden');
        loadingOverlay.classList.remove('hidden');
        
        // Start progress animation
        let progress = 0;
        progressBar.style.width = '0%';
        progressInterval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress > 85) progress = 85; // Cap at 85% until completion
            progressBar.style.width = `${progress}%`;
        }, 300);
        
        // Start showing health tips
        startTipsRotation();

        try {
            const formData = getFormData();
            const response = await fetch(`${pythonURI}/api/diabetes/predict`, {
                ...fetchOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Prediction failed');
            }

            const result = await response.json();
            
            // Complete progress animation
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            
            // Small delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            displayResult(result);
        } catch (error) {
            showError("Prediction failed: " + error.message);
        } finally {
            // Reset UI
            clearInterval(progressInterval);
            clearInterval(tipsInterval);
            predictBtn.disabled = false;
            btnText.textContent = 'Predict Diabetes Risk';
            loadingSpinner.classList.add('hidden');
            loadingOverlay.classList.add('hidden');
            progressBar.style.width = '0%';
        }
    });

    // Validate button
    validateBtn.addEventListener('click', async () => {
        const formData = getFormData();
        await validateData(formData);
    });

    // Refresh features
    refreshFeaturesBtn.addEventListener('click', async () => {
        await fetchFeatureWeights();
    });

    // Get form data
    function getFormData() {
        return {
            highbp: document.getElementById('highbp').checked,
            highchol: document.getElementById('highchol').checked,
            cholcheck: document.getElementById('cholcheck').checked,
            bmi: parseFloat(document.getElementById('bmi').value),
            smoker: document.getElementById('smoker').checked,
            stroke: document.getElementById('stroke').checked,
            heartdiseaseorattack: document.getElementById('heartdiseaseorattack').checked,
            physactivity: document.getElementById('physactivity').checked
        };
    }

   // In your script.js or within the <script> tags
    async function validateData(data) {
        try {
            // Convert checkbox values to integers (0 or 1)
            const payload = {
                highbp: data.highbp ? 1 : 0,
                highchol: data.highchol ? 1 : 0,
                cholcheck: data.cholcheck ? 1 : 0,
                bmi: data.bmi,
                smoker: data.smoker ? 1 : 0,
                stroke: data.stroke ? 1 : 0,
                heartdiseaseorattack: data.heartdiseaseorattack ? 1 : 0,
                physactivity: data.physactivity ? 1 : 0
            };

            const response = await fetch(`${pythonURI}/api/diabetes/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Validation failed');
            }

            const result = await response.json();
            
            validationResult.className = 'bg-green-100 text-green-800 p-3 rounded mt-4';
            validationResult.textContent = result.message || 'Data is valid';
            validationResult.classList.remove('hidden');
            
        } catch (error) {
            validationResult.className = 'bg-red-100 text-red-800 p-3 rounded mt-4';
            validationResult.textContent = error.message;
            validationResult.classList.remove('hidden');
        }
    }

    // Fetch feature weights
    async function fetchFeatureWeights() {
        try {
            if (!featureChart) initFeatureChart();
            
            const response = await fetch(`${pythonURI}/api/diabetes/feature-weights`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const weights = await response.json();
            
            featureChart.data = {
                labels: Object.keys(weights),
                datasets: [{
                    label: 'Feature Importance',
                    data: Object.values(weights),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            };
            featureChart.update();
        } catch (error) {
            console.error("Failed to fetch feature weights:", error);
            showError("Failed to load feature importance data");
        }
    }

    // Display prediction result
    function displayResult(result) {
        const probability = result.probability || result.prediction;
        const percentage = Math.round(probability * 100 * 10) / 10;
        
        let riskClass, riskText;
        if (probability < 0.3) {
            riskClass = 'bg-green-500';
            riskText = 'Low Risk';
        } else if (probability < 0.7) {
            riskClass = 'bg-yellow-500';
            riskText = 'Medium Risk';
        } else {
            riskClass = 'bg-red-500';
            riskText = 'High Risk';
        }

        resultContainer.innerHTML = `
            <div class="text-center">
                <div class="w-32 h-32 rounded-full ${riskClass} flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-2xl font-bold">${percentage}%</span>
                </div>
                <h3 class="text-xl font-medium">${riskText}</h3>
                <p class="text-gray-600">Probability of diabetes</p>
                ${result.risk_level ? `<p class="text-sm text-gray-500 mt-2">Risk Level: ${result.risk_level}</p>` : ''}
            </div>
        `;
    }

    // Show error message
    function showError(message) {
        validationResult.className = 'bg-red-100 text-red-800 p-3 rounded mt-4';
        validationResult.textContent = message;
        validationResult.classList.remove('hidden');
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
        initFeatureChart();
        fetchFeatureWeights();
    });
</script>

<style>
    /* Custom animations */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    #loadingOverlay {
        backdrop-filter: blur(3px);
        transition: opacity 0.3s ease;
    }
</style>