# GlucoQuest

**GlucoQuest** is an interactive web application designed to educate users about diabetes and blood glucose management through engaging games, quizzes, and visual tools. Developed by students in collaboration with **Dexcom** and **PilotCity**, this project blends health awareness with gamified learning experiences.

It also serves as a real-world learning platform for students exploring **frontend development**, **backend APIs**, **GitHub workflows**, and **technical documentation**.

---

## Project Goals

- Raise awareness about diabetes and blood glucose regulation.
- Use **gamification** to make learning fun and memorable.
- Provide Dexcom with a prototype to boost user engagement by 30% on social media.
- Support student learning and reflection through GitHub Pages and technical blogging.

---

## Features

### Educational Games

- **Glucose Grand Prix**  
  Race on a glucose-themed track. Answer questions correctly to speed up and win!

- **Pin the Dexcom**  
  A placement game that teaches users where to apply the Dexcom CGM device.

- **Perfect Plate**  
  Catch healthy foods on your plate while avoiding unhealthy ones to complete a balanced meal.

---

### Learning Tools

- **Drag-and-Drop Diagrams**  
  Interactive models to visualize key concepts.

- **Flashcards**  
  Review terms and facts quickly using digital cards.

- **Quizzes with AI Feedback**  
  Test your knowledge and get instant responses powered by AI.

---

##  Technical Stack

- **Frontend**: JavaScript, HTML, Tailwind CSS — deployed with GitHub Pages  
- **Backend**: Python (Flask API) or Node.js — hosted locally or on the cloud  
- **Data**: Educational content curated by students and mentors  
- **CI/CD**: GitHub Actions for automated deployment and site regeneration

---

## Student Blogging & Contributions

Contributors maintain **Jupyter Notebooks** and **Markdown blogs** to:

- Reflect on development progress
- Explain technical choices
- Document game mechanics and user feedback

All posts are tagged, searchable, and follow Nighthawk Pages blogging structure for clear, consistent presentation.

---

## GitHub Pages setup

The absolutes in setup up...

**Activate GitHub Pages Actions**: This step involves enabling GitHub Pages Actions for your project. By doing so, your project will be automatically deployed using GitHub Pages Actions, ensuring that your project is always up to date with the latest changes you push to your repository.

- On the GitHub website for the repository go to the menu: Settings -> Pages ->Build
- Under the Deployment location on the page, select "GitHub Actions".

**Update `_config.yml`**: You need to modify the `_config.yml` file to reflect your repository's name. This configuration is crucial because it ensures that your project's styling is correctly applied, making your deployed site look as intended rather than unstyled or broken.

```text
github_repo: "glucoquest_frontend" 
baseurl: "/glucoquest_frontend"
```

**Set Repository Name in Makefile**: Adjust the `REPO_NAME` variable in your Makefile to match your GitHub repository's name. This action facilitates the automatic updating of posts and notebooks on your local development server, improving the development process.

```make
# Configuration, override port with usage: make PORT=4200
PORT ?= 4887
REPO_NAME ?= glucoquest_frontend 
LOG_FILE = /tmp/jekyll$(PORT).log
```

### Tool requirements

All `GitHub Pages` websites are managed on GitHub infrastructure and use GitHub version control.  Each time we change files in GitHub it initiates a GitHub Action, a continuous integration and development toolset, that rebuilds and publishes the site with Jekyll.  

- GitHub uses `Jekyll` to transform your markdown and HTML content into static websites and blogs. [Jekyll](https://jekyllrb.com/).
- A Linux shell is required to work with this project integration with GitHub Pages, GitHub and VSCode.  Ubuntu is the preferred shell, though MacOS shell is supported as well.  There will be some key setup scripts that follow in the README.
- Visual Studio Code is the Nighthawk Pages author's preferred code editor and extensible development environment.  VSCode has a rich ecosystem of developer extensions that ease working with GitHub Pages, GitHub, and many programming languages.  Setting up VSCode and extensions will be elaborated upon in this document.
- An anatomy section in this README will describe GitHub Pages and conventions that are used to organize content and files.  This includes file names, key coding files, metadata tagging of blogs, styling tooling for blogs, etc.

### Development Environment Setup

Comprehensive start. A topic-by-topic guide to getting this project running is published [here](https://opencodingsociety.github.io/portfolio_2025/devops/tools/home).

Quick start.  A quick start below is a reminder, but is dependent on your knowledge.  Only follow this instruction if you need a refresher.  Always default to the comprehensive start if any problem occurs.

#### Clone Repo

Run these commands to obtain the project, then locate into the project directory with the terminal, install an extensive set of tools, and make.

```bash
git clone <this-repo> # git clone https://github.com/vibha1019/glucoquest_frontend.git 
cd <repo-dir>/scripts # cd portfolio_2025
```

#### Windows WSL and/or Ubuntu Users

- Execute the script: `./activate_ubuntu.sh`

#### macOS Users

- Execute the script: `./activate_macos.sh`

##  How to Run Locally

```bash
# Clone the frontend
git clone https://github.com/your-org/glucoquest_frontend.git
cd glucoquest_frontend

# Start local preview (GitHub Pages dev mode)
make
