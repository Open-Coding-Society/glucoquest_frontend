---
layout: post
title: Event Calendar
permalink: /holiday/event_calendar/
author: Vibha Mandayam
comments: true
---

<div class="main-content">
    <!-- Calendar on the left -->
    <div class="calendar-container">
        <div class="calendar-header">
            <button id="prev-month">&#10094;</button>
            <div class="month-year" id="month-year"></div>
            <button id="next-month">&#10095;</button>
        </div>
        <div class="calendar-grid">
            <div class="day-name">Sun</div>
            <div class="day-name">Mon</div>
            <div class="day-name">Tue</div>
            <div class="day-name">Wed</div>
            <div class="day-name">Thu</div>
            <div class="day-name">Fri</div>
            <div class="day-name">Sat</div>
        </div>
        <div class="calendar-days" id="calendar-days"></div>
    </div>
    <!-- Sidebar for Upcoming Events on the right -->
    <div class="upcoming-events">
        <h3 style="color: black; font-size: 24px; font-weight: bold;">Upcoming Events</h3>
        <div id="event-list">
            <!-- Event cards will be dynamically populated here -->
        </div>
    </div>
</div>

<!-- Modal for Event Form -->
<div id="eventModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h3>Add Event</h3>
        <form id="eventForm">
            <label for="eventName" style="color: black;">Event Name:</label>
            <input type="text" id="eventName" name="eventName" required><br><br>
            <label for="eventLocation" style="color: black;">Location:</label>
            <input type="text" id="eventLocation" name="eventLocation" required><br><br>
            <label for="startDate" style="color: black;">Date:</label>
            <input type="date" id="startDate" name="startDate" required><br><br>
            <button type="submit">Save Event</button>
        </form>
    </div>
</div>

