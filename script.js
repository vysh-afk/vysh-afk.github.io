// Theme Toggle
const body = document.body;
const themeIcon = document.getElementById("btn-theme");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "light";
body.classList.add(savedTheme);
themeIcon.classList.add(savedTheme === "dark" ? "fa-sun" : "fa-moon");

// Toggle theme
themeIcon.parentElement.addEventListener("click", () => {
  const isDark = body.classList.contains("dark");
  if(isDark){
    body.classList.replace("dark","light");
    themeIcon.classList.replace("fa-sun","fa-moon");
    localStorage.setItem("portfolio-theme","light");
  } else {
    body.classList.replace("light","dark");
    themeIcon.classList.replace("fa-moon","fa-sun");
    localStorage.setItem("portfolio-theme","dark");
  }
});

// GitHub Projects
const githubUsername = "vysh-afk";
const projectsContainer = document.getElementById("github-projects");
if(projectsContainer){
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      repos.slice(0,6).forEach(repo => {
        const card = document.createElement("div");
        card.className = "project";
        card.innerHTML = `
          <h3>${repo.name.replace(/-/g,' ')}</h3>
          <p class="project__description">${repo.description||"No description available."}</p>
          <ul class="project__stack">
            <li class="project__stack-item">GitHub Repo</li>
          </ul>
          <a href="${repo.html_url}" class="link link--icon" target="_blank">
            <i class="fab fa-github"></i>
          </a>
        `;
        projectsContainer.appendChild(card);
      });
    })
    .catch(err => {
      projectsContainer.innerHTML = "<p>Unable to load GitHub projects at this time.</p>";
      console.error(err);
    });
}

// Typing Effect
const typingText = document.querySelector(".typing-text");
if(typingText){
  const text = typingText.textContent;
  typingText.textContent = "";
  let i = 0;
  const speed = 100;
  const type = () => {
    if(i < text.length){
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  type();
}
