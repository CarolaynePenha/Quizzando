// Declaração de variaveis
const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let firstWindow = document.querySelector(".window1-1");
let secondViewofFirstWindow = document.querySelector(".window1-2");
let secondWindow = document.querySelector(".questions");
let list = [];
const loadImg = document.querySelector(".window-load > img");
const load = document.querySelector(".window-load");

// declaração de funções
function getQuizzes() {
  const promise = axios.get(urlQuizzes);
  promise.then(showAllQuizzes);
  promise.catch(handleError);
}
function showAllQuizzes(response) {
  load.classList.add("hide");
  loadImg.classList.add("hide");
  response.data.forEach(renderQuizzes);
}

function renderQuizzes(quizz) {
  const listSerialized = localStorage.getItem("lista");
  list = JSON.parse(listSerialized);
  console.log("list: ", list);
  const yourQuizzes = document.querySelector(".your-quizzes");
  const allQuizzes = document.querySelector(".all-quizzes");
  if (listSerialized) {
    secondViewofFirstWindow.classList.remove("hide");
    for (let i = 0; i < list.length; i++) {
      if (quizz.id === list[i]) {
        yourQuizzes.innerHTML += `
      <article onclick="openQuizz('${quizz.id}')">
          <img src=${quizz.image}/>
          <div class="gradient"></div>
          <p>${quizz.title}</p>
      </article>
      `;
      } else {
        allQuizzes.innerHTML += `
      <article onclick="openQuizz('${quizz.id}')">
          <img src=${quizz.image}/>
          <div class="gradient"></div>
          <p>${quizz.title}</p>
      </article>
      `;
      }
    }
  } else {
    firstWindow = document.querySelector(".window1-1");
    firstWindow.classList.remove("hide");
    firstWindow.innerHTML += `
      <article onclick="openQuizz('${quizz.id}')">
          <img src=${quizz.image}/>
          <div class="gradient"></div>
          <p>${quizz.title}</p>
      </article>
      `;
  }
}

function openQuizz(idQuizz) {
  secondWindow.classList.remove("hide");
  if (!firstWindow.classList.contains("hide")) {
    firstWindow.classList.add("hide");
  } else if (!secondViewofFirstWindow.classList.contains("hide")) {
    secondViewofFirstWindow.classList.add("hide");
  } else if (!window3Final.classList.contains("hide")) {
    window3Final.classList.add("hide");
  }
  getQuizz(idQuizz);
}

function handleError(error) {
  console.log("Status code: " + error.re3.ponse.status);
}

// // utilização das funções
getQuizzes();
