---
layout: post
title: Clothes
permalink: /holiday/clothes/
comments: true
---
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothes Gifts</title>
    <style>
        /* General Page Styles */
        body {
            font-family: Arial, sans-serif;
            background: #111;
            color: #fff;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        header h1 {
            font-size: 2.5em;
            margin: 20px 0;
            background: rgba(0, 0, 0, 0.6);
            padding: 10px 20px;
            border-radius: 10px;
        }
        /* Product List */
        .product-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px auto;
            padding: 20px;
            max-width: 800px;
        }
        .product {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .product img {
            max-width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }
        .product h3 {
            font-size: 1.2em;
            color: #333;
        }
    </style>
    <!-- Product List -->
    <div class="product-list">
        <div class="product" data-item="Holiday Sweater">
            <img src="{{site.baseurl}}/images/holiday sweater.jpeg" alt="Holiday Sweater">
            <h3>Holiday Sweater</h3>
        </div>
        <div class="product" data-item="Winter Scarf">
            <img src="{{site.baseurl}}/images/Winter Scarf.jpeg" alt="Winter Scarf">
            <h3>Winter Scarf</h3>
        </div>
        <div class="product" data-item="Beanie Hat">
            <img src="{{site.baseurl}}/images/Winter Beanie.jpeg" alt="Beanie Hat">
            <h3>Beanie Hat</h3>
        </div>
    </div>
</html>
