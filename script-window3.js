// declaração de variaveis
let quizzObject = {};
const window3Questions = document.querySelector(".window3-2");
let levelsNumber = 0;
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
  const titleQuizz = document.getElementById("title");
  const img = document.getElementById("image");
  const questionsNumber = document.getElementById("quantityOfQuestions");
  levelsNumber = document.getElementById("quantityOfLevels");
  const arrayValidation = [];
  let validated = false;
  quizzObject = { title: titleQuizz.value, image: img.value };
  if (!titleQuizz.checkValidity()) {
    arrayValidation.push(0);
    // titleQuizz.value = "";
    alert("Digite um titulo valido, minimo 20 e maximo 60 caracteres");
  } else {
    arrayValidation.push(1);
  }
  if (!img.checkValidity()) {
    arrayValidation.push(0);
    // img.value = "";
    alert("Digite uma URL valida");
  } else {
    arrayValidation.push(1);
  }
  if (!questionsNumber.checkValidity()) {
    arrayValidation.push(0);
    // questionsNumber.value = "";
    alert(
      "Digite um numero de perguntas valido, minimo 3 e maximo 50 perguntas"
    );
  } else {
    arrayValidation.push(1);
  }
  if (!levelsNumber.checkValidity()) {
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
  const titleQuizz = document.getElementById("title");
  const img = document.getElementById("image");
  quizzObject = { title: titleQuizz.value, image: img.value };

  const SnumberOfQuestions = document.getElementById("quantityOfQuestions");
  const numberOfQuestions = parseInt(SnumberOfQuestions.value);
  for (let i = 0; i < numberOfQuestions; i++) {
    window3Questions.innerHTML += `
    <div class="container-questions"><p> Pergunta ${i + 1}</p>
    <ion-icon onclick="OpenQuestions(${
      i + 1
    })" name="create-outline"></ion-icon></div>
    <div class="question${i + 1} hide">
    <input
        type="text"
        required
        id="questionText"
        placeholder="Texto da pergunta."
        minlength="20"
    />
    <input
        type="color"
        required
        id="colorBackgroundQuestion"
        placeholder="Cor de fundo da pergunta."

    />
    <p> Resposta correta</p>
    <input
        type="text"
        required
        id="answerText"
        placeholder="Resposta correta."
        minlength="20"
    />
    <input
        type="url"
        required
        id="answerImg"
        placeholder="URL da imagem correta."
    />
    <p> Respostas incorretas</p>
    <input
        type="text"
        required
        id="WrongAnswerText1"
        placeholder="Resposta incoreta 1."
    />
    <input
        type="url"
        required
        id="WrongAnswerImg1"
        placeholder="URL da imagem incorreta 1."
    />
    <input
        type="text"
        id="WrongAnswerText2"
        placeholder="Resposta incoreta 2."
    />
    <input
        type="url"
        id="WrongAnswerImg2"
        placeholder="URL da imagem incorreta 2."
    />
    <input
        type="text"
        id="WrongAnswerText3"
        placeholder="Resposta incoreta 3."
    />
    <input
        type="url"
        id="WrongAnswerImg3"
        placeholder="URL da imagem incorreta 3."
    />
</div>
    `;
  }
  window3Questions.innerHTML += `
  <button onclick="validation2()">
  <p> Prosseguir para criação do quizz. </p>
   </button>`;
  removeHide();
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
  const questionText = document.getElementById("questionText");
  const colorBackgroundQuestion = document.getElementById(
    "colorBackgroundQuestion"
  );
  const answerText = document.getElementById("answerText");
  const answerImg = document.getElementById("answerImg");
  let WrongAnswerText = [];
  let WrongAnswerImg = [];
  for (let i = 0; i < 3; i++) {
    WrongAnswerText.push(document.getElementById(`WrongAnswerText${i + 1}`));
    WrongAnswerImg.push(document.getElementById(`WrongAnswerImg${i + 1}`));
  }
  console.log("WrongAnswerText: ", WrongAnswerText);
  console.log("WrongAnswerImg: ", WrongAnswerImg);
  let validated =
    questionText.checkValidity() &&
    colorBackgroundQuestion.checkValidity() &&
    answerText.checkValidity() &&
    answerImg.checkValidity() &&
    WrongAnswerText[0].checkValidity() &&
    WrongAnswerText[1].checkValidity() &&
    WrongAnswerText[2].checkValidity() &&
    WrongAnswerImg[0].checkValidity() &&
    WrongAnswerImg[1].checkValidity() &&
    WrongAnswerImg[2].checkValidity();
  if (!validated) {
    alert(
      "Confira os dados digitados,a pergunta deve ter no minímo 20 caracteres, e devem ter ao menos 1 resposta correta e 1 resposta incorreta"
    );
  }
  console.log("validated: ", validated);
}
// tela 3.3
function createLevels() {
  window3Questions.classList.add("hide");
  window3Question = document.querySelector(".window3-2");
  window3Question.classList.remove("hide");
  renderQuestionsInputs();
}

// utilização das funções
