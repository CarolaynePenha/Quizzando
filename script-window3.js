// declaração de variaveis
let quizzObject = {};
let levelsNumber = 0;
let window3Question = null;
let questionsArray = [];
let answersObj = {};
let titleQuizz = null;
let img = null;
let numberOfQuestions = 0;
let idCreatedQuizz = 0;
let window3Final = null;
let globalArrayWithUserIDS = [];
// declaração de funcções
function createNewQuizz() {
  const window3 = document.querySelector(".window3-1");
  const firstWindow = document.querySelector(".window1-1");
  const secondViewofFirstWindow = document.querySelector(".window1-2");
  if (!firstWindow.classList.contains("hide")) {
    firstWindow.classList.add("hide");
  } else if (!secondViewofFirstWindow.classList.contains("hide")) {
    secondViewofFirstWindow.classList.add("hide");
  }
  window3.classList.remove("hide");
}

function validation1() {
  titleQuizz = document.getElementById("title");
  img = document.getElementById("image");
  const questionsNumber = document.getElementById("quantityOfQuestions");
  const Slevesnumber = document.getElementById("quantityOfLevels");
  levelsNumber = parseInt(Slevesnumber.value);
  const arrayValidation = [];
  let validated = false;
  if (!titleQuizz.checkValidity()) {
    arrayValidation.push(0);
    alert("Digite um titulo valido, minimo 20 e maximo 60 caracteres");
  } else {
    arrayValidation.push(1);
  }
  if (!img.checkValidity()) {
    arrayValidation.push(0);
    alert("Digite uma URL valida");
  } else {
    arrayValidation.push(1);
  }
  if (!questionsNumber.checkValidity()) {
    arrayValidation.push(0);
    alert(
      "Digite um numero de perguntas valido, minimo 3 e maximo 50 perguntas"
    );
  } else {
    arrayValidation.push(1);
  }
  if (!Slevesnumber.checkValidity()) {
    arrayValidation.push(0);
    alert("Digite um numero de niveis valido, minimo 2 e maximo 10 perguntas");
  } else {
    arrayValidation.push(1);
  }
  validated =
    arrayValidation[0] === 1 &&
    arrayValidation[1] === 1 &&
    arrayValidation[2] === 1 &&
    arrayValidation[3] === 1;
  if (validated) {
    createQuestions();
  }
}

function createQuestions() {
  const window3 = document.querySelector(".window3-1");
  window3.classList.add("hide");
  window3Question = document.querySelector(".window3-2");
  window3Question.classList.remove("hide");
  renderQuestionsInputs();
}

