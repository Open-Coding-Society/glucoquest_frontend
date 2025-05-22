---
layout: post
title: Perfect Plate
permalink: /glucoserush/
comment: true
---


<div class="game-container">
  <iframe src="{{ site.baseurl }}/healthyplate/healthy_plate.html" class="game-iframe" allowfullscreen></iframe>
  <a href="{{ site.baseurl }}/healthyplate/healthy_plate.html" target="_blank" class="fullscreen-link">
    ⛶ Open Fullscreen
  </a>
</div>

<style>
.game-container {
  position: relative;
  padding-bottom: 75%; /* 4:3 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background: #1a5276;
}

.game-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.fullscreen-link {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 8px 15px;
  background: rgba(0, 120, 215, 0.8);
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  z-index: 10;
  transition: all 0.3s;
}

.fullscreen-link:hover {
  background: rgba(0, 120, 215, 1);
  transform: scale(1.05);
}
</style>