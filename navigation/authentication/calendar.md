---
layout: post
title: Calendar
permalink: /calendar
menu: nav/home.html
search_exclude: true
show_reading_time: false
author: nora + vibha
---
<style>
    body {
        background-image: url('images/greenbg.png');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }
    .container {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: auto;
        padding: 20px;
    }
    .calendar-container {
        width: 60%;
        text-align: center;
        padding: 20px;
        background: #8B0000;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .event-container {
        width: 35%;
        padding: 20px;
        background: #8B0000;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        padding: 10px;
    }
    .day-name, .day {
        text-align: center;
        padding: 10px;
        font-size: 16px;
        color: black;
    }
    .day {
        border: 1px solid #ddd;
        cursor: pointer;
        background: white;
        border-radius: 5px;
    }
    .day:hover {
        background: #800000;
    }
    .event-day {
        background-color: #800000;
    }
    .event-emoji {
        font-size: 20px;
        color: red;
        margin-top: 5px;
    }
    .event-container button {
        background: white;
        color: black;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
    }
    .event-container button:hover {
        background: #CD5C5C;
    }
    .event-item {
        position: relative;
        padding: 10px;
        margin: 10px 0;
        background-color: #8B0000;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .delete-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
        color: red;
        cursor: pointer;
    }

    .delete-icon:hover {
        color: darkred;
    }
</style>

<div class="container">
    <!-- Calendar Section -->
    <div class="calendar-container">
        <div class="calendar-header">
            <button id="prev-month" onclick="changeMonth(-1)">&#10094;</button>
            <div class="month-year" id="month-year"></div>
            <button id="next-month" onclick="changeMonth(1)">&#10095;</button>
        </div>
        <div class="calendar-grid" id="calendar-days"></div>
    </div>
    <!-- Event Form & List -->
    <div class="event-container">
        <h3 style="color: black;">Add Event</h3>
        <form id="eventForm">
            <label for="eventName" style="color: black;">Event Name:</label>
            <input type="text" id="eventName" required><br><br>
            <label for="eventLocation" style="color: black;">Location:</label>
            <input type="text" id="eventLocation" required><br><br>
            <label for="startDate" style="color: black;">Date:</label>
            <input type="date" id="startDate" required><br><br>
            <button type="submit">Save Event</button>
        </form>
        <h3 style="color: black; margin-top: 20px;">Your Events</h3>
        <div id="event-list"></div>
    </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let events = [];

  document.addEventListener('DOMContentLoaded', function() {
      initializeCalendar();
      fetchEvents(); // Load existing events from database
  });

  function initializeCalendar() {
      renderCalendar();
  }

  function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendarDays = document.getElementById("calendar-days");
    monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    calendarDays.innerHTML = "";

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarDays.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;

        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const eventsOnDay = events.filter(event => new Date(event.date).toISOString().split("T")[0] === formattedDate);

        if (eventsOnDay.length > 0) {
            dayCell.classList.add("event-day");

            eventsOnDay.forEach(event => {
                const emoji = document.createElement("div");
                emoji.classList.add("event-emoji");
                emoji.textContent = "❗";
                emoji.title = `${event.name} @ ${event.location}`; // Tooltip when hovering
                dayCell.appendChild(emoji);
            });
        }

        dayCell.addEventListener("click", () => {
            document.getElementById("startDate").value = formattedDate;
        });

        calendarDays.appendChild(dayCell);
    }
}

window.changeMonth = function (direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    fetchEvents(); // Fetch events for the new month
    renderCalendar(); // Update the calendar view immediately
};


  document.getElementById("eventForm").addEventListener("submit", async function(event) {
      event.preventDefault();

      const postData = {
          name: document.getElementById("eventName").value,
          location: document.getElementById("eventLocation").value,
          date: document.getElementById("startDate").value,  // YYYY-MM-DD format
      };

      console.log("Event Data:", postData);  // Log event data for debugging

      try {
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

          const createdEvent = await response.json();
          alert("Event added successfully!");

          if (createdEvent.id) {
              events.push(createdEvent);
              renderCalendar(); // Update calendar display
              displayEvents(); // Show updated event list
          } else {
              console.error("Error: Event created but no ID returned from API");
          }

          this.reset(); // Clear the form
      } catch (error) {
          console.error("Error:", error);
          alert("Error adding event. Please try again.");
      }
  });

    function displayEvents() {
        const eventList = document.getElementById("event-list");
        eventList.innerHTML = ""; // Clear the existing event list

        const currentMonthDate = new Date(currentYear, currentMonth, 1);
        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        if (filteredEvents.length === 0) {
            eventList.innerHTML = "<p>No events for this month.</p>";
        } else {
            filteredEvents.forEach(event => {
                const eventItem = document.createElement("div");
                eventItem.classList.add("event-item"); // Add class for styling
                eventItem.textContent = `${event.date}: ${event.name} @ ${event.location}`;

                // Create delete icon (X or trash can)
                const deleteIcon = document.createElement("span");
                deleteIcon.classList.add("delete-icon"); // Add class for styling
                deleteIcon.textContent = "❌";  // You can replace this with a trash can emoji or icon
                deleteIcon.onclick = () => deleteEvent(event.event_id);  // Use event.event_id
                eventItem.appendChild(deleteIcon);

                eventList.appendChild(eventItem);
            });
        }
    }


async function fetchEvents() {
    try {
        const response = await fetch(`${pythonURI}/api/events?month=${currentMonth + 1}&year=${currentYear}`, { ...fetchOptions, method: 'GET' });

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        events = await response.json();
        renderCalendar(); // Now render calendar with the updated events
        displayEvents();
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

async function deleteEvent(eventId) {
    // Define delete data as a constant
    const delData = { event_id: eventId };  // Use event_id here instead of id
    console.log("Deleting event with data:", delData); // Debugging log

    try {
        const response = await fetch(`${pythonURI}/api/event`, {
            ...fetchOptions,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(delData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete event: ${response.statusText} - ${errorMessage}`);
        }

        console.log("Event deleted successfully!");
        alert("Event deleted successfully!");
        fetchEvents(); // Refresh event list
    } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event. Please try again.");
    }
}

</script>