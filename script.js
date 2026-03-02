// ------------------
// Dynamic GitHub Projects
// ------------------
const githubUsername = "vysh-afk"; // your GitHub username
const projectsContainer = document.getElementById("github-projects");

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    // Take top 6 latest repos
    repos.slice(0, 6).forEach(repo => {
      const projectCard = document.createElement("div");
      projectCard.className = "project";
      projectCard.innerHTML = `
        <h3>${repo.name.replace(/-/g, ' ')}</h3>
        <p class="project__description">
          ${repo.description ? repo.description : "No description available."}
        </p>
        <ul class="project__stack">
          <li class="project__stack-item">GitHub Repo</li>
        </ul>
        <a href="${repo.html_url}" class="link link--icon" target="_blank">
          <i class="fab fa-github"></i>
        </a>
      `;
      projectsContainer.appendChild(projectCard);
    });
  })
  .catch(err => {
    projectsContainer.innerHTML = "<p>Unable to load GitHub projects at this time.</p>";
    console.error("Failed to fetch GitHub repos:", err);
  });
