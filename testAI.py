import google.generativeai as genai
import os

# Use the environment variable "API_KEY" (the key name should match what you set in the terminal)
genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Write a story about a magic backpack.")
print(response.text)
