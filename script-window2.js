// // Declaração de variaveis
let quizz = [];
let position = 0;
let quantityRight = 0;
let totalQuantity = 0;
let percentageOfCorrect = 0;
// declaração de funções
function comparator() {
  return Math.random() - 0.5;
}
function getQuizz(idQuizz) {
  const urlOneQuizz = `${urlQuizzes}/${idQuizz}`;
  const promise = axios.get(urlOneQuizz);
  promise.then(showQuestions);
  promise.catch(handleError);
}
function showQuestions(response) {
  quizz = response.data;
  const questions = document.querySelector(".questions");
  questions.innerHTML = `
  <div class="header-quizzes">
  <img src=${quizz.image}/>
  <div class="opacity">
  </div>
   <p>${quizz.title}</p>
    </div>`;
  renderQuizz();
}

function renderQuizz() {
  for (let i = 0; i < quizz.questions.length; i++) {
    totalQuantity = quizz.questions.length;
    const question = document.querySelector(".questions");
    question.innerHTML += `
    <section class= " question section${i}">
        <div class="question-title">
            <p>${quizz.questions[i].title}</p>
        </div>
        <div class="img-options question${i}">
        </div>
    </section>
    `;
    quizz.questions[i].answers.sort(comparator);
    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      const option = document.querySelector(`.question${i}`);
      if (quizz.questions[i].answers[j].isCorrectAnswer) {
        option.innerHTML += `
              <button onclick="chooseOption(this,${i})">
                  <img src=${quizz.questions[i].answers[j].image} />
                  <p class="options-title right">${quizz.questions[i].answers[j].text}</p>
                  <div class="white-opacity hide"></div>
              </button>
              `;
      } else {
        option.innerHTML += `
        <button onclick="chooseOption(this,${i})">
            <img src=${quizz.questions[i].answers[j].image} />
            <p class="options-title">${quizz.questions[i].answers[j].text}</p>
            <div class="white-opacity hide"></div>
        </button>
        `;
      }
    }
  }
}

function chooseOption(chosen, i) {
  const opacity = document.querySelectorAll(
    `.question${i} > button > .white-opacity`
  );
  const allButtons = document.querySelectorAll(`.question${i} > button`);
  const rightAnswer = document.querySelectorAll(`.question${i} > button > p`);
  position = i + 1;
  chosen.classList.add("choice");
  for (let i = 0; i < opacity.length; i++) {
    if (allButtons[i].classList.contains("choice")) {
    } else {
      opacity[i].classList.remove("hide");
    }
    allButtons[i].disabled = true;
  }
  for (let j = 0; j < opacity.length; j++) {
    if (rightAnswer[j].classList.contains("right")) {
      rightAnswer[j].classList.add("green");
    } else {
      rightAnswer[j].classList.add("red");
    }
  }
  for (let k = 0; k < opacity.length; k++) {
    const containsChoice = allButtons[k].classList.contains("choice");
    const containsRight = rightAnswer[k].classList.contains("right");
    if (containsChoice && containsRight) {
      quantityRight++;
    }
  }
  if (position === totalQuantity) {
    setTimeout(finalResult, 2000);
  } else {
    setTimeout(scroll, 2000);
  }
}

function scroll() {
  const section = document.querySelector(`.section${position}`);
  section?.scrollIntoView({ behavior: "smooth" });
}

function finalResult() {
  const question = document.querySelector(".questions");
  sum();
  for (let i = quizz.levels.length - 1; i >= 0; i--) {
    let minValues = parseInt(quizz.levels[i].minValue);
    if (percentageOfCorrect >= minValues) {
      question.innerHTML += `
      <section class="result">
        <div class="title-result">
          <p>${quizz.levels[i].title}</p>
        </div>
        <img src=${quizz.levels[i].image} />
        <div class="result-message">
          <p>
          ${quizz.levels[i].text}
          </p>
        </div>
      </section>
      <button onclick="restartQuizz()" class="restart-quizz">
        <p>Reiniciar Quizz</p>
      </button>
      <button onclick="returnHome()" class="return-home">
        <p>Voltar para a home</p>
      </button>`;
      break;
    }
  }
  setTimeout(
    () =>
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      }),
    2000
  );
}
function sum() {
  percentageOfCorrect = Math.round((quantityRight * 100) / totalQuantity);
}
function restartQuizz() {
  position = 0;
  quantityRight = 0;
  totalQuantity = 0;
  percentageOfCorrect = 0;
  const questions = document.querySelector(".questions");
  questions.innerHTML = `
  <div class="header-quizzes">
  <img src=${quizz.image}/>
  <div class="opacity">
  </div>
   <p>${quizz.title}</p>
    </div>`;
  renderQuizz();
  window.scrollTo(0, 0);
}
function returnHome() {
  window.location.reload();
}
// utilização das funções
