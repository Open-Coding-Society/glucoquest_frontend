---
layout: page 
title: Login
permalink: /login
search_exclude: true
show_reading_time: false 
---

<style>
.login-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* allows the cards to wrap onto the next line if the screen is too small */
}

.login-card {
    margin-top: 0; /* remove the top margin */
    width: 45%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
}

.login-card h1 {
    margin-bottom: 20px;
}

.signup-card {
    margin-top: 0; /* remove the top margin */
    width: 45%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
}

.signup-card h1 {
    margin-bottom: 20px;
}

</style>

<!-- Import Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-2xl bg-white p-8 shadow-lg rounded-xl">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Login Card -->
            <div class="p-6 bg-gray-50 shadow-md rounded-lg">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">User Login</h2>
                <form onsubmit="pythonLogin(); return false;">
                    <div class="mb-4">
                        <label class="block text-gray-600">GitHub ID</label>
                        <input type="text" id="uid" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-600">Password</label>
                        <input type="password" id="password" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                    <p id="message" class="text-red-500 text-sm mt-2"></p>
                </form>
            </div>
            <!-- Signup Card -->
            <div class="p-6 bg-gray-50 shadow-md rounded-lg">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">Sign Up</h2>
                <form id="signupForm" onsubmit="signup(); return false;">
                    <div class="mb-4">
                        <label class="block text-gray-600">Name</label>
                        <input type="text" id="name" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-600">GitHub ID</label>
                        <input type="text" id="signupUid" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-600">Password</label>
                        <input type="password" id="signupPassword" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                        Sign Up
                    </button>
                    <p id="signupMessage" class="text-green-500 text-sm mt-2"></p>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="module">
    import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to handle Python login
    window.pythonLogin = function() {
        const options = {
            URL: `${pythonURI}/api/authenticate`,
            callback: pythonDatabase,
            message: "message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            }
        };
        login(options);
    }

    // Function to handle signup
    window.signup = function() {
    const signupButton = document.querySelector(".signup-card button");

    // Disable the button and change its color
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3'; // Light gray to indicate disabled state

    const signupOptions = {
        URL: `${pythonURI}/api/user`,
        method: "POST",
        cache: "no-cache",
        body: {
            name: document.getElementById("name").value,
            uid: document.getElementById("signupUid").value,
            password: document.getElementById("signupPassword").value,
        }
    };

    fetch(signupOptions.URL, {
        method: signupOptions.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupOptions.body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Signup failed: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("signupMessage").textContent = "Signup successful!";
        // Optionally redirect to login page or handle as needed
        // window.location.href = '{{site.baseurl}}/profile';
    })
    .catch(error => {
        console.error("Signup Error:", error);
        document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
        // Re-enable the button if there is an error
        signupButton.disabled = false;
        signupButton.style.backgroundColor = ''; // Reset to default color
    });
}


    // Function to fetch and display Python data
    function pythonDatabase() {
        const URL = `${pythonURI}/api/id`;

        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Flask server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = '{{site.baseurl}}/profile';
            })
            .catch(error => {
                console.error("Python Database Error:", error);
                const errorMsg = `Python Database Error: ${error.message}`;
            });
    }

    // Call relevant database functions on the page load
    window.onload = function() {
         pythonDatabase();
    };
</script>