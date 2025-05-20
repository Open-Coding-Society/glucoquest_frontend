---
permalink: /grandprix/
title: Glucose Grand Prix
show_reading_time: false
categories: [Game]
---
<style>
#canvasContainer {
    align-items: center;
}
    
canvas {
    display: block;
    margin: 0 auto;
}
</style>

<div id="canvasContainer">
    <div id="help">
        Dodge obstacles and answer diabetes trivia questions while you ride your way to the finish line!
    </div><br>
  <canvas id="gameCanvas" width="360" height="639"></canvas>
</div>

<script type="module">
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const assets = {
    background: {
      src: "{{site.baseurl}}/images/grandprix/road.jpg",
    },
    cars: {
      default: {
        src: "{{site.baseurl}}/images/grandprix/default.png",
        width: 256,
        height: 256
      },
      audi: {
        src: "{{site.baseurl}}/images/grandprix/audi.png",
        width: 256,
        height: 256
      },
      viper: {
        src: "{{site.baseurl}}/images/grandprix/viper.png",
        width: 256,
        height: 256
      },
      truck: {
        src: "{{site.baseurl}}/images/grandprix/truck.png",
        width: 256,
        height: 256
      }
    }
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function drawGame() {
    try {
      const bgImg = await loadImage(assets.background.src);
      const carImg = await loadImage(assets.cars.default.src);

      // Draw road background to fill the canvas
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      // Draw car
      const carScale = 0.4;
      const carWidth = assets.cars.default.width * carScale;
      const carHeight = assets.cars.default.height * carScale;
      const carX = canvas.width / 2 - carWidth / 2;
      const carY = canvas.height - carHeight - 20;

      ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
    } catch (e) {
      console.error("Error loading images:", e);
    }
  }

  drawGame();
</script>