function renderQuestionsInputs() {
  const form = document.getElementById("form-questions");
  const SnumberOfQuestions = document.getElementById("quantityOfQuestions");
  numberOfQuestions = parseInt(SnumberOfQuestions.value);
  for (let i = 0; i < numberOfQuestions; i++) {
    form.innerHTML += `
      <div class="container-questions"><p> Pergunta ${i + 1}</p>
      <ion-icon onclick="OpenQuestions(${
        i + 1
      })" name="create-outline"></ion-icon></div>
      <div class="question${i + 1} hide">
      <input
          type="text"
          required
          id="questionText${i + 1}"
          placeholder="Texto da pergunta."
          minlength="20"
      />
      <div>
      <input
          type="text"
          required
          placeholder="Cor de fundo da pergunta."
          id="colorBackgroundQuestion${i + 1}"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" title="color hex"
      />
      </div>
      <p> Resposta correta</p>
      <input
          type="text"
          class="answer"
          required
          id="answerText${i + 1}"
          placeholder="Resposta correta."
      />
      <input
          type="url"
          class="answer"
          required
          id="answerImg${i + 1}"
          placeholder="URL da imagem correta."
      />
      <p> Respostas incorretas</p>
      <input
          type="text"
          class="answer"
          required
          id="WrongAnswerText1${i + 1}"
          placeholder="Resposta incoreta 1."
      />
      <input
          type="url"
          class="answer"
          required
          id="WrongAnswerImg1${i + 1}"
          placeholder="URL da imagem incorreta 1."
      />
      <input
          type="text"
          class="answer"
          id="WrongAnswerText2${i + 1}"
          placeholder="Resposta incoreta 2."
      />
      <input
          type="url"
          class="answer"
          id="WrongAnswerImg2${i + 1}"
          placeholder="URL da imagem incorreta 2."
      />
      <input
          type="text"
          class="answer"
          id="WrongAnswerText3${i + 1}"
          placeholder="Resposta incoreta 3."
      />
      <input
          type="url"
          class="answer"
          id="WrongAnswerImg3${i + 1}"
          placeholder="URL da imagem incorreta 3."
      />
  </div>
      `;
  }
  window3Question.innerHTML += `
  <button class="button-windows3" onclick="validation2()">
  <p> Prosseguir para criação dos níveis</p>
  </button>
  `;
  removeHide();
}
function getInfosQuestions() {
  for (let i = 0; i < numberOfQuestions; i++) {
    const textQuestion = document.getElementById(`questionText${i + 1}`);
    const colorQuestion = document.getElementById(
      `colorBackgroundQuestion${i + 1}`
    );
    const imgRight = document.querySelectorAll(`.question${i + 1} > .answer`);
    questionsArray[i] = {
      title: textQuestion.value,
      color: colorQuestion.value,
      answers: [],
    };
    answersObj = {
      text: imgRight[0].value,
      image: imgRight[1].value,
      isCorrectAnswer: true,
    };
    questionsArray[i].answers.push(answersObj);
    answersObj = {
      text: imgRight[2].value,
      image: imgRight[3].value,
      isCorrectAnswer: false,
    };
    questionsArray[i].answers.push(answersObj);
    if (imgRight[4].value && imgRight[5].value) {
      let wrongAnswerObj = {
        text: imgRight[4].value,
        image: imgRight[5].value,
        isCorrectAnswer: false,
      };
      questionsArray[i].answers.push(wrongAnswerObj);
    }

    if (imgRight[6].value && imgRight[7].value) {
      wrongAnswerObj = {
        text: imgRight[6].value,
        image: imgRight[7].value,
        isCorrectAnswer: false,
      };
      questionsArray[i].answers.push(wrongAnswerObj);
    }
  }
  quizzObject = {
    title: titleQuizz.value,
    image: img.value,
    questions: questionsArray,
    levels: [],
  };
  createLevels();
}

function removeHide() {
  const question1 = document.querySelector(".question1");
  question1.classList.remove("hide");
}

function OpenQuestions(position) {
  const container = document.querySelector(`.question${position}`);
  container.classList.toggle("hide");
}

function validation2() {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    getInfosQuestions();
  } else {
    alert(
      "Confira os dados digitados,a pergunta deve ter no minímo 20 caracteres, a cor deve ser no formato hexadecimal e devem ter ao menos 1 resposta correta e 1 resposta incorreta"
    );
  }
}

