---
layout: post
title: AWS Deployment Blog
search_exclude: true
permalink: /aws/
---

## Project Structure
![diagram]({{ site.baseurl }}/images/aws_blog_diagram.png)

### Backend
- Our backend is **Flask-based**, running on port **8206** for API requests.
- It processes event data, manages user profiles, and handles notifications.
- All API routes are managed in `main.py`, with separate modules for each feature.

### Frontend
- The frontend runs on port **4887**, communicating with the backend via **RESTful APIs**.
- It fetches and updates data dynamically, enhancing user experience.
- The frontend sends API requests to the backend, which interacts with the database and returns data.
- The user interface updates accordingly based on API responses.

---
## Features Working with Frontend to Backend

### **Event Calendar**
- **Backend:** Handles CRUD operations for events via `/api/events`.
- **Frontend:** Displays upcoming events, allows users to create and delete events.
- **Database:** Stores event details such as name, date, location, and attendees.

### **Notification System**
- **Backend:** Generates and stores notifications, providing endpoints at `/api/notifications`.
- **Frontend:** Fetches unread notifications and displays alerts to users.

### **Search Bar**
- **Backend:** Implements search functionality at `/api/search`, querying event names and descriptions.
- **Frontend:** Filters and displays search results dynamically.
- **Database:** Stores/adds tags to items user interacts with to create a future profile of interests and liked items.

### **Profile Creator**
- **Backend:** Manages user accounts and profile data via `/api/profile_page`.
- **Frontend:** Allows users to set up and edit their profiles.
- **Authentication:** Uses **JWT** for secure logins.

### **Survey Feature**
- **Backend:** Stores and processes survey responses at `/api/survey`.
- **Frontend:** Presents surveys and submits user feedback.

---
## **Deployment Process on AWS**

### Prerequisites  
- Ensure the frontend and backend are properly connected and tested locally.  
- Prepare the necessary configuration files, including `Dockerfile`, `docker-compose.yml`, and `nginx` settings.  
- Set up a DNS subdomain using AWS Route 53.  

### **Initial Deployment Steps**
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-directory>
   ```

2. Create a `.env` file inside the backend project folder and add necessary environment variables (such as passwords).

3. Initialize the database:
   ```sh
   ./scripts/db_init.py
   ```

4. Build and deploy using Docker:
   ```sh
   docker-compose build
   docker-compose up -d
   ```

5. Verify the running container:
   ```sh
   docker ps
   ```

6. Test the server:
   ```sh
   curl localhost:8206  # Ensure the port matches your updated backend port
   ```

### **Port Selection & Docker Setup**  
- Choose a backend port (`8206`) and ensure consistency across all configuration files.  
- Update `main.py`, `Dockerfile`, and `docker-compose.yml` to use the correct port.  
- Test the Docker container locally using `docker-compose up`.  

### **AWS EC2 Access & Deployment**  
- Log in to AWS EC2 and clone the backend repository.  
- Build and deploy the backend using:
  ```sh
  docker-compose up -d --build
  ```

### **DNS & Nginx Setup**
- Configure a subdomain via AWS Route 53.
- Set up an Nginx reverse proxy to route requests to the backend.
- Activate and validate the Nginx configuration.

### **SSL & HTTPS Configuration**
- Use Certbot to obtain an SSL certificate for HTTPS.
- Redirect all HTTP traffic to HTTPS for secure access.

### **Maintaining Deployment**
- Before making changes, pull the latest code from GitHub.
- Test changes locally before pushing updates.
- Restart the deployment on AWS by pulling changes and rebuilding the container.

---
## **Scalability, Security, and Reliability**  

### **Scalability: Handling Multiple Users Efficiently**  
- **Gunicorn with Multiple Workers:** Ensures efficient request handling.  
- **Dockerized Deployment:** Allows easy scaling by running multiple containers.  
- **AWS Load Balancer (Future Consideration):** Can distribute traffic if scaling beyond one instance.  

### **Security: Protecting Data and Access**  
- **Firewall & Security Groups:** Restrict unauthorized access to the backend.  
- **JWT Authentication:** Ensures secure API access.  
- **Nginx as Reverse Proxy:** Adds an extra security layer by handling incoming requests.  
- **SSL/TLS Encryption (Certbot):** Enables HTTPS for secure data transmission.  
- **Docker Isolation:** Runs services in containers to minimize security risks.  

### **Reliability: Keeping the App Running Smoothly**  
- **AWS CloudWatch Logs (Future Consideration):** Can be used for monitoring errors.  
- **Nginx Error Handling:** Manages failures with proper routing.  
- **Automatic Container Restarts:** Ensures uptime if a service crashes.  
- **Daily Backups (To Be Implemented):** Helps prevent data loss.  

---
