---
layout: post
title: Profile Settings
permalink: /profile_page/
menu: nav/home.html
search_exclude: true
show_reading_time: false
---

<style>
body {
    background-image: url('{{ site.baseurl }}/images/trees.png');
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
    min-height: 100vh;
    background-size: 600px auto; /* Adjust width */
}
</style>
<div class="body">
 <div class="card">
   <form>
     <div>
       <label for="newUid">Enter New UID:</label>
       <input type="text" id="newUid" placeholder="New UID">
     </div>
     <div>
       <label for="newName">Enter New Name:</label>
       <input type="text" id="newName" placeholder="New Name">
     </div>
      <div>
       <label for="newPassword">Enter New Password:</label>
       <input type="text" id="newPassword" placeholder="New Password">
     </div>
     <br>
     <br>
     <label for="profilePicture" class="file-icon"> Upload Profile Picture <i class="fas fa-upload"></i>
     </label>
     <input type="file" id="profilePicture" accept="image/*" onchange="saveProfilePicture()">
     <div class="image-container" id="profileImageBox">
         <!-- Profile picture will be displayed here -->
     </div>
     <p id="profile-message" style="color: red;"></p>
   </form>
 </div>
</div>

<script type="module">
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";

// Profile-related functions remain here (excluding calendar and notification functions)
</script>

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/notif_styles.css">
