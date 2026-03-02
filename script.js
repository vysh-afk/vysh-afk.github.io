// ================= Theme Toggle =================
const body = document.body;
const btnTheme = document.getElementById("btn-theme");

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
body.classList.add(savedTheme);
btnTheme.firstElementChild.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

btnTheme.addEventListener("click", () => {
  if(body.classList.contains("light")){
    body.classList.replace("light","dark");
    btnTheme.firstElementChild.className = "fas fa-sun";
    localStorage.setItem("portfolio-theme","dark");
  } else {
    body.classList.replace("dark","light");
    btnTheme.firstElementChild.className = "fas fa-moon";
    localStorage.setItem("portfolio-theme","light");
  }
});

// ================= Typing Effect =================
const typingText = document.getElementById("typing-text");
const nameText = "Vyshnavi Dinesh.";
let index = 0;
function type() {
  if(index < nameText.length){
    typingText.innerHTML += nameText.charAt(index);
    index++;
    setTimeout(type, 120);
  }
}
type();

// ================= GitHub Projects =================
const githubUsername = "vysh-afk";
const projectsContainer = document.getElementById("github-projects");
if(projectsContainer){
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then(res=>res.json())
  .then(repos=>{
    repos.slice(0,6).forEach(repo=>{
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `
        <h3>${repo.name.replace(/-/g,' ')}</h3>
        <p class="project__description">${repo.description || "No description available."}</p>
        <ul class="project__stack"><li class="project__stack-item">GitHub Repo</li></ul>
        <a href="${repo.html_url}" class="link link--icon" target="_blank"><i class="fab fa-github"></i></a>
      `;
      projectsContainer.appendChild(div);
    });
  })
  .catch(err=>{
    projectsContainer.innerHTML="<p>Unable to load GitHub projects.</p>";
    console.error(err);
  });
}
