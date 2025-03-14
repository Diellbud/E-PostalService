
const body = document.body;
const routes = {
  home: "./home/home.html",
  users: "./users/users.html",
  issues: "./issues/issues.html",
};

const router = () => {
  const route = window.location.hash.replace("#", "");
  const renderContent = document.getElementById("app");
  const file = routes[route];
  if (file) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        renderContent.innerHTML = data;
        loadScripts(route);
      })
      .catch((error) => {
        renderContent.innerHTML = `<p>Error</p>`;
        console.warn(error);
      });
  }
};
const loadScripts = (route) => {
  const scripts = {
    home: [
      "./home/fakeDatabase.js",
      "./home/cellCard.js",
      "./home/tableScript.js",
    ],
    users: ["./users/userScript.js"],
    issues: ["./issues/issueScript.js"],
  };
  const scriptFiles = scripts[route];
  if (scriptFiles) {
    removeExistingScripts();
    loadScriptSequentially(scriptFiles, 0);
  }
};

const loadScriptSequentially = (scripts, index) => {
  if (index < scripts.length) {
    const script = document.createElement("script");
    script.src = scripts[index];
    script.className = "dynamic-script";
    script.onload = () => loadScriptSequentially(scripts, index + 1);
    document.body.appendChild(script);
  } else {
    initializePage();
  }
};

const removeExistingScripts = () => {
  document
    .querySelectorAll(".dynamic-script")
    .forEach((script) => script.remove());
};

const initializePage = () => {
    cellObject(1, 1);
    createRows(1, 1);
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
