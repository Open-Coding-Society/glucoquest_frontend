---
layout: post
title: Glucose Hero
search_exclude: true
permalink: /lifestyle/
---



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glucose Tracker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header class="my-4">
            <h1 class="text-center">Glucose Tracker</h1>
            <div id="auth-buttons" class="text-end">
                <button id="login-btn" class="btn btn-primary">Login</button>
                <button id="register-btn" class="btn btn-secondary">Register</button>
            </div>
            <div id="user-info" class="text-end d-none">
                <span id="username-display" class="me-3"></span>
                <button id="logout-btn" class="btn btn-danger">Logout</button>
            </div>
        </header>
     <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3>Add New Glucose Log</h3>
                    </div>
                    <div class="card-body">
                        <form id="glucoseForm">
                            <div class="mb-3">
                                <label for="action" class="form-label">Action</label>
                                <input type="text" class="form-control" id="action" required>
                            </div>
                            <div class="mb-3">
                                <label for="impact" class="form-label">Impact (mg/dL)</label>
                                <input type="number" class="form-control" id="impact" required>
                            </div>
                            <div class="mb-3">
                                <label for="glucose_level" class="form-label">Glucose Level (mg/dL)</label>
                                <input type="number" class="form-control" id="glucose_level" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Add Log</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3>Statistics</h3>
                    </div>
                    <div class="card-body">
                        <div id="stats">
                            <p>Login to view your statistics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

   <div class="card">
            <div class="card-header">
                <h3>Your Glucose Logs <span id="count" class="badge bg-secondary"></span></h3>
            </div>
            <div class="card-body">
                <div id="logs-container">
                    <p>Please login to view your logs</p>
                </div>
            </div>
        </div>
    </div>

 <script type="module" src="app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>