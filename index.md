---
layout: post
title: Dexcom Glucose Education Game
search_exclude: true
hide: true
menu: nav/home.html
show_reading_time: false
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dexcom Glucose Education Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Loading Screen */
        .loader {
            border-top-color: #1E3A8A;
            animation: spin 1s infinite linear;
        }
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        /* Fade-in animation */
        .fade-in {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s ease-out, transform 1s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        /* Gradient Animation */
        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 10s ease infinite;
        }
        /* Typewriter effect */
        .typewriter {
            font-size: 6rem;
            font-weight: 900;
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            word-spacing: 1em;
            line-height: 1.2;
        }
        .typewriter .text {
            display: inline-block;
            opacity: 0;
        }
        .second-line {
            display: block;
        }
    </style>
</head>

<body class="bg-black text-white relative">
    <!-- Loading Screen -->
    <div id="loading-screen" class="fixed inset-0 bg-blue-200 flex items-center justify-center z-50">
        <div class="text-center">
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-32 w-32 mb-4"></div>
            <h2 class="text-4xl font-semibold text-blue-900">Loading...</h2>
        </div>
    </div>
    <!-- Background Animation -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-500 w-full h-full opacity-50 animate-gradient"></div>
    </div>
    <!-- Welcome Section with Typewriter Effect -->
    <section id="welcome" class="h-screen flex items-center justify-center text-center bg-black text-blue-200">
        <h1 class="typewriter"></h1>
    </section>
    <!-- About Us Section -->
    <section id="about" class="h-screen flex flex-col items-center justify-center text-center bg-blue-100 text-black">
        <h2 class="text-7xl font-extrabold text-blue-600 fade-in mb-6">About Us</h2>
        <p class="text-3xl text-green-900 max-w-5xl fade-in">
            The Dexcom Interactive Glucose Education Game is designed to help users learn how to manage glucose levels through fun and interactive challenges. Our mission is to promote awareness and education about continuous glucose monitoring (CGM) technology.
        </p>
    </section>
    <!-- Our Mission Section -->
    <section id="mission" class="h-screen flex flex-col items-center justify-center text-center bg-green-100 text-black">
        <h3 class="text-6xl font-bold mt-8 text-green-900 fade-in">Our Mission</h3>
        <p class="text-3xl text-green-700 mt-4 max-w-5xl fade-in">
            Our mission is to raise awareness about the importance of managing glucose levels and provide users with a fun, engaging way to learn about CGM technology. Through personalized challenges and feedback, we aim to empower individuals to take control of their health.
        </p>
    </section>
    <!-- Features Section -->
    <section id="ai-solutions" class="py-20 bg-yellow-100">
        <h2 class="text-7xl font-bold text-center text-yellow-900 mb-10 fade-in">Game Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <div class="p-6">
                    <h3 class="text-3xl font-bold mb-2 text-blue-900">Interactive Challenges</h3>
                    <p class="text-xl text-yellow-800">Engage in fun and educational challenges to test your glucose management knowledge.</p>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <div class="p-6">
                    <h3 class="text-3xl font-bold mb-2 text-blue-900">Personalized Feedback</h3>
                    <p class="text-xl text-yellow-800">Receive real-time feedback to improve your understanding of glucose monitoring and decision-making.</p>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <div class="p-6">
                    <h3 class="text-3xl font-bold mb-2 text-blue-900">Progress Tracking</h3>
                    <p class="text-xl text-yellow-800">Track your progress and see how much you’ve learned with personalized game metrics.</p>
                </div>
            </div>
        </div>
    </section>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const loadingScreen = document.getElementById('loading-screen');
            window.addEventListener('load', function() {
                loadingScreen.style.display = 'none';
            });
            // Typewriter effect for the welcome message
            const text = "Welcome to\nDexcom Glucose\nEducation Game";
            const typewriterElement = document.querySelector(".typewriter");
            let index = 0;
            function type() {
                if (index < text.length) {
                    const span = document.createElement('span');
                    span.textContent = text.charAt(index);
                    span.classList.add('text');
                    typewriterElement.appendChild(span);
                    setTimeout(() => {
                        span.style.opacity = 1;
                    }, 50 * index);
                    index++;
                    setTimeout(type, 80);
                }
            }
            type();
            // Fade in effect
            const fadeInElements = document.querySelectorAll('.fade-in');
            window.addEventListener('scroll', function() {
                fadeInElements.forEach(function(element) {
                    if (element.getBoundingClientRect().top < window.innerHeight) {
                        element.classList.add('visible');
                    }
                });
            });
        });
    </script>
</body>
