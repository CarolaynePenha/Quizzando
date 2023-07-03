// Declaração de variaveis
const urlQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let firstWindow = document.querySelector(".window1-1");
let secondViewofFirstWindow = document.querySelector(".window1-2");
let secondWindow = document.querySelector(".questions");

// declaração de funções
function getQuizzes() {
  const promise = axios.get(urlQuizzes);
  promise.then(showAllQuizzes);
  promise.catch(handleError);
}
function showAllQuizzes(response) {
  response.data.forEach(renderQuizzes);
}

function renderQuizzes(quizz) {
  firstWindow = document.querySelector(".window1-1");
  firstWindow.innerHTML += `
    <article onclick="openQuizz('${quizz.id}')">
        <img src=${quizz.image}/>
        <div class="gradient"></div>
        <p>${quizz.title}</p>
    </article>
    `;
}

function openQuizz(idQuizz) {
  secondWindow.classList.remove("hide");
  if (!firstWindow.classList.contains("hide")) {
    firstWindow.classList.add("hide");
  } else if (!secondViewofFirstWindow.classList.contains("hide")) {
    secondViewofFirstWindow.classList.add("hide");
  }
  getQuizz(idQuizz);
}

function handleError(error) {
  console.log("Status code: " + error.response.status);
}

// // utilização das funções
getQuizzes();