<!-- Link to external styles.css -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/styles.css">
<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
  console.log("Event Calendar script loaded");
  // Handle the form submission to create a new event
  document.getElementById("eventForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const postData = {
        name: document.getElementById("eventName").value,
        location: document.getElementById("eventLocation").value,
        date: document.getElementById("startDate").value,  // This will be in YYYY-MM-DD format
    };
    console.log("Event Data:", postData);  // Log the event data to check before sending
    const response = await fetch(`${pythonURI}/api/event`, {
        ...fetchOptions,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add event: ${response.statusText} - ${errorMessage}`);
        }
        const createdEvent = await response.json(); // Assuming API returns the full event
        alert("Event added successfully!");
        // Ensure the event has an ID before pushing it to events
       // Ensure the event has an ID before pushing it to events
        if (createdEvent.id) {
            events.push(createdEvent); 
        } else {
            console.error("Error: Event created but no ID returned from API");
        }
        renderSidebar(events);
        renderCalendar(events);
        closeModal();
    });
  let currentMonth = new Date().getMonth(); // Track the current month
  let events = [];  // Store the events globally
  document.addEventListener('DOMContentLoaded', function() {
      console.log("Base URL:", pythonURI);  // Debugging line
      // Fetch the user ID and then get the events for the user
      getUserId(pythonURI)  // Get user ID first
          .then(userId => {
              if (userId) {
                  getUserEvents(userId)  // Fetch events based on user ID
                      .then(fetchedEvents => {
                          events = fetchedEvents;  // Store events globally
                          renderCalendar(events);  // Pass events to the calendar
                          renderSidebar(events);   // Pass events to the sidebar
                      })
                      .catch(err => console.error("Error fetching events: ", err));
              }
          })
          .catch(err => {
              console.error("Error fetching user ID: ", err);
          });
      // Attach event listeners for month navigation buttons
      document.getElementById('prev-month').addEventListener('click', function() {
          changeMonth(-1);  // Go to the previous month
      });
      document.getElementById('next-month').addEventListener('click', function() {
          changeMonth(1);   // Go to the next month
      });
  });
  // Function to delete an event
    async function deleteEvent(eventId) {
        try {
            const response = await fetch(`${pythonURI}/api/event/${eventId}`, {
                ...fetchOptions,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete event: ${response.statusText} - ${errorMessage}`);
            }
            alert("Event deleted successfully!");
            events = events.filter(event => event.id !== eventId);  // Remove from local array
            renderSidebar(events);
            renderCalendar(events);
        } catch (error) {
            console.error('Error deleting event:', error.message);
            alert(`Error deleting event: ${error.message}`);
        }
    }
  function getUserId(baseurl) {
      const URL = baseurl + '/api/id';  // Endpoint to get the user info (including user ID)
      return fetch(URL, fetchOptions)
          .then(response => {
              if (response.status !== 200) {
                  console.error("HTTP status code: " + response.status);
                  return null;
              }
              return response.json();
          })
          .then(data => {
              if (data && data.id) {
                  console.log("User ID fetched:", data.id);
                  return data.id;  // Return the user ID
              }
              return null;
          })
          .catch(err => {
              console.error("Error fetching user ID:", err);
              return null;
          });
  }
  function getUserEvents(userId) {
      const URL = pythonURI + '/api/events/user/' + userId;  // Get events for the specific user
      return fetch(URL, fetchOptions)
          .then(response => {
              if (response.status !== 200) {
                  console.error("HTTP status code: " + response.status);
                  return [];
              }
              return response.json();
          })
          .then(events => {
              console.log("Events fetched:", events);
              return events;  // Return the events data
          })
          .catch(err => {
              console.error("Error fetching events:", err);
              return [];
          });
  }
  function renderCalendar(events) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = new Date();
    const monthYear = document.getElementById("month-year");
    const calendarDays = document.getElementById("calendar-days");
    // Set the month and year at the top
    monthYear.textContent = `${monthNames[currentMonth]} ${currentDate.getFullYear()}`;
    // Get the first day of the month
    const firstDay = new Date(currentDate.getFullYear(), currentMonth, 1);
    const lastDate = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    const totalDays = lastDate.getDate();
    // Clear existing days
    calendarDays.innerHTML = "";
    // Fill in the empty cells before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day");
        calendarDays.appendChild(emptyCell);
    }
    // Fill in the days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        // Highlight the current day
        if (day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
            dayCell.classList.add("current-day");
        }
        // Check if the current day has an event
        const eventDateString = `${currentDate.getFullYear()}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (events.some(event => event.date === eventDateString)) {
            const dot = document.createElement("span");
            dot.classList.add("event-dot");  // Add a class for styling blue dots
            dayCell.appendChild(dot);
        }
        dayCell.textContent = day;
        // When a day is clicked, open the modal and prefill the date
        dayCell.addEventListener("click", function() {
            openModal(day);
        });
        calendarDays.appendChild(dayCell);
    }
  }
  function renderSidebar(events) {
    const upcomingEventsContainer = document.getElementById("event-list");
    upcomingEventsContainer.innerHTML = "";  // Clear existing events
    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedEvents.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");
        eventItem.style.padding = "15px";
        eventItem.style.border = "1px solid #ddd";
        eventItem.style.marginBottom = "15px";
        eventItem.style.borderRadius = "8px";
        eventItem.style.backgroundColor = "#f9f9f9";
        // Event Name
        const eventName = document.createElement("div");
        eventName.classList.add("event-name");
        eventName.textContent = event.name;
        eventName.style.fontWeight = "bold";
        eventName.style.color = "black";
        // Event Location
        const eventLocation = document.createElement("div");
        eventLocation.classList.add("event-location");
        eventLocation.textContent = event.location;
        eventLocation.style.color = "black";
        // Event Date
        const eventDate = document.createElement("div");
        eventDate.classList.add("event-date");
        const eventDateObject = new Date(event.date);
        eventDate.textContent = eventDateObject.toLocaleDateString();
        eventDate.style.color = "black";
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "#ff4d4d";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.marginTop = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.borderRadius = "5px";
        // Add event listener for delete action
        deleteButton.addEventListener("click", async () => {
            const confirmDelete = confirm(`Are you sure you want to delete "${event.name}"?`);
            if (confirmDelete) {
                await deleteEvent(event.id);
            }
        });
        eventItem.appendChild(eventName);
        eventItem.appendChild(eventLocation);
        eventItem.appendChild(eventDate);
        eventItem.appendChild(deleteButton);  // Append delete button
        upcomingEventsContainer.appendChild(eventItem);
    });
}
  function openModal(date) {
    document.getElementById("eventModal").style.display = "block";
    const currentYear = new Date().getFullYear(); // Keep current year constant
    const formattedDate = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
    document.getElementById("startDate").value = formattedDate;
}
  function closeModal() {
    document.getElementById("eventModal").style.display = "none";
    document.getElementById("eventForm").reset();
  }
  function changeMonth(direction) {
      currentMonth += direction;
      if (currentMonth < 0) currentMonth = 11;
      if (currentMonth > 11) currentMonth = 0;
      renderCalendar(events);  // Re-render the calendar with the updated month
  }
  window.addEventListener("click", function(event) {
    const modal = document.getElementById("eventModal");
    if (event.target === modal) {
        closeModal();
    }
});
</script>