// tela 3.3
function createLevels() {
  window3Question.classList.add("hide");
  window3Levels = document.querySelector(".window3-3");
  window3Levels.classList.remove("hide");
  renderLevels();
}
function openLevels(position) {
  const container = document.querySelector(`.Level${position}`);
  container.classList.toggle("hide");
}
function renderLevels() {
  const form = document.getElementById("form-levels");
  for (let i = 0; i < levelsNumber; i++) {
    if (i === 0) {
      form.innerHTML += `
    <div class="container-questions">
    <p> Nível ${i + 1}</p>
    <ion-icon onclick="openLevels(${
      i + 1
    })" name="create-outline"></ion-icon></div>
    <div class="Level${i + 1} hide">
    <input
        type="text"
        required
        id="LevelTitle${i + 1}"
        placeholder="Título do nível."
        minlength="10"
    />
    <input
        type="number"
        required
        placeholder="% de acerto mínima igual a 0"
        id="Percentage${i + 1}"
        min=0
        max=0
    />
    <input
    type="url"
    required
    id="LevelImg${i + 1}"
    placeholder="URL da imagem desse nível."
    />
    <textarea
    type"text"
    required
    minlength="30"
     id="levelDescription${i + 1}"
    placeholder="Descrição desse nível" cols="30" rows="10"></textarea>
</div>
    `;
    } else {
      form.innerHTML += `
      <div class="container-questions">
      <p> Nível ${i + 1}</p>
      <ion-icon onclick="openLevels(${
        i + 1
      })" name="create-outline"></ion-icon></div>
      <div class="Level${i + 1} hide">
      <input
          type="text"
          required
          id="LevelTitle${i + 1}"
          placeholder="Título do nível."
          minlength="10"
      />
      <input
          type="number"
          required
          placeholder="% de acerto mínima."
          id="Percentage${i + 1}"
          min=0
          max=100
      />
      <input
      type="url"
      required
      id="LevelImg${i + 1}"
      placeholder="URL da imagem desse nível."
      />
      <textarea
      type"text"
      required
      minlength="30"
       id="levelDescription${i + 1}"
      placeholder="Descrição desse nível" cols="30" rows="10"></textarea>
  </div>
      `;
    }
  }

  const window3Levels = document.querySelector(".window3-3");
  window3Levels.innerHTML += `
  <button class="button-windows3" onclick="validation3()">
  <p> Finalizar Quizz</p>
  </button>
  `;
  removeHideofLevels();
}
function removeHideofLevels() {
  const level1 = document.querySelector(".Level1");
  level1.classList.remove("hide");
}
function validation3() {
  const form = document.getElementById("form-levels");
  if (form.checkValidity()) {
    getLevelsInfos();
  } else {
    alert(
      "Confira os dados digitados,a pergunta deve ter no minímo 20 caracteres, a cor deve ser no formato hexadecimal e devem ter ao menos 1 resposta correta e 1 resposta incorreta"
    );
  }
}
function getLevelsInfos() {
  let LevelsObj = {};
  for (let i = 0; i < levelsNumber; i++) {
    const title = document.getElementById(`LevelTitle${i + 1}`);
    const imgLevel = document.getElementById(`LevelImg${i + 1}`);
    const description = document.getElementById(`levelDescription${i + 1}`);
    const percentage = document.getElementById(`Percentage${i + 1}`);
    LevelsObj = {
      title: title.value,
      image: imgLevel.value,
      text: description.value,
      minValue: percentage.value,
    };
    quizzObject.levels.push(LevelsObj);
  }
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    quizzObject
  );
  promise.then((objeto) => {
    const listSerialized = localStorage.getItem("lista");
    globalArrayWithUserIDS = JSON.parse(listSerialized);
    globalArrayWithUserIDS.push(objeto.data.id);
    console.log("globalArrayWithUserIDS: ", globalArrayWithUserIDS);
    idCreatedQuizz = objeto.data.id;
    let globalArrayWithUserIDsSerialized = JSON.stringify(
      globalArrayWithUserIDS
    );
    localStorage.setItem("lista", globalArrayWithUserIDsSerialized);
    ShowLastWindow();
  });
  promise.catch(handleError);
}
function ShowLastWindow() {
  const window3Levels = document.querySelector(".window3-3");
  window3Levels.classList.add("hide");
  window3Final = document.querySelector(".window3-4");
  window3Final.classList.remove("hide");
  window3Final.innerHTML += `
  <article onclick="openQuizz('${idCreatedQuizz}')">
    <img src=${quizzObject.image}/>
    <div class="gradient"></div>
    <p>${quizzObject.title}</p>
  </article>
  <button class="button-windows3" onclick="openQuizz('${idCreatedQuizz}')">
    <p> Acessar quizz</p>
  </button>
  <button onclick="returnHome()" class="return-home">
      <p>Voltar para a home</p>
  </button>`;
}

// utilização das funções
