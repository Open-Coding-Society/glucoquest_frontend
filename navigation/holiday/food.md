---
layout: post
title: Food
permalink: /holiday/food/
comments: true
---
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Gifts</title>
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
        .product p {
            font-size: 0.9em;
            color: #555;
        }
        .product:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
    </style>
    <!-- Food Products -->
    <div class="product-list">
        <div class="product">
            <img src="{{site.baseurl}}/images/holiday christmas.jpeg" alt="Holiday Cookies">
            <h3>Holiday Cookies</h3>
            <p>Delicious handmade cookies with festive designs.</p>
        </div>
        <div class="product">
            <img src="{{site.baseurl}}/images/chocolate.jpeg" alt="Chocolate Gift Box">
            <h3>Chocolate Gift Box</h3>
            <p>A luxurious assortment of premium chocolates.</p>
        </div>
        <div class="product">
            <img src="{{site.baseurl}}/images/cheese set.jpeg" alt="Gourmet Cheese Set">
            <h3>Gourmet Cheese Set</h3>
            <p>Artisan cheeses perfect for any holiday celebration.</p>
        </div>
    </div>
</html>
